import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { register } from "node:module";
import { dirname, join } from "node:path";
import { describe, test } from "node:test";
import { pathToFileURL } from "node:url";

// Every canonical, Open Graph, sitemap, robots, and JSON-LD URL derives from this
// variable; pin it so the assertions do not depend on the developer's shell.
process.env.NEXT_PUBLIC_SITE_URL = "https://ollygarden.com";

const root = process.cwd();

// Source modules import each other through the tsconfig "@/" alias and next.config.ts
// uses extensionless relative paths; neither resolves in Node, so map them here.
register(
  `data:text/javascript,${encodeURIComponent(`
    let srcUrl;
    export function initialize(data) { srcUrl = data.srcUrl; }
    export async function resolve(specifier, context, next) {
      const target = specifier.startsWith("@/")
        ? srcUrl + specifier.slice(2)
        : /^\\.\\.?\\//.test(specifier) && !/\\.[a-z]+$/.test(specifier) && context.parentURL
          ? new URL(specifier, context.parentURL).href
          : null;
      if (!target) return next(specifier, context);
      let lastError;
      // No ".tsx" candidate: Node's type stripping does not handle JSX, so a .tsx
      // module could never load here anyway.
      for (const candidate of [target, target + ".ts"]) {
        try { return await next(candidate, context); }
        catch (error) {
          if (error?.code !== "ERR_MODULE_NOT_FOUND" && error?.code !== "ERR_UNSUPPORTED_DIR_IMPORT") throw error;
          lastError = error;
        }
      }
      throw lastError;
    }
  `)}`,
  { parentURL: import.meta.url, data: { srcUrl: pathToFileURL(join(root, "src/")).href } },
);

const structuredData = await import("../src/lib/structured-data.ts");
const { createPageMetadata, rootMetadata } = await import("../src/lib/metadata.ts");
const { stubMetadata } = await import("../src/lib/stub.ts");
const { getAbsoluteUrl, getSiteUrl, siteConfig } = await import("../src/lib/site.ts");
const { featuredResources, footerColumns, headerMenus, pricingLink } = await import("../src/lib/nav.ts");
const { default: sitemap } = await import("../src/app/sitemap.ts");
const { default: robots } = await import("../src/app/robots.ts");
const { default: nextConfig } = await import("../next.config.ts");
const { blogMeta, blogPostHref, blogPosts } = await import("../src/lib/blog.ts");
const { indexablePressReleases, pressMeta, pressReleaseHref, pressReleases } = await import("../src/lib/press.ts");
const { caseStudies, caseStudiesMeta, caseStudyHref } = await import("../src/lib/case-studies.ts");
const { legalPages } = await import("../src/lib/legal.ts");
const { careersMeta, careersOpenPositions } = await import("../src/lib/careers.ts");
const { posts } = await import("../src/lib/posts.ts");
const { ogCards } = await import("../src/lib/og-cards.ts");
const { pricingMeta } = await import("../src/lib/pricing.ts");
const { telemetryQualityMeta } = await import("../src/lib/telemetry-quality.ts");
const { instrumentationScoreMeta } = await import("../src/lib/instrumentation-score.ts");
const { agentSkillsMeta } = await import("../src/lib/agent-skills.ts");
// Next.js matches redirect sources with its bundled path-to-regexp; use the same one.
const { pathToRegexp } = (await import("next/dist/compiled/path-to-regexp/index.js")).default;

const origin = getSiteUrl().origin;
const sitemapEntries = sitemap();
const sitemapPaths = sitemapEntries.map((entry) => new URL(entry.url).pathname);
const redirects = (await nextConfig.redirects()).map((redirect) => ({
  ...redirect,
  regexp: pathToRegexp(redirect.source),
}));
const careersRoles = careersOpenPositions.filter((position) => "datePosted" in position);

/** The redirect whose source pattern matches `path`, if any. */
function redirectFor(path) {
  return redirects.find((redirect) => redirect.regexp.test(path));
}

/** Slugs the dynamic `[slug]` route under each collection page actually renders. */
const dynamicRouteSlugs = {
  "/resources/blog": blogPosts.map((post) => post.slug),
  "/resources/press-releases": pressReleases.map((release) => release.slug),
  "/resources/case-studies": caseStudies.map((study) => study.slug),
};

