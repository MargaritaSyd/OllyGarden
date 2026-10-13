"""Local regression checks; all analytics ingestion and Server Actions are intercepted."""
import gzip
import json
from pathlib import Path
from urllib.parse import urlparse

from playwright.sync_api import sync_playwright

ORIGIN = 'http://localhost:3100'
TOKEN = 'phc_analytics_test'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(user_agent=UA)
    # Only this isolated test bypasses SDK bot suppression. Production retains bot filtering.
    context.add_init_script("""
      Object.defineProperty(navigator, 'webdriver', {get: () => false});
      Object.defineProperty(navigator, 'userAgentData', {get: () => ({brands: [{brand: 'Chromium', version: '140'}]})});
    """)
    events = []
    actions = []
    outcome = ['success']

    def intercept(route):
        request = route.request
        url = urlparse(request.url)
        if url.hostname.endswith('posthog.com'):
            if url.path in ['/e/', '/i/v0/e/']:
                payload = request.post_data_buffer
                if payload.startswith(b'\x1f\x8b'):
                    payload = gzip.decompress(payload)
                events.extend(json.loads(payload)['batch'])
            if url.path.endswith('/config.js'):
                config = {'analytics': {'endpoint': '/i/v0/e/'}, 'supportedCompression': ['gzip', 'gzip-js'], 'autocapture_opt_out': False, 'hasFeatureFlags': False}
                route.fulfill(content_type='application/javascript', body='window._POSTHOG_REMOTE_CONFIG=' + json.dumps({TOKEN: {'config': config}}) + ';')
            elif url.path.endswith('/web-vitals.js'):
                route.fulfill(content_type='application/javascript', body=Path('node_modules/posthog-js/dist/web-vitals.js').read_text())
            else:
                route.fulfill(content_type='application/json', body='{}')
        elif request.headers.get('next-action'):
            actions.append(request.url)
            if outcome[0] == 'failure':
                route.fulfill(status=500, body='Synthetic persistence failure')
            else:
                route.fulfill(content_type='text/x-component', body='0:{"a":"$@1","b":"test","c":""}\n1:{"notification":"failed"}\n')
        elif url.hostname != 'localhost':
            route.fulfill(content_type='text/html', body='<p>Intercepted outbound destination</p>')
        else:
            route.continue_()

    context.route('**/*', intercept)
    page = context.new_page()

    def captured(name):
        return [event for event in events if event['event'] == name]

    def flush():
        page.wait_for_timeout(3500)

    page.goto(ORIGIN + '/contact?email=SENSITIVE_QUERY&utm_source=analytics-test#SENSITIVE_HASH')
    page.wait_for_load_state('networkidle')
    page.locator('#ct-name').fill('SENSITIVE_NAME')
    flush()
    assert not events, 'No events allowed before consent'
    assert not page.evaluate("Object.keys(localStorage).some(k => k.startsWith('ph_'))")
    page.get_by_role('button', name='Essential only', exact=True).click()
    page.locator('#ct-name').fill('SENSITIVE_NAME_2')
    flush()
    assert not events, 'No events allowed after declining'
    page.get_by_role('button', name='Cookie settings', exact=True).click()
    page.get_by_role('button', name='Accept analytics', exact=True).click()
    page.locator('#ct-name').fill('SENSITIVE_NAME_3')
    page.get_by_role('button', name='Send Message', exact=True).click()
    flush()
    assert len(captured('$pageview')) == 1, 'Consent captures exactly one current pageview'
    assert len(captured('form_started')) == 1, 'Pre-consent edits must not consume form start'
    assert len(captured('form_submission_attempted')) == 1
    assert captured('form_submission_failed')[-1]['properties']['failure_type'] == 'validation'
    assert not actions, 'Validation must not invoke a Server Action'
    assert captured('$pageview')[0]['properties']['utm_source'] == 'analytics-test'

    page.locator('#ct-email').fill('SENSITIVE_EMAIL@example.com')
    page.get_by_role('button', name='Send Message', exact=True).click()
    page.wait_for_function("!document.querySelector('#ct-name')")
    flush()
    assert len(actions) == 1
    assert len(captured('form_submitted')) == 1
    assert len(captured('lead_generated')) == 1
    assert len(captured('form_notification_failed')) == 1
    assert len(captured('form_started')) == 1

    page.goto(ORIGIN + '/contact')
    page.wait_for_load_state('networkidle')
    outcome[0] = 'failure'
    page.locator('#ct-name').fill('SENSITIVE_FAILED_NAME')
    page.locator('#ct-email').fill('SENSITIVE_FAILED_EMAIL@example.com')
    page.get_by_role('button', name='Send Message', exact=True).click()
    flush()
    assert captured('form_submission_failed')[-1]['properties']['failure_type'] == 'persistence'
    assert len(captured('form_submitted')) == 1, 'Failed persistence is never a conversion'
    assert page.locator('#ct-name').input_value() == 'SENSITIVE_FAILED_NAME'

    print('PASS: consent and all mocked form outcomes', flush=True)
    page.goto(ORIGIN)
    page.wait_for_load_state('networkidle')
    trigger = page.locator('a[data-analytics-handoff]').filter(has_text='Get Started').first
    trigger.click()
    page.get_by_role('dialog').get_by_role('button', name='Stay Here', exact=True).click()
    trigger.click()
    page.keyboard.press('Escape')
    trigger.click()
    flush()
    assert len(captured('app_handoff_opened')) == 3
    assert len(captured('app_handoff_cancelled')) == 2
    assert not captured('app_handoff_confirmed')
    with page.expect_navigation():
        page.get_by_role('dialog').get_by_role('link', name='Continue to the App', exact=True).click()
    page.wait_for_timeout(1000)
    assert len(captured('app_handoff_confirmed')) == 1
    assert len(captured('app_handoff_cancelled')) == 2, 'Confirmation must not emit cancellation'

    page.goto(ORIGIN)
    page.wait_for_load_state('networkidle')
    cta_before = len(captured('cta_clicked'))
    trigger.click(button='middle')
    flush()
    for popup in context.pages:
        if popup != page:
            popup.close()
    assert len(captured('cta_clicked')) == cta_before + 1
    assert captured('app_handoff_confirmed')[-1]['properties']['method'] == 'middle_click'
    confirmations = len(captured('app_handoff_confirmed'))
    trigger.dispatch_event('click', {'altKey': True, 'button': 0})
    flush()
    assert len(captured('app_handoff_confirmed')) == confirmations

    print('PASS: app handoff outcomes', flush=True)
    page.goto(ORIGIN + '/contact')
    page.wait_for_load_state('networkidle')
    engaged_before = len(captured('page_engaged'))
    page.evaluate('window.scrollTo(0,document.documentElement.scrollHeight)')
    page.wait_for_timeout(35_000)
    flush()
    assert len(captured('page_engaged')) == engaged_before + 1, (engaged_before, captured('page_engaged'), page.evaluate('({visible:document.visibilityState, now:performance.now(),y:scrollY,height:document.documentElement.scrollHeight})'))
    page.wait_for_timeout(35_000)
    flush()
    assert len(captured('page_engaged')) == engaged_before + 1, (engaged_before, captured('page_engaged'), page.evaluate('({visible:document.visibilityState, now:performance.now(),y:scrollY,height:document.documentElement.scrollHeight})'))

    # A real footer navigation exercises Next Link's defaultPrevented behavior.
    before = len(captured('navigation_clicked'))
    internal = page.locator('footer nav a[href^="/"]').first
    if internal.count() == 0:
        internal = page.locator('nav a[href^="/"]').first
    internal.click()
    page.wait_for_timeout(4000)
    flush()
    assert len(captured('navigation_clicked')) == before + 1

    # Fixture links exercise the shared delegated handler, without network side effects.
    page.evaluate("""() => {
      for (const [id, href] of [['analytics-doc', 'https://docs.ollygarden.com/start?token=SENSITIVE_DEST'], ['analytics-file', '/test.pdf?email=SENSITIVE_DEST']]) {
        const a=document.createElement('a'); a.id=id; a.href=href; a.target='_blank'; a.textContent=id; document.body.append(a);
      }
    }""")
    page.locator('#analytics-doc').click()
    page.locator('#analytics-file').click()
    page.wait_for_timeout(4000)
    flush()
    assert len(captured('outbound_link_clicked')) == 1
    assert len(captured('file_download_clicked')) == 1
    assert captured('$web_vitals'), 'The actual SDK Web Vitals extension must capture metrics'
    payload = json.dumps(events)
    if 'SENSITIVE_' in payload:
        Path('/tmp/wicket-analytics-events.json').write_text(payload)
    assert 'SENSITIVE_' not in payload, 'No form values, queries, fragments, or destination secrets'

    page.get_by_role('button', name='Cookie settings', exact=True).click()
    page.get_by_role('button', name='Essential only', exact=True).click()
    # Already accepted events may drain from the SDK queue after withdrawal.
    flush()
    count = len(events)
    page.locator('#analytics-doc').click()
    page.wait_for_timeout(40_000)
    flush()
    assert len(events) == count, 'Withdrawing consent stops all capture'
    assert not page.evaluate("Object.keys(localStorage).some(k => k.startsWith('ph_'))")
    print(f'PASS: consent, form validation/success/notification/failure, app handoffs, SPA navigation, engagement, resource clicks, Web Vitals, and payload privacy ({len(events)} intercepted events; {len(actions)} mocked actions).')
    context.close()
    browser.close()