/** Whether Next.js serves `path` from a page, a route handler, or a public file. */
function isServed(path) {
  const route = path === "/" ? "" : path;
  if (existsSync(join(root, "public", route))) return true;
  if (["page.tsx", "route.ts"].some((file) => existsSync(join(root, "src/app", route, file)))) {
    return true;
  }
  const parent = dirname(route);
  const slug = route.slice(parent.length + 1);
  return Boolean(dynamicRouteSlugs[parent]?.includes(slug));
}

/** Static routes whose page module opts out of indexing, read from the route files. */
function noIndexStaticRoutes() {
  return readdirSync(join(root, "src/app"), { recursive: true })
    .filter((file) => file.endsWith("page.tsx") && !file.includes("["))
    .filter((file) => /noIndex: true|stubMetadata\(/.test(readFileSync(join(root, "src/app", file), "utf8")))
    .map((file) => `/${dirname(file)}`.replace(/\/\.$/, "/"));
}

/** Visits every plain object nested in a JSON-LD document. */
function* objects(value, path = "$") {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) yield* objects(item, `${path}[${index}]`);
  } else if (value && typeof value === "object") {
    yield [path, value];
    for (const [key, item] of Object.entries(value)) yield* objects(item, `${path}.${key}`);
  }
}

/** Top-level entities of a document: the `@graph` members, or the document itself. */
function entities(doc) {
  return doc["@graph"] ?? [doc];
}

function entitiesOfType(doc, ...types) {
  return entities(doc).filter((entity) => types.includes(entity["@type"]));
}

const urlKeys = ["url", "@id", "image", "logo", "sameAs", "item", "contentUrl", "codeRepository", "license"];

describe("structured data", () => {
  // Builders rendered by `/about`, `/blog`, and `/blog/[slug]`, which next.config.ts
  // redirects away before those pages can be served.
  const legacyStarterBuilders = ["aboutPageSchema", "blogIndexSchema", "blogPostSchema"];
  // Entities every page graph embeds; they carry no `@context` of their own.
  const fragmentBuilders = ["organizationSchema", "websiteSchema"];

  const invocations = {
    resourcesBlogPostGraph: blogPosts.map((post) => [post.slug, post]),
    resourcesPressReleaseGraph: pressReleases.map((release) => [release.slug, release]),
    resourcesCaseStudyGraph: caseStudies.map((study) => [study.slug, study]),
    legalPageGraph: Object.keys(legalPages).map((path) => [path, path]),
    jobPostingGraph: careersRoles.map((role) => [role.id, role]),
    blogPostSchema: posts.map((post) => [post.slug, post]),
    breadcrumbSchema: [
      ["pricing", [{ name: "Home", path: "/" }, { name: "Pricing", path: pricingMeta.path }]],
    ],
  };
  const builderNames = Object.keys(structuredData).filter((name) => typeof structuredData[name] === "function");
  const documents = builderNames.flatMap((name) =>
    (invocations[name] ?? [["", undefined]]).map(([label, input]) => ({
      name,
      label: label ? `${name}(${label})` : `${name}()`,
      doc: structuredData[name](input),
    })),
  );
  const liveDocuments = documents.filter(({ name }) => !legacyStarterBuilders.includes(name));

  test("every exported builder is exercised with real site data", () => {
    const argumentBuilders = builderNames.filter((name) => structuredData[name].length > 0);
    assert.deepEqual(
      argumentBuilders.filter((name) => !invocations[name]),
      [],
      "add a real-data invocation for every builder that takes an argument",
    );
    for (const list of [legacyStarterBuilders, fragmentBuilders]) {
      assert.deepEqual(
        list.filter((name) => !builderNames.includes(name)),
        [],
        "structured-data.ts no longer exports these builders; remove them from the list in this test",
      );
    }
    assert.ok(careersRoles.length > 0, "careers.ts has no role with a JobPosting");
    // One document per no-argument builder, plus one per real-data invocation.
    const expectedDocuments = builderNames.reduce((sum, name) => sum + (invocations[name]?.length ?? 1), 0);
    assert.equal(documents.length, expectedDocuments);
    assert.ok(documents.length > builderNames.length, "collections should add documents beyond one per builder");
  });

  test("every page graph embeds the organization and website entities", () => {
    const fragments = fragmentBuilders.map((name) => structuredData[name]());
    const graphs = documents.filter(({ doc }) => Array.isArray(doc["@graph"]));
    assert.ok(graphs.length > 20);
    for (const { label, doc } of graphs) {
      for (const fragment of fragments) {
        assert.ok(
          doc["@graph"].some((entity) => entity["@id"] === fragment["@id"]),
          `${label} does not embed ${fragment["@type"]} ${fragment["@id"]}`,
        );
      }
    }
  });

  test("every document is serializable JSON-LD with typed schema.org entities", () => {
    for (const { name, label, doc } of documents) {
      const json = JSON.stringify(doc);
      assert.deepEqual(JSON.parse(json), doc, `${label} has values JSON cannot carry`);
      assert.doesNotMatch(json, /\bundefined\b|\[object Object\]|\bNaN\b/, label);
      if (fragmentBuilders.includes(name)) {
        assert.equal(doc["@context"], undefined, `${label} is embedded in graphs and must not nest a context`);
      } else {
        assert.equal(doc["@context"], "https://schema.org", label);
      }
      for (const entity of entities(doc)) {
        assert.match(entity["@type"] ?? "", /^[A-Z]\w+$/, `${label} has an untyped entity: ${JSON.stringify(entity)}`);
      }
      const ids = entities(doc).map((entity) => entity["@id"]).filter(Boolean);
      assert.equal(new Set(ids).size, ids.length, `${label} repeats an @id`);
    }
  });

  test("every URL is absolute and https, and site identifiers live on the canonical origin", () => {
    for (const { label, doc } of documents) {
      assert.doesNotMatch(JSON.stringify(doc), /localhost|127\.0\.0\.1/, label);
      for (const [path, object] of objects(doc)) {
        for (const key of urlKeys) {
          if (!(key in object)) continue;
          for (const value of [object[key]].flat()) {
            const where = `${label} ${path}.${key} = ${JSON.stringify(value)}`;
            assert.equal(typeof value, "string", where);
            assert.ok(!value.startsWith("/"), `${where} is a relative path`);
            assert.doesNotThrow(() => new URL(value), `${where} is not a URL`);
            assert.equal(new URL(value).protocol, "https:", where);
            if (key === "@id") assert.ok(value.startsWith(`${origin}/`), `${where} is off the canonical origin`);
          }
        }
      }
    }
  });

  test("every @id reference points at an entity some page emits", () => {
    const defined = new Set(
      documents.flatMap(({ doc }) => entities(doc).map((entity) => entity["@id"]).filter(Boolean)),
    );
    for (const { label, doc } of documents) {
      for (const [path, object] of objects(doc)) {
        const keys = Object.keys(object);
        if (keys.length === 1 && keys[0] === "@id") {
          assert.ok(defined.has(object["@id"]), `${label} ${path} references ${object["@id"]}, which no builder defines`);
        }
      }
    }
  });

  test("every site URL a live page describes is served rather than redirected", () => {
    for (const { label, doc } of liveDocuments) {
      for (const [path, object] of objects(doc)) {
        for (const key of urlKeys) {
          for (const value of [object[key] ?? []].flat()) {
            if (!value.startsWith(`${origin}/`)) continue;
            const pathname = new URL(value).pathname;
            const where = `${label} ${path}.${key} = ${value}`;
            assert.equal(redirectFor(pathname)?.source, undefined, `${where} is a redirect source`);
            assert.ok(isServed(pathname), `${where} is not a page, route handler, or public file`);
          }
        }
      }
    }
  });

  test("breadcrumbs count up from one and end on the page they describe", () => {
    let checked = 0;
    for (const { label, doc } of documents) {
      for (const crumbs of entitiesOfType(doc, "BreadcrumbList")) {
        checked += 1;
        const items = crumbs.itemListElement;
        assert.ok(items.length >= 2, `${label} breadcrumbs need a trail`);
        items.forEach((item, index) => {
          assert.equal(item["@type"], "ListItem", label);
          assert.equal(item.position, index + 1, `${label} breadcrumb positions are not consecutive`);
          assert.match(item.name, /\S/, `${label} breadcrumb ${index + 1} has no name`);
          assert.ok(item.item.startsWith(`${origin}/`), `${label} breadcrumb ${index + 1} is off-site`);
        });
        assert.equal(items[0].item, `${origin}/`, `${label} breadcrumbs do not start at home`);
        const pageUrls = entities(doc)
          .filter((entity) => entity !== crumbs)
          .flatMap((entity) => [entity.url, entity["@id"]?.split("#")[0]]);
        // A standalone BreadcrumbList describes no page of its own.
        if (pageUrls.length === 0) continue;
        assert.ok(
          pageUrls.includes(items.at(-1).item),
          `${label} breadcrumbs end on ${items.at(-1).item}, which the document does not describe`,
        );
      }
    }
    assert.ok(checked > 20, "breadcrumb check found too few trails");
  });

  test("FAQ pages carry complete, distinct question and answer pairs", () => {
    let checked = 0;
    for (const { label, doc } of documents) {
      for (const page of entitiesOfType(doc, "FAQPage")) {
        checked += 1;
        assert.ok(Array.isArray(page.mainEntity) && page.mainEntity.length > 0, `${label} FAQPage has no questions`);
        for (const question of page.mainEntity) {
          assert.equal(question["@type"], "Question", label);
          assert.match(question.name ?? "", /\S/, `${label} has a question without text`);
          assert.equal(question.acceptedAnswer?.["@type"], "Answer", `${label}: ${question.name}`);
          assert.match(question.acceptedAnswer.text ?? "", /\S/, `${label}: ${question.name} has no answer`);
        }
        const names = page.mainEntity.map((question) => question.name);
        assert.equal(new Set(names).size, names.length, `${label} repeats a question`);
      }
    }
    assert.ok(checked >= 5, "FAQ check found too few pages");
  });

  test("articles carry a headline, consistent dates, an author, and a publisher", () => {
    let checked = 0;
    for (const { label, doc } of documents) {
      for (const article of entitiesOfType(doc, "Article", "BlogPosting", "NewsArticle")) {
        checked += 1;
        assert.match(article.headline ?? "", /\S/, `${label} has no headline`);
        const published = Date.parse(article.datePublished);
        const modified = Date.parse(article.dateModified);
        assert.ok(!Number.isNaN(published), `${label} datePublished is not a date`);
        assert.ok(!Number.isNaN(modified) && modified >= published, `${label} dateModified predates publication`);
        for (const author of [article.author].flat()) {
          assert.ok(author.name || author["@id"], `${label} author has no name or @id`);
        }
        assert.ok(article.publisher, `${label} has no publisher`);
        assert.equal(article.mainEntityOfPage?.["@id"], article.url, `${label} main entity differs from its URL`);
        if (article["@type"] === "BlogPosting" && "image" in article) {
          assert.ok(isServed(new URL(article.image).pathname), `${label} image is missing from public/`);
        }
      }
    }
    assert.equal(checked, blogPosts.length + pressReleases.length + caseStudies.length + posts.length);
  });

  test("job postings carry title, description, date, employer, and a location type", () => {
    const jobs = documents.flatMap(({ label, doc }) =>
      entitiesOfType(doc, "JobPosting").map((job) => [label, job]),
    );
    assert.equal(jobs.length, careersRoles.length);
    for (const [label, job] of jobs) {
      assert.match(job.title ?? "", /\S/, label);
      assert.match(job.description ?? "", /\S/, label);
      assert.ok(!Number.isNaN(Date.parse(job.datePosted)), `${label} datePosted is not a date`);
      assert.match(job.hiringOrganization?.name ?? "", /\S/, `${label} has no hiring organization`);
      assert.ok(job.employmentType.length > 0, `${label} has no employment type`);
      assert.ok(job.jobLocation || job.jobLocationType, `${label} has neither jobLocation nor jobLocationType`);
    }
  });

  test("offers quote a numeric price in a currency", () => {
    let checked = 0;
    for (const { label, doc } of documents) {
      for (const [path, object] of objects(doc)) {
        if (object["@type"] !== "Offer") continue;
        checked += 1;
        assert.match(object.price, /^\d+(\.\d+)?$/, `${label} ${path} price is not numeric`);
        assert.match(object.priceCurrency, /^[A-Z]{3}$/, `${label} ${path} has no currency`);
      }
    }
    assert.ok(checked > 0, "offer check found no offers");
  });
});

describe("page metadata", () => {
  const indexable = [
    { title: siteConfig.name, description: siteConfig.description, path: "/" },
    ...[
      blogMeta,
      pressMeta,
      caseStudiesMeta,
      careersMeta,
      pricingMeta,
      telemetryQualityMeta,
      instrumentationScoreMeta,
      agentSkillsMeta,
    ].map(({ title, description, path }) => ({ title, description, path })),
    ...Object.entries(legalPages).map(([path, page]) => ({ title: page.title, description: page.description, path })),
    // Every collection entry, mirroring each `[slug]` page's generateMetadata.
    ...blogPosts.map((post) => ({
      title: post.seo?.title ?? post.title,
      description: post.seo?.description ?? post.excerpt,
      path: blogPostHref(post.slug),
      type: "article",
      publishedTime: post.date,
    })),
    ...caseStudies.map((study) => ({
      title: study.seo?.title ?? study.title,
      description: study.seo?.description ?? study.dek,
      path: caseStudyHref(study.slug),
      type: "article",
      publishedTime: study.date,
    })),
    ...indexablePressReleases.map((release) => ({
      title: release.seo?.title ?? release.title,
      description: release.seo?.description ?? release.dek,
      path: pressReleaseHref(release.slug),
      type: "article",
      publishedTime: release.date,
    })),
  ];
  // Content may legitimately have no noindex release; the noindex test skips it then.
  const noIndexRelease = pressReleases.find((release) => release.noIndex);

  test("the canonical origin comes from NEXT_PUBLIC_SITE_URL without trailing-slash drift", () => {
    const configured = process.env.NEXT_PUBLIC_SITE_URL;
    try {
      process.env.NEXT_PUBLIC_SITE_URL = "https://ollygarden.com/";
      assert.equal(getAbsoluteUrl("/pricing"), "https://ollygarden.com/pricing");
      assert.equal(getAbsoluteUrl("/"), "https://ollygarden.com/");
      delete process.env.NEXT_PUBLIC_SITE_URL;
      assert.equal(getSiteUrl().href, "http://localhost:3000/", "an unset origin must fall back to localhost, which the prebuild validator rejects on Netlify");
    } finally {
      process.env.NEXT_PUBLIC_SITE_URL = configured;
    }
    assert.equal(rootMetadata.metadataBase.href, `${origin}/`);
    assert.equal(rootMetadata.robots.index, true);
  });

  test("canonical, Open Graph, Markdown, and card URLs all describe the same page", () => {
    for (const input of indexable) {
      const metadata = createPageMetadata(input);
      const canonical = new URL(metadata.alternates.canonical, rootMetadata.metadataBase).href;
      assert.equal(metadata.alternates.canonical, input.path, `${input.path} canonical drifts from its path`);
      assert.equal(canonical, getAbsoluteUrl(input.path), input.path);
      assert.equal(metadata.openGraph.url, canonical, `${input.path} Open Graph URL differs from canonical`);
      assert.doesNotMatch(new URL(canonical).pathname, /\/\/|.\/$/, `${input.path} has a double or trailing slash`);
      assert.equal(
        metadata.alternates.types["text/markdown"],
        input.path === "/" ? "/index.md" : `${input.path}.md`,
        `${input.path} Markdown alternate`,
      );
      assert.equal(metadata.robots, undefined, `${input.path} must stay indexable`);
      const [image] = metadata.openGraph.images;
      assert.ok(existsSync(join(root, "public", image.url)), `${input.path} card ${image.url} is not rendered`);
      assert.deepEqual(metadata.twitter.images, metadata.openGraph.images, input.path);
      if (input.type === "article") {
        assert.equal(metadata.openGraph.type, "article", input.path);
        assert.equal(metadata.openGraph.publishedTime, input.publishedTime, input.path);
      }
    }
  });

  test("titles and descriptions are unique per page and carried to every surface", () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const input of indexable) {
      const metadata = createPageMetadata(input);
      titles.add(metadata.title.absolute);
      descriptions.add(metadata.description);
      assert.equal(metadata.openGraph.title, input.title, input.path);
      assert.equal(metadata.twitter.title, input.title, input.path);
      assert.equal(metadata.openGraph.description, input.description, input.path);
      assert.ok(
        metadata.title.absolute.includes(siteConfig.name) || metadata.title.absolute.length > 60 - ` — ${siteConfig.name}`.length,
        `${input.path} title should carry the brand when it fits in 60 characters`,
      );
    }
    assert.equal(titles.size, indexable.length, "two pages share a title");
    assert.equal(descriptions.size, indexable.length, "two pages share a description");
  });

  test("noindex pages opt out of indexing and the Markdown alternate", () => {
    const noIndex = [
      ["/products/polder", stubMetadata("Polder", "/products/polder")],
    ];
    if (noIndexRelease) {
      noIndex.push([
        pressReleaseHref(noIndexRelease.slug),
        createPageMetadata({
          title: noIndexRelease.title,
          description: noIndexRelease.dek,
          path: pressReleaseHref(noIndexRelease.slug),
          noIndex: noIndexRelease.noIndex,
        }),
      ]);
    }
    for (const [path, metadata] of noIndex) {
      assert.deepEqual(metadata.robots, { index: false, follow: false }, path);
      assert.equal(metadata.alternates.types["text/markdown"], undefined, `${path} must not advertise Markdown`);
      assert.equal(metadata.alternates.canonical, path);
      assert.ok(!sitemapPaths.includes(path), `${path} is noindex but listed in the sitemap`);
    }
    assert.equal(stubMetadata("Polder", "/products/polder").openGraph.images[0].url, "/og/index.png", "stubs fall back to the site card");
  });

  test("indexable pages need an Open Graph card, and every sitemap page has one", () => {
    assert.throws(
      () => createPageMetadata({ title: "New", description: "A page", path: "/not-a-real-page" }),
      /no Open Graph card.*og-cards/,
    );
    assert.deepEqual(sitemapPaths.filter((path) => !ogCards[path]), [], "add cards to src/lib/og-cards.ts");
  });
});

describe("sitemap, robots, navigation, and redirects", () => {
  const changeFrequencies = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
  const noIndexRoutes = new Set([
    "/products/polder",
    ...noIndexStaticRoutes(),
    ...pressReleases.filter((release) => release.noIndex).map((release) => pressReleaseHref(release.slug)),
  ]);

  test("every sitemap entry is a unique, clean URL on the canonical origin", () => {
    assert.ok(sitemapEntries.length > 40);
    assert.equal(new Set(sitemapPaths).size, sitemapPaths.length, "the sitemap repeats a URL");
    for (const entry of sitemapEntries) {
      const url = new URL(entry.url);
      assert.equal(url.origin, origin, entry.url);
      assert.equal(url.search + url.hash, "", `${entry.url} carries a query or fragment`);
      assert.doesNotMatch(url.pathname, /\/\/|.\/$/, `${entry.url} has a double or trailing slash`);
      if (entry.lastModified !== undefined) {
        assert.ok(!Number.isNaN(entry.lastModified.getTime()), `${entry.url} lastModified is an invalid date`);
        // Date-only strings parse as UTC midnight, so a post dated "today" by an author
        // east of UTC is briefly "in the future" for this clock; allow one day of slack.
        assert.ok(
          entry.lastModified.getTime() <= Date.now() + 24 * 60 * 60 * 1000,
          `${entry.url} lastModified is more than a day in the future`,
        );
      }
      assert.ok(entry.priority >= 0 && entry.priority <= 1, `${entry.url} priority ${entry.priority}`);
      assert.ok(changeFrequencies.includes(entry.changeFrequency), `${entry.url} changeFrequency ${entry.changeFrequency}`);
    }
  });

  test("every sitemap page is served, indexable, and not a redirect source", () => {
    assert.ok(noIndexRoutes.has("/about"), "the noindex route scan should find the redirected starter src/app/about/page.tsx");
    for (const path of sitemapPaths) {
      assert.ok(isServed(path), `${path} is in the sitemap but has no page`);
      assert.ok(!noIndexRoutes.has(path), `${path} is noindex but in the sitemap`);
      const redirect = redirectFor(path);
      assert.equal(redirect, undefined, `${path} is in the sitemap but redirects to ${redirect?.destination}`);
    }
  });

  test("every internal navigation link is in the sitemap and not redirected", () => {
    const links = [
      ...headerMenus.flatMap((menu) => menu.items),
      ...footerColumns.flatMap((column) => column.items),
      ...featuredResources,
      pricingLink,
    ];
    const internal = [...new Set(
      links
        .filter((link) => link.href.startsWith("/") && !link.hash && !link.soon)
        .map((link) => link.href.split("#")[0]),
    )];
    assert.ok(internal.length > 25, "navigation data lost most of its internal links");
    for (const href of internal) {
      assert.ok(
        sitemapPaths.includes(href),
        noIndexRoutes.has(href)
          ? `${href} is linked from the navigation but its page is noindex; a visible nav link to a noindex page is a mistake unless the link is marked \`soon: true\` or \`hash: true\` in src/lib/nav.ts`
          : `${href} is linked from the navigation but missing from the sitemap; add it to src/app/sitemap.ts, or if the page is intentionally noindex mark the nav link \`soon: true\` or \`hash: true\` in src/lib/nav.ts`,
      );
      assert.equal(redirectFor(href), undefined, `${href} is linked from the navigation but redirects`);
    }
    for (const link of links.filter((link) => !link.href.startsWith("/"))) {
      assert.equal(new URL(link.href).protocol, "https:", `${link.label} links to ${link.href}`);
    }
  });

  test("every content collection entry is in the sitemap, and noindex releases are not", () => {
    const expected = {
      "blog posts": blogPosts.map((post) => blogPostHref(post.slug)),
      "press releases": indexablePressReleases.map((release) => pressReleaseHref(release.slug)),
      "case studies": caseStudies.map((study) => caseStudyHref(study.slug)),
      "legal pages": Object.keys(legalPages),
      "active roles": careersOpenPositions.filter((position) => position.active).map((position) => position.href),
      "collection pages": [blogMeta, pressMeta, caseStudiesMeta, careersMeta].map((meta) => meta.path),
    };
    for (const [collection, paths] of Object.entries(expected)) {
      assert.ok(paths.length > 0, `${collection} is empty`);
      assert.deepEqual(paths.filter((path) => !sitemapPaths.includes(path)), [], `${collection} missing from the sitemap`);
    }
    assert.deepEqual(
      sitemapPaths.filter((path) => path.startsWith("/careers/")).sort(),
      expected["active roles"].sort(),
      "sitemap roles drift from careersOpenPositions",
    );
    for (const release of pressReleases.filter((release) => release.noIndex)) {
      assert.ok(!sitemapPaths.includes(pressReleaseHref(release.slug)), `${release.slug} is noindex but in the sitemap`);
    }
  });

  test("robots points crawlers at the sitemap and disallows nothing it lists", () => {
    const rules = robots();
    assert.equal(rules.sitemap, `${origin}/sitemap.xml`);
    assert.equal(rules.sitemap, getAbsoluteUrl("/sitemap.xml"));
    const [rule] = rules.rules;
    assert.equal(rule.userAgent, "*");
    assert.ok([rule.allow].flat().includes("/"), "crawlers must be allowed in by default");
    for (const prefix of [rule.disallow].flat()) {
      assert.match(prefix, /^\/.*\/$/, `${prefix} should be a directory prefix`);
      assert.deepEqual(sitemapPaths.filter((path) => path.startsWith(prefix)), [], `robots disallows sitemap pages under ${prefix}`);
    }
  });

  test("redirects never loop, chain, or dead-end", () => {
    assert.equal(new Set(redirects.map((redirect) => redirect.source)).size, redirects.length, "a redirect source repeats");
    for (const { source, destination } of redirects) {
      assert.notEqual(source, destination, `${source} redirects to itself`);
      if (!destination.startsWith("/")) {
        assert.equal(new URL(destination).protocol, "https:", `${source} → ${destination}`);
        continue;
      }
      // Instantiate parameters so patterned destinations are checked as real paths.
      const sample = destination.replace(/:[A-Za-z]+(\([^)]*\))?/g, "sample");
      const next = redirectFor(sample);
      assert.equal(next, undefined, `${source} → ${destination} chains into ${next?.source} → ${next?.destination}`);
      if (sample === destination) {
        assert.ok(isServed(destination), `${source} → ${destination} lands on nothing`);
      }
    }
  });

  test("the canonical feed and blog paths survive the legacy blog redirect", () => {
    assert.equal(redirectFor(siteConfig.blogFeedPath), undefined, `${siteConfig.blogFeedPath} must not be caught by the /blog/:slug redirect`);
    assert.equal(redirectFor("/blog")?.destination, blogMeta.path);
    assert.equal(redirectFor(`/blog/${blogPosts[0].slug}`)?.destination, "/resources/blog/:slug");
    assert.equal(redirectFor(blogPostHref(blogPosts[0].slug)), undefined);
  });
});
