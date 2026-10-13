import type { QuizQuestion, QuizTopic } from "./types";

const allQuestions: QuizQuestion[] = [
  // ─── Semantic Conventions (9) ──────────────────────────────────────
  {
    id: "sc-01",
    topic: "semantic-conventions",
    question:
      "A Collector on an EKS node runs the resource detection processor with `detectors: [ec2, eks]`. Both detectors report `cloud.platform`. Which value ends up on the resource?",
    options: [
      "`aws_ec2`, because the first detector in the list wins conflicts",
      "`aws_eks`, because the most specific detector always takes precedence",
      "`aws_eks`, because later detectors overwrite values from earlier ones",
      "Neither; conflicting detector values are dropped with a warning",
    ],
    correctIndex: 0,
    explanation:
      "Detector order sets precedence, and the first detector wins. List specific detectors such as `eks` before general ones such as `ec2`.",
  },
  {
    id: "sc-02",
    topic: "semantic-conventions",
    question:
      "`k8sattributes` computes `service.name` for a pod labeled `app.kubernetes.io/name=checkout` and `app.kubernetes.io/instance=checkout-eu`, owned by Deployment `checkout-v2`. What is `service.name`?",
    options: [
      "`checkout`, from the `app.kubernetes.io/name` label",
      "`checkout-eu`, from the `app.kubernetes.io/instance` label",
      "`checkout-v2`, from the owning Deployment name",
      "The pod name, since labels are only read when annotated too",
    ],
    correctIndex: 1,
    explanation:
      "The instance label outranks the name label. The name label outranks the workload name, which outranks the pod name, so `checkout-eu` is used.",
  },
  {
    id: "sc-03",
    topic: "semantic-conventions",
    question:
      "Under the entity-aware Resource merge (spec 1.60, Development), a Resource holds entity `host{host.id=H1}`. A Resource with no entities and a raw attribute `host.id=h2` is merged in. What is the result?",
    options: [
      "The raw `host.id` is discarded because the host entity already owns it",
      "The host entity keeps its type but its identity is updated to `h2`",
      "The host entity is removed and `host.id=h2` stays as a raw attribute",
      "The merge fails and the original Resource is returned unchanged",
    ],
    correctIndex: 2,
    explanation:
      "A loose attribute that overwrites an entity's attribute invalidates that entity. The entity is dropped, `host.id=h2` wins, and the entity's other attributes remain as unassociated attributes.",
  },
  {
    id: "sc-04",
    topic: "semantic-conventions",
    question:
      "Neither Resource has entities. A detector Resource with schema URL `.../schemas/1.26.0` is merged with a user Resource with `.../schemas/1.40.0`. What do the stable Resource SDK rules say?",
    options: [
      "The old Resource's schema URL is kept, as the first non-empty value",
      "The updating Resource's schema URL wins, like its attributes",
      "The newer schema URL wins and older attributes are upgraded",
      "It is a merge error; the result is implementation-defined",
    ],
    correctIndex: 3,
    explanation:
      "Attribute conflicts go to the updating Resource, but two different non-empty schema URLs are a merging error with an implementation-specific result. Go, for example, returns the merged attributes with an empty schema URL plus `ErrSchemaURLConflict`.",
  },
  {
    id: "sc-05",
    topic: "semantic-conventions",
    question:
      "An eBPF agent instruments a running Python service without code changes and exports its spans. Per the Resource spec, how should the agent and the workload be represented?",
    options: [
      "`service.*` names the workload; the agent goes in `telemetry.sdk.*` / `telemetry.distro.*`",
      "`service.*` names the workload; the agent goes in `service.instance.id`",
      "`service.*` names the agent; the workload goes in `process.executable.name` and `process.pid`",
      "`service.*` names the agent; the workload goes in a per-span attribute",
    ],
    correctIndex: 0,
    explanation:
      "A Resource describes the observed entity, not the component that technically emits the data. Attributes like `telemetry.sdk.name` and `telemetry.distro.name` describe the instrumentation tooling.",
  },
  {
    id: "sc-06",
    topic: "semantic-conventions",
    question:
      "An instrumentation still in its HTTP semconv transition reads `OTEL_SEMCONV_STABILITY_OPT_IN=http,http/dup`. What does it emit?",
    options: [
      "Only stable names, because `http` is listed first",
      "Both the old and the stable names",
      "Only stable names, because `http` overrides `http/dup`",
      "Nothing until one value is removed, as the values conflict",
    ],
    correctIndex: 1,
    explanation:
      "`http/dup` has higher precedence than `http` when both are present, so both conventions are emitted. Instrumentations SHOULD drop the variable in their next major; the JS HTTP, fetch, XHR and gRPC instrumentations already emit only stable names since experimental 0.221.0.",
  },
  {
    id: "sc-07",
    topic: "semantic-conventions",
    question:
      "An HTTP server receives method `PURGE`, which is not in the instrumentation's known-method list, on route `/cache/{key}`. Which span name do the stable HTTP conventions prescribe?",
    options: [
      "`PURGE /cache/{key}`",
      "`_OTHER /cache/{key}`",
      "`HTTP /cache/{key}`",
      "`GET /cache/{key}`",
    ],
    correctIndex: 2,
    explanation:
      "Unknown methods set `http.request.method` to `_OTHER`, and the span name uses the literal `HTTP`. Arbitrary method strings then cannot raise span-name cardinality.",
  },
  {
    id: "sc-08",
    topic: "semantic-conventions",
    question:
      'A Go handler fails with `fmt.Errorf("load cart: %w", err)`, wrapping a `*net.OpError`. Under semconv v1.41+, which `error.type` values are allowed?',
    options: [
      "Only `*net.OpError`; uninformative wrappers MUST be unwrapped",
      "Only the wrapper type, since `error.type` records the returned type",
      "Either the wrapper type or `*net.OpError`; unwrapping is optional",
      'The `err.Error()` text up to the first colon, i.e. `"load cart"`',
    ],
    correctIndex: 2,
    explanation:
      "Instrumentation MAY use the inner error's type when the wrapper does not help classify the failure. It is not required. Messages are never acceptable because `error.type` SHOULD be low-cardinality.",
  },
  {
    id: "sc-09",
    topic: "semantic-conventions",
    question:
      "An HTTP client span ends because the TCP connection was refused, so no response was ever received. How should `http.response.status_code` be handled?",
    options: [
      "Leave it unset and record the failure type in `error.type`",
      "Set it to 503, matching what a reverse proxy would report",
      "Set it to -1 and put the exception class in `error.type`",
      "Set it to 0 so dashboards can count transport failures",
    ],
    correctIndex: 0,
    explanation:
      "The status code is Conditionally Required only when a response was received or sent. Synthetic codes corrupt status breakdowns, so `error.type` carries the transport failure.",
  },
  // ─── SDK and Zero-Code (10) ────────────────────────────────────────
  {
    id: "sdk-01",
    topic: "sdk-and-zero-code",
    question:
      "A pod sets `OTEL_CONFIG_FILE` (YAML with a `parent_based` ratio sampler) and also `OTEL_TRACES_SAMPLER=always_off` to silence tracing. Traces keep flowing. Why?",
    options: [
      "`OTEL_TRACES_SAMPLER` is read only by zero-code agents, never by the SDK itself",
      "Env vars outrank the file, but `always_off` still honors sampled parents",
      "With a config file set, `OTEL_*` vars apply only if the YAML references them",
      "`always_off` takes effect only when `OTEL_TRACES_SAMPLER_ARG` is also set",
    ],
    correctIndex: 2,
    explanation:
      "Declarative config replaces the flat env-var model instead of merging with it: once `OTEL_CONFIG_FILE` is set, other `OTEL_*` variables only matter where the YAML substitutes them, e.g. `${OTEL_TRACES_SAMPLER}`.",
  },
  {
    id: "sdk-02",
    topic: "sdk-and-zero-code",
    question:
      "With every batch processor setting left at its spec default, how do the scheduled export delays of the batch log record processor and batch span processor compare?",
    options: [
      "Both default to 5000 ms and share the `OTEL_BSP_SCHEDULE_DELAY` value",
      "Both default to 1000 ms; only their export timeouts differ",
      "Logs default to 5000 ms while spans default to 1000 ms",
      "Logs default to 1000 ms while spans default to 5000 ms",
    ],
    correctIndex: 3,
    explanation:
      "The spec gives the log processor a 1000 ms delay versus 5000 ms for spans. Python used 5000 ms for logs until v1.41.0, so upgrading can raise log export frequency about fivefold.",
  },
  {
    id: "sdk-03",
    topic: "sdk-and-zero-code",
    question:
      "A span attribute holds a 2 MB serialized request body. No attribute limits are set through env vars, code or a config file. What does the SDK export?",
    options: [
      "The full 2 MB value, as value length is unlimited by default",
      "No attribute, with the span's `dropped_attributes_count` incremented",
      "The value truncated to 4096 characters by the default length limit",
      "The value truncated to 1024 characters by the default length limit",
    ],
    correctIndex: 0,
    explanation:
      "Only the attribute count has a default (128). The value-length limit is unset by default, so oversized values ship intact unless you set `OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT` or `attribute_value_length_limit`.",
  },
  {
    id: "sdk-04",
    topic: "sdk-and-zero-code",
    question:
      "A library registers an observable gauge whose callback also refreshes an in-memory cache. The host app never installs an OTel SDK. What happens to the cache?",
    options: [
      "It refreshes every 60 s, and the gauge readings are discarded",
      "It never refreshes, since no-op meters never run callbacks",
      "It fails to load, as gauge registration throws with no SDK",
      "It refreshes once at registration and then never again",
    ],
    correctIndex: 1,
    explanation:
      "Without an SDK, instrument creation succeeds but no reader ever collects, so async callbacks are never invoked. Callbacks should only observe values, never carry application side effects.",
  },
  {
    id: "sdk-05",
    topic: "sdk-and-zero-code",
    question:
      "An API-only library runs in a process with no SDK. Given a context holding a valid remote `SpanContext`, it starts a span. What does the API return?",
    options: [
      "A non-recording span with a fresh span ID under the parent's trace",
      "An invalid span whose trace ID and span ID are all zeros",
      "A non-recording span that carries the parent's exact `SpanContext`",
      "A recording span that is buffered until an SDK is registered",
    ],
    correctIndex: 2,
    explanation:
      "The no-op tracer generates no IDs. It wraps the parent's `SpanContext` in a non-recording span, so context still flows through API-only code to downstream calls.",
  },
  {
    id: "sdk-06",
    topic: "sdk-and-zero-code",
    question:
      "An Instrumentation CR sets `OTEL_TRACES_SAMPLER=always_on` in `spec.env` and `parentbased_traceidratio` in `spec.java.env`. The container already sets `always_off`. Which value wins?",
    options: [
      "`parentbased_traceidratio`, as language-specific env is applied last",
      "`always_on`, as the common `spec.env` is applied after language env",
      "None: the webhook rejects the pod for conflicting sampler values",
      "`always_off`, as variables already set on the container are kept",
    ],
    correctIndex: 3,
    explanation:
      "The operator layers defaults, `spec.env`, then `spec.<lang>.env`, but never overrides a variable the pod already defines. A stale env var in the Deployment silently defeats the CR.",
  },
  {
    id: "sdk-07",
    topic: "sdk-and-zero-code",
    question:
      "A pod runs Envoy first and a Go service second, annotated `inject-go` and `otel-go-auto-target-exe=/app/svc`, with no `container-names` annotation. Spans appear, but `k8s.container.name` is `envoy`. Why?",
    options: [
      "The operator treats the first container as the app when it builds resource attributes",
      "The eBPF sidecar attached to Envoy, the first process it found in the pod",
      "A Collector's `k8sattributes` overwrote the container attributes set by the SDK",
      "Go injection always names the first container; the `container-names` annotation is ignored for Go",
    ],
    correctIndex: 0,
    explanation:
      "The sidecar shares the pod's PID namespace and finds the process by the target-exe path, so container order doesn't hide it. `k8s.container.name`, `service.instance.id` and the image-derived `service.version` come from the 'app container', which is the first one unless `instrumentation.opentelemetry.io/container-names` names another.",
  },
  {
    id: "sdk-08",
    topic: "sdk-and-zero-code",
    question:
      "A Node.js app calls the experimental `startNodeSDK()` (`@opentelemetry/sdk-node`) with `OTEL_CONFIG_FILE` pointing at YAML that fails validation. What happens at startup?",
    options: [
      "`startNodeSDK()` throws and the process exits before serving traffic",
      "A no-op SDK is returned, so the app runs with no telemetry at all",
      "The SDK ignores the file and falls back to `OTEL_*` env var settings",
      "Invalid sections are skipped and the valid sections still apply",
    ],
    correctIndex: 1,
    explanation:
      "`startNodeSDK()` logs the error and returns a no-op SDK instead of crashing, even though the spec says Create SHOULD fail fast. A config typo therefore silently disables telemetry; validate the YAML in CI. This is experimental and may change.",
  },
  {
    id: "sdk-09",
    topic: "sdk-and-zero-code",
    question:
      'A .NET app creates `ActivitySource("Orders")` and calls `StartActivity`, but its tracing setup only calls `AddSource("OrdersService")`. What does `StartActivity` return?',
    options: [
      "A non-recording Activity with `IsAllDataRequested` set to `false`",
      "A recording Activity that the exporter later filters out",
      "`null`, because no listener subscribes to that `ActivitySource`",
      "An Activity parented to the ASP.NET Core request span",
    ],
    correctIndex: 2,
    explanation:
      "In .NET the SDK only listens to sources named in `AddSource`. With no listener, `StartActivity` returns `null`, so spans vanish silently and unguarded `activity.SetTag` calls throw.",
  },
  {
    id: "sdk-10",
    topic: "sdk-and-zero-code",
    question:
      "A declarative config sets `endpoint: ${OTEL_ENDPOINT}`. The environment has `OTEL_ENDPOINT='${COLLECTOR_URL}'` and `COLLECTOR_URL=http://c:4318`. What endpoint results?",
    options: [
      "A parse error, because substituted values cannot contain `${`",
      "`http://c:4318`, because nested references are resolved in turn",
      "An empty string, because nested references are treated as undefined",
      "The literal text `${COLLECTOR_URL}`; substitution is not recursive",
    ],
    correctIndex: 3,
    explanation:
      "Env-var substitution in the config file runs a single pass by design, so a value that looks like a reference is kept verbatim. Chained indirection must be resolved before the process starts.",
  },
  // ─── Traces and Context (10) ───────────────────────────────────────
  {
    id: "tc-01",
    topic: "traces-and-context",
    question:
      "A service receives `traceparent` `00-00000000000000000000000000000000-00f067aa0ba902b7-01` plus a `tracestate` header. Per W3C Trace Context, what should it do?",
    options: [
      "Discard both headers and start a new trace as if none were received",
      "Generate a new trace-id but keep the parent-id and flags from the header",
      "Keep `tracestate`, generate only a new trace-id, and keep the sampled flag",
      "Reject the request with a 400 because the `traceparent` is malformed",
    ],
    correctIndex: 0,
    explanation:
      "An all-zero trace-id makes the whole `traceparent` invalid, and `tracestate` is meaningless without a valid `traceparent`, so both are dropped and a fresh trace starts.",
  },
  {
    id: "tc-02",
    topic: "traces-and-context",
    question:
      "An incoming `tracestate` already has 32 list-members, none of them yours. Your tracer continues the trace and adds its own entry. What should go out?",
    options: [
      "The 32 incoming entries unchanged; nothing may be added past the limit",
      "Your entry first, then the first 31 incoming entries",
      "Your entry last, after removing the left-most incoming entry",
      "Your entry first, then all 32 incoming entries; the limit is advisory",
    ],
    correctIndex: 1,
    explanation:
      "New entries go at the left, and a `tracestate` holds at most 32 list-members. If adding one would exceed that, the right-most member is removed.",
  },
  {
    id: "tc-03",
    topic: "traces-and-context",
    question:
      "A service that only implements `traceparent` version `00` receives a header with version `01` and extra trailing fields. What does the spec expect it to do?",
    options: [
      "Discard it, because an unknown version invalidates the `traceparent`",
      "Treat version `01` like `ff` and start a brand-new trace with a fresh trace-id",
      "Parse trace-id and parent-id with `00` rules and try to continue the trace",
      "Forward the header byte-for-byte without inserting its own parent-id",
    ],
    correctIndex: 2,
    explanation:
      "Trace Context is forward compatible: higher versions are parsed with the `00` layout, unknown flags are zeroed on output, and the trace is continued rather than rejected. Only `ff` is forbidden.",
  },
  {
    id: "tc-04",
    topic: "traces-and-context",
    question:
      "A `traceparent` ends in `-03`. Besides the sampled bit, what does this flags value promise to anyone consuming the trace-id?",
    options: [
      "The parent span context was received from a remote process",
      "The trace is a debug trace that must bypass all sampling",
      "Every one of the 16 trace-id bytes was generated at random",
      "At least the rightmost 7 bytes of the trace-id are random",
    ],
    correctIndex: 3,
    explanation:
      "`0x03` is sampled (`0x01`) plus the Level 2 random flag (`0x02`), which only guarantees randomness of the rightmost 7 bytes, the part consistent samplers rely on.",
  },
  {
    id: "tc-05",
    topic: "traces-and-context",
    question:
      "An OTLP span arrives with `flags = 0x00000301`. How should a consumer interpret that field?",
    options: [
      "Sampled, and its parent span context is known to be remote",
      "Sampled, with the W3C random bit set, and a known local parent span",
      "Sampled, remoteness unknown, and one link was dropped",
      "Sampled, and its parent span context is known to be local",
    ],
    correctIndex: 0,
    explanation:
      "The low byte (`0x01`) carries W3C trace flags, bit 8 (`0x100`) says remoteness is known, and bit 9 (`0x200`) says the parent is remote.",
  },
  {
    id: "tc-06",
    topic: "traces-and-context",
    question:
      "A reverse proxy forwards `traceparent` without creating any span, but wants to flip the sampled flag to 0 to shed load. What does W3C Trace Context say?",
    options: [
      "Allowed, since any participant may rewrite flags at every hop",
      "Not allowed: sampled may change only when parent-id changes too",
      "Allowed only if the proxy also drops the `tracestate` it received",
      "Not allowed: sampled is immutable once the trace root has set it",
    ],
    correctIndex: 1,
    explanation:
      "The sampled flag reflects the caller's decision, so only a participant that inserts its own parent-id (i.e. records its own span) may change it.",
  },
  {
    id: "tc-07",
    topic: "traces-and-context",
    question:
      "A repository call times out twice, and the third attempt inside the same span succeeds. How should that span record the outcome?",
    options: [
      "`ERROR`, because exceptions were thrown during the operation",
      "`UNSET`, with each failed attempt added to this span as an exception span event",
      "`ERROR`, with a description listing how many attempts failed",
      "`UNSET`; the failed attempts go to logs or per-attempt spans, not this span",
    ],
    correctIndex: 3,
    explanation:
      "Errors that were retried or handled SHOULD NOT be recorded on the span that describes the operation, and span events are being deprecated. Record attempts as their own spans (e.g. `http.request.resend_count`) or as log events.",
  },
  {
    id: "tc-08",
    topic: "traces-and-context",
    question:
      "You maintain a stable v2.x instrumentation library that calls `RecordException`. What do current semconv and the Span Event deprecation plan ask of v2?",
    options: [
      "Switch exceptions to the Logs API in the next v2 minor release",
      "Emit both span events and logs by default so no consumer breaks",
      "Keep span events by default; add `OTEL_SEMCONV_EXCEPTION_SIGNAL_OPT_IN` (`logs`, `logs/dup`)",
      'Replace `RecordException` with `AddEvent("exception")`, which stays supported in every major',
    ],
    correctIndex: 2,
    explanation:
      "Existing instrumentations keep span events as the default in their current major and SHOULD offer the opt-in (`logs` = logs only, `logs/dup` = both) for a phased rollout. They may switch to logs only in the next major, and users can bridge log events back to span events in the SDK.",
  },
  {
    id: "tc-09",
    topic: "traces-and-context",
    question:
      "On Linux, a parent process exports an env var named `traceparent` (lowercase) and spawns a child that extracts context with a spec-compliant env var carrier. What happens?",
    options: [
      "Nothing is extracted; `Get` reads only the normalized `TRACEPARENT`",
      "It is read, because the carrier looks up names case-insensitively",
      "It is read, and the carrier renames the variable to `TRACEPARENT`",
      "It is read, because lowercase names are valid under POSIX rules",
    ],
    correctIndex: 0,
    explanation:
      "Env var carriers normalize keys (uppercase, non-alphanumerics to `_`) and MUST NOT read a non-normalized variable. Only on case-insensitive platforms such as Windows can the lowercase variable be returned.",
  },
  {
    id: "tc-10",
    topic: "traces-and-context",
    question:
      "HTTP instrumentation marks a span `ERROR` for a 404, but your handler treats that 404 as expected and sets status `OK` on the same span. What gets exported?",
    options: [
      "`ERROR`, because an `ERROR` status can never be downgraded",
      "`OK`, because an explicit `OK` takes precedence over `ERROR`",
      "Whichever status was set last, since each call overwrites",
      "`UNSET`, because conflicting status values cancel each other",
    ],
    correctIndex: 1,
    explanation:
      "`OK` is reserved for the application owner to declare success; it is final and suppresses `ERROR` set by instrumentation, which is why libraries should never set `OK` themselves.",
  },
  // ─── Metrics (10) ──────────────────────────────────────────────────
  {
    id: "me-01",
    topic: "metrics",
    question:
      "An OTLP Histogram point has `explicit_bounds` `[10, 25, 50, 100]`. How many `bucket_counts` entries does it carry, and where does a measurement of exactly 25 land?",
    options: [
      "4 entries; the value 25 lands in the (25, 50] bucket",
      "5 entries; the value 25 lands in the [25, 50) bucket",
      "5 entries; the value 25 lands in the (10, 25] bucket",
      "4 entries; the value 25 lands in the (10, 25] bucket",
    ],
    correctIndex: 2,
    explanation:
      "N bounds define N+1 buckets, including the overflow bucket up to +infinity, and each bucket's upper bound is inclusive. A value equal to a bound therefore lands in the bucket that ends at that bound.",
  },
  {
    id: "me-02",
    topic: "metrics",
    question:
      "An OTLP `ExponentialHistogram` data point has scale 3. What is the ratio between one bucket boundary and the next?",
    options: [
      "3^(1/2), roughly 1.73",
      "2^3, exactly 8",
      "2^(1/3), roughly 1.26",
      "2^(1/8), roughly 1.09",
    ],
    correctIndex: 3,
    explanation:
      "The base is 2^(2^-scale), so scale 3 gives 2^(1/8). Each extra step of scale takes the square root of the base, which doubles the resolution.",
  },
  {
    id: "me-03",
    topic: "metrics",
    question:
      "After an upgrade to an SDK that applies the spec's default cardinality limit, a counter with a `customer.id` attribute shows a new series with `otel.metric.overflow=true`. What happened?",
    options: [
      "Attribute sets past the 2000th were aggregated into a single overflow series",
      "The SDK stopped exporting the counter and logged a cardinality limit error",
      "The exporter moved later points to a new stream with an `_overflow` name suffix",
      "The SDK removed `customer.id` from every point once 2000 values had been seen",
    ],
    correctIndex: 0,
    explanation:
      "The default limit is 2000 attribute sets per metric stream. Existing series keep reporting, and measurements for new attribute sets are aggregated into one series marked `otel.metric.overflow=true`, so the totals stay correct.",
  },
  {
    id: "me-04",
    topic: "metrics",
    question:
      "A periodic reader sets `cardinality_limits {default: 500, histogram: 3000}`. A View on one histogram sets `aggregation_cardinality_limit: 100`. Which limits apply to that histogram and to an UpDownCounter with no View?",
    options: [
      "3000 and 500: reader limits take precedence over Views",
      "100 and 2000: instruments without a View use the spec default",
      "3000 and 2000: per-type keys win, and `default` applies to no instrument type",
      "100 and 500: the View wins; other instruments use the reader default",
    ],
    correctIndex: 3,
    explanation:
      "A matching View's `aggregation_cardinality_limit` comes first, then the reader's per-instrument-type limit (a missing type key falls back to `default`), then the spec default of 2000.",
  },
  {
    id: "me-05",
    topic: "metrics",
    question:
      "An `active_requests` UpDownCounter is incremented with `{http.request.method}` at request start and decremented with `{http.request.method, http.response.status_code}` at the end. What do dashboards show?",
    options: [
      "One series per method; the SDK drops keys absent from the matching +1",
      "One series per method; the default View filters `http.response.status_code`",
      "Separate series: start series only grow, end series only shrink",
      "No -1 values; the SDK rejects a decrement with no prior increment",
    ],
    correctIndex: 2,
    explanation:
      "The attribute set is the series identity, and no default View filters attributes. Increment and decrement must use the same set, limited to attributes known at start.",
  },
  {
    id: "me-06",
    topic: "metrics",
    question:
      "With `span_metrics` connector defaults and default feature gates (contrib v0.161), how do you compute an error ratio per operation from its output?",
    options: [
      "Divide the `traces.span.metrics.errors` series by `traces.span.metrics.calls`",
      "Filter calls on `otel.status_code=ERROR` and divide by all calls",
      "Filter calls on `http.response.status_code >= 500` and divide by all calls",
      "Filter calls on `status.code=STATUS_CODE_ERROR` and divide by all calls",
    ],
    correctIndex: 3,
    explanation:
      "There is no separate errors metric; errors are calls whose `status.code` dimension is `STATUS_CODE_ERROR`. The alpha `spanmetrics.statusCodeConvention.useOtelPrefix` gate switches this to `otel.status_code=ERROR`.",
  },
  {
    id: "me-07",
    topic: "metrics",
    question:
      "An interval processor (60s, default `pass_through`) receives a cumulative monotonic counter, a cumulative non-monotonic sum and a gauge. Which are reduced to one point per interval?",
    options: [
      "Only the counter; the other two pass through unchanged",
      "The counter and the non-monotonic sum; the gauge passes through",
      "The counter and the gauge; the non-monotonic sum passes through",
      "All three, keeping only the newest point for each stream",
    ],
    correctIndex: 2,
    explanation:
      "Cumulative monotonic data is reduced losslessly to the latest point. Gauges and summaries are also reduced by default (lossy; set `pass_through.gauge` to keep them). Non-monotonic sums always pass through. Delta handling is changing: contrib main now sums monotonic deltas per interval.",
  },
  {
    id: "me-08",
    topic: "metrics",
    question:
      "A collector prometheus exporter runs with defaults. PromQL on `http_server_request_duration_seconds_bucket` cannot filter by `k8s_namespace_name`. Why?",
    options: [
      "The exporter drops every resource attribute outside the `service.*` namespace",
      "Resource attributes stay on `target_info` unless selected as labels",
      "Resource labels are only emitted when `enable_open_metrics` is `true`",
      "Labels from dotted keys are dropped unless `NoTranslation` is set",
    ],
    correctIndex: 1,
    explanation:
      "By default resource attributes are exposed on `target_info`, which you join on `job` and `instance`. Since v0.160.0, `resource_constant_labels` (`included`/`excluded` patterns) selects attributes to copy onto every series; the older `resource_to_telemetry_conversion` is deprecated.",
  },
  {
    id: "me-09",
    topic: "metrics",
    question:
      "An SDK View renames an instrument's metric stream to `2xx_responses`, a name that starts with a digit. What happens under the current Metrics spec?",
    options: [
      "The View is rejected at registration because names must start with a letter",
      "The SDK prefixes the name with an underscore to make it valid",
      "The rename is accepted; View stream names skip instrument-name checks",
      "The original instrument name is kept and a warning is logged",
    ],
    correctIndex: 2,
    explanation:
      "Instrument-name syntax (starts with a letter, at most 255 characters) applies when an instrument is created. Spec v1.57.0 clarified that a name supplied by a View is not validated against those rules.",
  },
  {
    id: "me-10",
    topic: "metrics",
    question:
      "A View keeps only `http.request.method` on a histogram. A measurement that also carried `user.id` is sampled as an exemplar. Where can `user.id` still appear?",
    options: [
      "Nowhere, since Views remove the attributes before exemplars are sampled",
      "In the exemplar's span context, carried along as W3C baggage entries",
      "In the data point attributes, because exemplars pin their own series",
      "In the exemplar's `filtered_attributes`, not in the data point attributes",
    ],
    correctIndex: 3,
    explanation:
      "An exemplar keeps the measurement attributes that aggregation dropped in `filtered_attributes`. That preserves detail for drill-down without adding a series dimension.",
  },
  // ─── Logs (10) ─────────────────────────────────────────────────────
  {
    id: "lo-01",
    topic: "logs",
    question:
      "A `logdedup` processor has `conditions: [log.severity_number >= SEVERITY_NUMBER_ERROR]`. Records arrive with `severity_number` 21 and 0. What happens to each?",
    options: [
      "The 21 record is aggregated; the 0 record passes through unaggregated",
      "Both pass through; `FATAL` is outside the `ERROR` range the condition names",
      "Both are aggregated; unmatched records are still hashed and counted",
      "The 21 record is aggregated; the 0 record is dropped as invalid severity",
    ],
    correctIndex: 0,
    explanation:
      "21 is `FATAL`, numerically above `ERROR` (17), so it matches. 0 means unspecified and does not match, and non-matching records pass through without aggregation. Un-prefixed paths like `severity_number` are deprecated in `logdedup` conditions.",
  },
  {
    id: "lo-02",
    topic: "logs",
    question:
      "A Collector replays week-old file lines today. For some lines the timestamp can't be parsed, so `time_unix_nano` stays 0. A backend that keeps one timestamp per record follows the logs data model. What time do those records get?",
    options: [
      "1970-01-01, since `time_unix_nano` is 0",
      "Today's collection time, taken from `observed_time_unix_nano`",
      "None; they are rejected because `Timestamp` is a required field in OTLP",
      "The timestamp of the previous record that did parse",
    ],
    correctIndex: 1,
    explanation:
      "`Timestamp` is optional, and `ObservedTimestamp` SHOULD always be set by the collector. Single-timestamp consumers use `Timestamp` if present, otherwise `ObservedTimestamp`, so unparsed backlog lines land at replay time.",
  },
  {
    id: "lo-03",
    topic: "logs",
    question:
      "A team emits events through the OTel Logs API but still sets an `event.name` log attribute. Per the current logs data model, where should the event name go?",
    options: [
      "In the `event.name` log attribute, which semconv now marks as stable",
      "In an `event.name` key inside a kvlist body, next to the payload",
      "In the `LogRecord` `EventName` field, serialized as `event_name` in OTLP",
      "In the `otel.event.name` resource attribute of the emitting service",
    ],
    correctIndex: 2,
    explanation:
      "OTLP stabilized a top-level `event_name` field on `LogRecord`, replacing the `event.name` attribute convention; the Logs API exposes it as `EventName`.",
  },
  {
    id: "lo-04",
    topic: "logs",
    question:
      "A team moved events to the Logs API and enables the SDK event-to-span-event bridge processor (spec: Development) for a legacy backend. Which log records become span events?",
    options: [
      "Every record emitted while a span is active, named or unnamed",
      "Records at `ERROR` severity or above emitted inside any recording span",
      "Records carrying `exception.type` attributes, whatever their context",
      "Named events whose trace and span IDs match a recording current span",
    ],
    correctIndex: 3,
    explanation:
      "The bridge converts a `LogRecord` only if it has a non-empty `EventName` and valid `TraceId` and `SpanId`, and those IDs equal the current span's, which must be recording. Otherwise it does nothing.",
  },
  {
    id: "lo-05",
    topic: "logs",
    question:
      "A library calls `logger.Enabled(ctx, INFO)` once at startup, caches the result, and skips `Emit` whenever it was `false`. What is the problem?",
    options: [
      "The result can change over time, so a cached `false` keeps dropping records",
      "`Enabled` must be called right before every `Emit` or the SDK drops the record",
      "`Enabled` always returns `true` once an SDK is installed, so caching is moot",
      "`Enabled` ignores severity and only evaluates `EventName`, so `INFO` is ignored",
    ],
    correctIndex: 0,
    explanation:
      "`Enabled` is an optional optimization whose value is not static; the SDK filters disabled records itself, so caching only risks silently losing logs after configuration changes.",
  },
  {
    id: "lo-06",
    topic: "logs",
    question:
      "A Go service uses the `otelslog` bridge. Spans export fine, but log records have empty trace and span IDs. The code calls `slog.Info(msg, args...)`. Likely cause?",
    options: [
      "`otelslog` only correlates when built with a `WithTraceCorrelation` option",
      "The calls pass no context, so the bridge has no active span to read",
      "Correlation needs `trace_id` and `span_id` attributes on each log call",
      "The `LoggerProvider` must be registered before the `TracerProvider`",
    ],
    correctIndex: 1,
    explanation:
      "Trace and span IDs are taken from the context handed to `Emit`; `slog.Info` carries no request context, so use `slog.InfoContext(ctx, ...)` to get correlation.",
  },
  {
    id: "lo-07",
    topic: "logs",
    question:
      "A `filelog` receiver uses `start_at: end` and no storage extension. The collector restarts and is down for two minutes. What happens to lines written meanwhile?",
    options: [
      "They are read, because offsets are recovered from the file fingerprints",
      "They are read, because `start_at` only applies to newly discovered files",
      "They are skipped, because reading resumes from each file's current end",
      "They are read twice, because every file is re-read from the beginning",
    ],
    correctIndex: 2,
    explanation:
      "Without a storage extension offsets are not persisted, so after a restart every file is newly discovered and `start_at: end` skips the gap; configure storage to resume from the last position.",
  },
  {
    id: "lo-08",
    topic: "logs",
    question:
      "A `filelog` receiver keeps the default `max_log_size` and `max_log_size_behavior`. One log entry in the file is 3 MiB. What does the receiver emit?",
    options: [
      "One record truncated to 1 MiB, with the remaining bytes dropped",
      "One 3 MiB record, because the limit only bounds multiline buffers",
      "Nothing, because the entry is dropped and counted as a parse error",
      "Several records, because the oversized entry is split at 1 MiB",
    ],
    correctIndex: 3,
    explanation:
      "`max_log_size` defaults to `1MiB` and `max_log_size_behavior` defaults to `split`, so one logical entry becomes multiple records; truncation must be opted into with `truncate`.",
  },
  {
    id: "lo-09",
    topic: "logs",
    question:
      "`logdedup` aggregates 42 identical records seen between 10:15:30 and 10:15:39 and emits one record. What is that record's `Timestamp`?",
    options: [
      "The emission time; both occurrences are kept in RFC3339 attributes",
      "10:15:39, the last occurrence; the first one is kept in an attribute",
      "10:15:30, the first occurrence; the last one is kept in an attribute",
      "Unset; only `ObservedTimestamp` is filled, with the emission time",
    ],
    correctIndex: 0,
    explanation:
      "The aggregated record gets `Timestamp` and `ObservedTimestamp` set to emission time; the original times survive only in `first_observed_timestamp` and `last_observed_timestamp`, which matters for time-range queries.",
  },
  {
    id: "lo-10",
    topic: "logs",
    question:
      "A drain processor with `warmup_min_clusters: 20` feeds a filter that drops records by `log.record.template`. What happens to records seen before 20 clusters exist?",
    options: [
      "They are buffered, then released with templates once the warmup completes",
      "They pass through unannotated, so the filter lets all of them through",
      "They get the generic template `<*>` until the warmup window ends",
      "They are dropped, since the filter fails on the missing attribute",
    ],
    correctIndex: 1,
    explanation:
      "Warmup trains on every record but skips writing the template attribute; records flow on immediately and are never re-annotated, so noisy patterns slip past template-based filters during warmup.",
  },
  // ─── Collector (10) ────────────────────────────────────────────────
  {
    id: "co-01",
    topic: "collector",
    question:
      "A `memory_limiter` has `check_interval: 1s` and `limit_mib: 2000`, with `spike_limit_mib` unset. At what point does it start refusing data?",
    options: [
      "When process RSS exceeds 2000 MiB, the hard limit",
      "When process RSS exceeds 1600 MiB, the soft limit",
      "When Go heap allocation exceeds 1600 MiB",
      "When Go heap allocation exceeds 2000 MiB",
    ],
    correctIndex: 2,
    explanation:
      "`spike_limit_mib` defaults to 20% of `limit_mib`, so the soft limit is 1600 MiB, and refusal already starts above the soft limit. The limiter measures Go heap (`runtime.MemStats.Alloc`), not RSS, so the process footprint runs higher.",
  },
  {
    id: "co-02",
    topic: "collector",
    question:
      "A batch processor has `send_batch_size: 8192` and the default `send_batch_max_size`. One request carrying 50,000 spans arrives. What is sent downstream?",
    options: [
      "Seven batches, none larger than 8192 spans",
      "One 8192-span batch now, the rest after the timeout",
      "Nothing; the request is rejected as oversized",
      "A single batch holding all 50,000 spans",
    ],
    correctIndex: 3,
    explanation:
      "`send_batch_size` only triggers a send; splitting happens only when `send_batch_max_size` is set, and its default of 0 means no upper limit, so the oversized batch goes out whole.",
  },
  {
    id: "co-03",
    topic: "collector",
    question:
      "A backend is down for 20 minutes. An `otlp_grpc` exporter uses default `sending_queue` settings. What happens to new data once the queue is full?",
    options: [
      "It is dropped, since `block_on_overflow` is `false`",
      "Receivers block and push backpressure to the SDKs",
      "Queued data spills to disk until the backend recovers",
      "The oldest queued requests are evicted to make room",
    ],
    correctIndex: 0,
    explanation:
      "By default a full sending queue rejects new data instead of blocking callers; backpressure requires `block_on_overflow: true`, and disk buffering requires a storage extension for a persistent queue.",
  },
  {
    id: "co-04",
    topic: "collector",
    question:
      "An exporter sets `sending_queue.queue_size: 1000` and leaves the queue sizer unset. What does the value 1000 actually bound?",
    options: [
      "1000 spans, data points, or log records",
      "1000 export requests, whatever their size",
      "1000 KiB of serialized payload",
      "1000 batches produced by `sending_queue.batch`",
    ],
    correctIndex: 1,
    explanation:
      "The queue-level sizer defaults to `requests`, while the batch sizer defaults to `items`. A queue of 1000 large requests can therefore hold far more telemetry, and memory, than the number suggests.",
  },
  {
    id: "co-05",
    topic: "collector",
    question:
      "A custom exporter built on `exporterhelper` gets HTTP 200 but fails to parse the response body. How should it classify that error?",
    options: [
      "Retryable, since the export outcome is unknown",
      "A partial failure carrying the affected items",
      "Permanent, since the server already has the data",
      "Retryable, but only when `sending_queue.wait_for_result` is on",
    ],
    correctIndex: 2,
    explanation:
      "A 2xx means the backend stored the data; returning a retryable error would make the retry logic resend it and create duplicates. The OTLP HTTP exporter was fixed this way in v0.156.0.",
  },
  {
    id: "co-06",
    topic: "collector",
    question:
      "An exporter sets `headers: {X-Tenant: ${env:TENANT:-shared}}`. The pod sets `TENANT` to an empty string. What `X-Tenant` value does the exporter send?",
    options: [
      "`shared`, since empty values fall back to the default",
      "The literal text of the unexpanded placeholder",
      "None; the Collector fails to start on the empty variable",
      "An empty value, since the variable exists",
    ],
    correctIndex: 3,
    explanation:
      "The `:-` default applies only when the variable is unset. A set-but-empty variable resolves to an empty value and only logs an info message. For non-string fields it decodes to the type's zero value instead.",
  },
  {
    id: "co-07",
    topic: "collector",
    question:
      "An OTLP receiver has `protocols: {grpc: {}, http: {endpoint: ${env:MY_POD_IP}:4318}}`. SDKs in other pods succeed over OTLP/HTTP but get connection refused over OTLP/gRPC. Why?",
    options: [
      "gRPC falls back to `localhost:4317` because its endpoint is not set",
      "gRPC is disabled whenever the HTTP protocol sets an explicit endpoint",
      "gRPC reuses the HTTP port, 4318, when only HTTP sets an endpoint",
      "gRPC needs `include_metadata` before it accepts remote peers",
    ],
    correctIndex: 0,
    explanation:
      "Each protocol has its own endpoint. The defaults are `localhost:4317` for gRPC and `localhost:4318` for HTTP, which accept only loopback connections. Set the gRPC endpoint to the pod IP or `0.0.0.0` as well.",
  },
  {
    id: "co-08",
    topic: "collector",
    question:
      "Agent Collectors forward OTLP to a gateway running `k8sattributes` with default `pod_association`. Spans get the agent pods' metadata. What fixes it?",
    options: [
      "Set `wait_for_metadata: true` on the gateway processor",
      "Use `passthrough` on agents; match `k8s.pod.ip` at gateway",
      "Add `filter.node_from_env_var` to the gateway's `k8sattributes`",
      "Place the batch processor before `k8sattributes`",
    ],
    correctIndex: 1,
    explanation:
      "By default association falls back to the connection IP, which at the gateway is the agent pod. Agents in `passthrough` mode record the real pod IP as `k8s.pod.ip`, and the gateway associates on that attribute.",
  },
  {
    id: "co-09",
    topic: "collector",
    question:
      "ServiceMonitors reference `basicAuth` secrets, and the Target Allocator to Collector link has no mTLS. What does the Target Allocator do with those secret values by default?",
    options: [
      "Serves them in plain text over the in-cluster link",
      "Omits the affected scrape jobs from the allocation",
      "Masks them unless `allowInsecureAuthSecrets` is set",
      "Refuses to start until cert-manager is installed",
    ],
    correctIndex: 2,
    explanation:
      "Secret values are masked unless mTLS (`spec.mtls`) is enabled, so scrapes needing them fail to authenticate. `allowInsecureAuthSecrets` serves them over plain HTTP when a mesh already secures the link.",
  },
  {
    id: "co-10",
    topic: "collector",
    question:
      "An OpAMP server has a new remote config for an agent on the plain HTTP transport that currently has nothing to report. When can the agent receive it?",
    options: [
      "Immediately, via a server-initiated HTTP request sent to the agent",
      "In the response to the agent's next poll, every 30 s by default",
      "Only after the agent upgrades to WebSocket to accept pushes",
      "Only in the response to the agent's next full status report",
    ],
    correctIndex: 1,
    explanation:
      "OpAMP over HTTP is half-duplex. An idle client polls with an `AgentToServer` holding only `instance_uid` (default every 30 s, or the heartbeat interval), and the server answers with any pending `ServerToAgent` message.",
  },
  // ─── OTTL (10) ─────────────────────────────────────────────────────
  {
    id: "ot-01",
    topic: "ottl",
    question:
      'A transform processor `metric_statements` entry is: `set(metric.description, "x") where datapoint.attributes["env"] == "prod"`. No context is configured. Which OTTL context does the processor infer?',
    options: [
      "`datapoint`, the most specific context that can reach both paths",
      "`resource`, the lowest shared level both paths can fall back to",
      "`metric`, because the context follows the path the editor writes to",
      "None; mixing context prefixes in one statement fails to parse",
    ],
    correctIndex: 0,
    explanation:
      "Context inference picks the most specific context that can access every path used. The `datapoint` context can also read and write `metric`, `scope` and `resource` paths, so the statement runs once for each datapoint.",
  },
  {
    id: "ot-02",
    topic: "ottl",
    question:
      "A v0.158 transform processor has no `error_mode` configured. A `ParseJSON` statement errors on one log record whose body is not JSON. What happens?",
    options: [
      "The error goes upstream and the whole payload is dropped",
      "The error is logged and processing moves to the next statement",
      "Only that log record is dropped; the rest of the batch continues",
      "The error is suppressed without logging and processing continues",
    ],
    correctIndex: 1,
    explanation:
      "Since v0.153.0 the default is `ignore`, and v0.157.0 made that default permanent. Ignore logs the error and continues. Propagate, the old default, fails the whole payload, and `silent` skips the log entry.",
  },
  {
    id: "ot-03",
    topic: "ottl",
    question:
      "In a filter processor, `spanevent` conditions match every event on span S, and `datapoint` conditions match every data point of metric M. What reaches the exporter?",
    options: [
      "Neither S nor M, since all of their children were dropped",
      "Both S and M, kept as empty containers with no children",
      "S is kept without events, while M is removed entirely",
      "S is removed, while M is kept with zero data points",
    ],
    correctIndex: 2,
    explanation:
      "The filter processor treats the two parent types differently. A span stays after all of its events are dropped, but a metric with no data points left is removed.",
  },
  {
    id: "ot-04",
    topic: "ottl",
    question:
      '`trace_statements` run `delete_key(resource.attributes, "k8s.namespace.name")` and then `set(resource.attributes["namespace"], resource.attributes["k8s.namespace.name"])`. On contrib v0.161+ defaults, what is the result?',
    options: [
      "`namespace` holds the old value, as statements read a pre-run snapshot",
      "`namespace` exists with an empty value; `k8s.namespace.name` is gone",
      "The `set` statement errors and the payload is dropped by default",
      "Neither key remains; `set` skips the `nil` source and creates nothing",
    ],
    correctIndex: 1,
    explanation:
      "Statements run in order, so the source is `nil` when `set` runs. Since v0.161 the `ottl.set.allowNil` gate is on (beta, then stable), so `set` passes `nil` to the target and a map key gets an empty value. Before v0.161, `set` skipped `nil`. Guard with `where ... != nil`.",
  },
  {
    id: "ot-05",
    topic: "ottl",
    question:
      '`trace_statements` contains `set(span.attributes["had_exception"], true) where spanevent.name == "exception"`. Which behavior results?',
    options: [
      "It runs once per span event; spans without events are never checked",
      "Parse error, because span context cannot reference `spanevent` paths",
      "It runs once per span and checks whether any event matches the name",
      "It runs once per span and only inspects the first event on the span",
    ],
    correctIndex: 0,
    explanation:
      "Because the statement uses a `spanevent` path, inference selects the `spanevent` context, which can also write span fields. It runs once per event, so spans with no events never match. A span-context statement cannot look down into its events.",
  },
  {
    id: "ot-06",
    topic: "ottl",
    question:
      'On v0.153+, `metric_statements` has `set(datapoint.value_double, 0.0) where datapoint.attributes["reset"] == true`, with no `metric.type` guard. It matches a histogram data point. What happens?',
    options: [
      "It silently does nothing because histograms lack `value_double`",
      "The setter returns an unsupported data point type error",
      "It writes `0.0` into the histogram data point's `sum` field instead",
      "It converts the metric to a gauge holding a single `0.0` value",
    ],
    correctIndex: 1,
    explanation:
      "Since v0.153.0, `datapoint` setters return an error when the path does not apply to the data point type. Before that release, the setter did nothing and reported no error. Guard type-specific setters with a condition such as `metric.type == METRIC_DATA_TYPE_SUM`.",
  },
  {
    id: "ot-07",
    topic: "ottl",
    question:
      'A transform group has conditions `[metric.type == METRIC_DATA_TYPE_SUM, metric.type == METRIC_DATA_TYPE_GAUGE]` and the statement `set(metric.unit, "s") where metric.unit == "ms"`. Which metrics change?',
    options: [
      "Only metrics satisfying both conditions and the where clause",
      "Every Sum and Gauge metric, since group conditions override where",
      "Sum or Gauge metrics whose unit is currently `ms`",
      "Any metric whose unit is `ms`, plus every Sum or Gauge metric",
    ],
    correctIndex: 2,
    explanation:
      "A group's conditions are ORed with each other, and each statement's where clause is ANDed with that result. The update applies only to Sum or Gauge metrics that also have unit `ms`.",
  },
  {
    id: "ot-08",
    topic: "ottl",
    question:
      'You want span names like `"GET /users/42/orders"` to become `"GET /users/{id}/orders"` and keep all other text. Which statement does it?',
    options: [
      '`replace_match(span.name, "*/users/*/orders", "/users/{id}/orders")`',
      '`replace_all_matches(span.name, "*/users/*", "/users/{id}")`',
      '`replace_all_patterns(span.name, "value", "/users/[0-9]+", "/users/{id}")`',
      '`replace_pattern(span.name, "/users/[0-9]+", "/users/{id}")`',
    ],
    correctIndex: 3,
    explanation:
      '`replace_pattern` replaces only the regex match inside the string. `replace_match` replaces the whole string on a glob match and would drop `"GET "`. The `replace_all_*` editors take a map, not a string. (Inside OTTL string literals, regex backslashes must be doubled, e.g. `"\\\\d+"`.)',
  },
  {
    id: "ot-09",
    topic: "ottl",
    question:
      'Which spans satisfy: `where not span.kind == SPAN_KIND_SERVER and span.status.code == STATUS_CODE_ERROR or span.name == "health"`?',
    options: [
      "Non-server spans with error status, plus every span named `health`",
      "Every span except server spans that are either errors or named `health`",
      "Non-server spans that have error status or are named `health`",
      "None; `not` cannot prefix a comparison without parentheses",
    ],
    correctIndex: 0,
    explanation:
      "In OTTL, `not` binds to the single comparison that follows it, and `and` binds more tightly than `or`. The expression reads `((not SERVER) and ERROR) or name == health`.",
  },
  {
    id: "ot-10",
    topic: "ottl",
    question:
      'A routing connector route uses `context: request` with condition `request["X-Tenant"] == "acme"`, deprecated in v0.156.0. What is the documented replacement for HTTP client metadata?',
    options: [
      '`resource.attributes["X-Tenant"] == "acme"`',
      '`otelcol.client.metadata["X-Tenant"][0] == "acme"`',
      '`otelcol.grpc.metadata["X-Tenant"] == "acme"`',
      '`otelcol.client.auth.attributes["X-Tenant"] == "acme"`',
    ],
    correctIndex: 1,
    explanation:
      "The `otelcol.*` paths are read-only and available in every signal context. Client metadata values are lists, so you index the first value. `otelcol.grpc.metadata` is meant for gRPC metadata, and `auth.attributes` holds authenticator output rather than request headers.",
  },
  // ─── Sampling (10) ─────────────────────────────────────────────────
  {
    id: "sa-01",
    topic: "sampling",
    question:
      "A `tail_sampling` config has a drop policy matching `url.path` `/health` and a `status_code` `ERROR` policy (`sample_on_first_match: false`). A `/health` request fails with `ERROR`. What happens to the trace?",
    options: [
      "Sampled, because the `status_code` policy is evaluated after the drop",
      "Sampled, because an `ERROR` status match outranks every other policy",
      "Not sampled, because a `Dropped` decision overrides any `Sampled` vote",
      "Decided by list order, since the last matching policy wins the vote",
    ],
    correctIndex: 2,
    explanation:
      "Final decisions follow a precedence: any `Dropped` vote discards the trace, and only then does any `Sampled` vote keep it. Order in the list does not matter unless `sample_on_first_match` is enabled.",
  },
  {
    id: "sa-02",
    topic: "sampling",
    question:
      "A `string_attribute` policy on `/health` with `invert_match: true` used to suppress health traces that other policies sampled. After upgrading from v0.140.0 to v0.150.0 with default feature gates, they reappear. Why?",
    options: [
      "`invert_match` was removed, so the policy now matches every trace",
      "`invert_match` now flips the final trace decision instead of the policy vote",
      "The `string_attribute` policy now reads only resource attributes",
      "`invert_match` now yields a plain `NotSampled`, which cannot veto a Sample",
    ],
    correctIndex: 3,
    explanation:
      "Since v0.144.0 the `disableinvertdecisions` gate is on by default, so `invert_match` produces an ordinary vote instead of the vetoing `InvertNotSampled`. The gate became stable in v0.152.0 and was removed in v0.155.0. Use a drop policy to veto.",
  },
  {
    id: "sa-03",
    topic: "sampling",
    question:
      "A `tail_sampling` processor runs with default `num_traces` and `decision_wait`. Above roughly what steady rate of new traces will it start evicting traces before a decision is made?",
    options: [
      "About 1,667 new traces per second",
      "About 833 new traces per second",
      "About 5,000 new traces per second",
      "About 50,000 new traces per second",
    ],
    correctIndex: 0,
    explanation:
      "Defaults are `num_traces` 50000 and `decision_wait` 30s, so the buffer holds about 50000 / 30 = 1,667 new traces per second; beyond that the oldest traces are evicted and counted in `sampling_trace_dropped_too_early`.",
  },
  {
    id: "sa-04",
    topic: "sampling",
    question:
      "With default `decision_cache` settings, a span arrives after its trace was already decided and released from the tail sampler's memory. What happens to that span?",
    options: [
      "It is forwarded, because late spans inherit the trace's last decision",
      "It opens a new trace entry and is evaluated on its own after the wait",
      "It is discarded, because late spans are never admitted to the buffer",
      "It is parked until eviction and then counted as `dropped_too_early`",
    ],
    correctIndex: 1,
    explanation:
      "Both decision caches default to 0 (disabled), so nothing remembers the earlier verdict; the late span is treated as a new trace and re-evaluated, which can yield a different decision for the same trace ID.",
  },
  {
    id: "sa-05",
    topic: "sampling",
    question:
      "A `rate_limiting` policy sets `spans_per_second: 100` and no `burst_capacity` (Collector v0.153+). A 250-span trace arrives while the collector is idle. What does this policy decide?",
    options: [
      "Sampled once the bucket refills, about 2.5 seconds later",
      "Sampled, because the policy limits traces per second, not spans",
      "Never sampled, since it exceeds the default 200-span burst capacity",
      "Partly sampled: the first 100 spans pass, the other 150 are dropped",
    ],
    correctIndex: 2,
    explanation:
      "`rate_limiting` is a token bucket whose size defaults to 2 x `spans_per_second`; a trace needing more tokens than the bucket can ever hold is never sampled by that policy.",
  },
  {
    id: "sa-06",
    topic: "sampling",
    question:
      "A Go service uses `sdktrace.AlwaysRecord(sdktrace.TraceIDRatioBased(0.1))`. For a span the inner ratio sampler rejects, what are `IsRecording()` and the export outcome?",
    options: [
      "`IsRecording` is `false`, and it is exported with the sampled flag unset",
      "`IsRecording` is `true`, and it is exported so a Collector can tail-sample",
      "`IsRecording` is `false`, but span processors still receive it at `OnEnd`",
      "`IsRecording` is `true`, its sampled flag is unset, and it is not exported",
    ],
    correctIndex: 3,
    explanation:
      "Recording and sampling are separate: `AlwaysRecord` upgrades a drop to record-only, so processors see full span data, but exporters only get spans whose sampled flag is set.",
  },
  {
    id: "sa-07",
    topic: "sampling",
    question:
      "Declarative config sets sampler `parent_based` with root `trace_id_ratio_based` ratio 1.0 and nothing else. A request arrives with `traceparent` trace-flags `00`. What happens to the server span?",
    options: [
      "Not sampled, because `remote_parent_not_sampled` defaults to `always_off`",
      "Sampled, because the ratio-1.0 root sampler decides for remote parents",
      "Sampled, because a remote parent is treated like a missing parent",
      "Recorded but not sampled, because it falls back to `always_record`",
    ],
    correctIndex: 0,
    explanation:
      "The root sampler only runs when there is no parent; a remote unsampled parent is delegated to `remote_parent_not_sampled`, which defaults to `always_off`.",
  },
  {
    id: "sa-08",
    topic: "sampling",
    question:
      "SDKs use `parentbased_traceidratio` 0.1, and a Collector tail sampler should keep every `ERROR` trace. Which SDK change lets the tail sampler see every error trace?",
    options: [
      "Wrap the SDK sampler in `AlwaysRecord` so the dropped spans still reach the Collector",
      "Sample 100% in the SDK (`parentbased_always_on`) and reduce only in the tail sampler",
      "Raise the tail sampler's `decision_wait` so late error spans are still counted",
      "Make the head sampler keep 100% of spans that will end with `ERROR` status",
    ],
    correctIndex: 1,
    explanation:
      "A tail sampler can only keep what it receives. `AlwaysRecord` makes dropped spans record-only: processors see them but exporters don't, so they never reach the Collector. The head sampler runs at span start, before the status is known.",
  },
  {
    id: "sa-09",
    topic: "sampling",
    question:
      "A `spanmetrics` connector (contrib v0.148+) sets `enable_metrics_sampling_method: true`. Half the spans carry an OpenTelemetry `th` in `tracestate`; the rest have no `tracestate`. How are the latter counted?",
    options: [
      "Dropped from the calls metric, since their sampling probability is unknown",
      "Extrapolated using the average threshold of the other spans",
      "Counted as 1 each, with `sampling.method=counted` separating the series",
      "Rejected at startup, since mixed input needs a feature gate",
    ],
    correctIndex: 2,
    explanation:
      "Adjusted counting is always on: spans with a valid `th` get stochastically rounded adjusted counts, and spans without one count as 1. The `sampling.method` attribute (`extrapolated` or `counted`) is added only when `enable_metrics_sampling_method` is `true`.",
  },
  {
    id: "sa-10",
    topic: "sampling",
    question:
      "Two Collector tiers in series each run a `tail_sampling` probabilistic policy at 10%, neither setting `hash_salt`. Roughly what fraction of all traces reaches the backend?",
    options: [
      "About 5%, since the second tier halves the first tier's rate",
      "About 1%, since the two independent 10% stages multiply",
      "About 19%, since each tier keeps a different 10% of traces",
      "About 10%, since both tiers reach identical decisions",
    ],
    correctIndex: 3,
    explanation:
      "The policy hashes the trace ID with FNV-1a plus a salt that defaults to the same value everywhere, so tier two keeps exactly the traces tier one kept; set distinct `hash_salt` values to layer independent samplers.",
  },
  // ─── Weaver (11) ───────────────────────────────────────────────────
  {
    id: "we-11",
    topic: "weaver",
    question:
      "A Weaver (v0.25+) registry depends on a company base registry, which pins semconv 1.40.0, and also directly on semconv 1.42.0. How is semconv resolved?",
    options: [
      "Resolution fails: a manifest may declare only one dependency entry",
      "Resolution fails: one registry cannot appear at two versions",
      "1.42.0 is used on both paths; the latest compatible version wins",
      "Each path keeps its own version, so attributes resolve twice",
    ],
    correctIndex: 2,
    explanation:
      "Weaver has accepted multiple dependencies since v0.24.0, and since v0.25.0 different versions of one dependency are allowed when their major versions are compatible, with the latest in the major series winning. Chains are limited to 10 levels.",
  },
  {
    id: "we-01",
    topic: "weaver",
    question:
      "`policies/naming.rego` declares `package acme_naming` with a `deny contains finding if {...}` rule. `weaver registry check --v2 --policy ./policies/` passes although an attribute clearly violates it. Why?",
    options: [
      "Weaver only queries `deny` rules in its stage packages, e.g. `after_resolution`",
      "`--v2` skips all custom policies, so only the built-in OTel policies run",
      "Custom-package findings default to information, which never fails check",
      "Custom packages must first be registered by name under `[policy]` in `.weaver.toml`",
    ],
    correctIndex: 0,
    explanation:
      "Weaver evaluates `data.<stage>.deny` for `before_resolution`, `after_resolution`, `comparison_after_resolution` and `live_check_advice`. A file in any other package loads cleanly but is never queried.",
  },
  {
    id: "we-02",
    topic: "weaver",
    question:
      "CI runs `weaver registry live-check` with default settings. The app emits `ecommerce.payment.method=crypto`, which is not an enum member, and the job passes. How do you fail on only that case?",
    options: [
      "Pass `--fail-on information` so that a finding at any level fails the run",
      "Add a `finding_level_overrides` entry making `undefined_enum_variant` a violation",
      "Set `allow_custom_values: false` on the enum so that unknown values become violations",
      "Add a `finding_filters` entry with `min_level = information` scoped to that attribute",
    ],
    correctIndex: 1,
    explanation:
      "Enums are open, so an unknown value is only an information finding and the default `--fail-on violation` ignores it. A level override promotes just that ID; `--fail-on information` fails on every information finding.",
  },
  {
    id: "we-03",
    topic: "weaver",
    question:
      'A `.weaver.toml` level override sets `level = information` for `sample_names ["internal.*"]`, and a finding filter sets `min_level = improvement`. A violation fires on `internal.queue.depth`. What is reported?',
    options: [
      "A violation, because filters run before any level override applies",
      "An information finding, because filters skip overridden findings",
      "Nothing; the override runs first, then `min_level` drops it",
      "A violation, because overrides can raise a level but never lower it",
    ],
    correctIndex: 2,
    explanation:
      "Level overrides are applied before filters, so the `min_level` filter sees the demoted level and drops the finding. A demotion plus a `min_level` filter silently hides real violations.",
  },
  {
    id: "we-04",
    topic: "weaver",
    question:
      "Following advice to always use `--future`, a team adds it to `weaver registry check --v2` (v0.26.1) on a valid custom `definition/2` registry. Now every definition file errors. Why?",
    options: [
      "`--future` rejects every attribute that still has development stability",
      "`--future` requires the manifest to declare an upstream semconv dependency",
      "`--future` switches parsing back to the legacy v1 groups syntax",
      "`--future` raises the `definition/2` not-yet-stable warning to an error",
    ],
    correctIndex: 3,
    explanation:
      "Future mode promotes every diagnostic to an error. In v0.26.1 each custom `definition/2` file emits a `'File format definition/2 is not yet stable'` warning, so all of them fail. Leave `--future` off for custom v2 registries until the format is declared stable.",
  },
  {
    id: "we-05",
    topic: "weaver",
    question:
      "In a `definition/2` registry, one span wants to deprecate its use of the shared attribute `ecommerce.user.id` by setting `deprecated` on that span's attribute ref. What does v2 allow?",
    options: [
      "Nothing; `deprecated` and `stability` come only from the definition",
      "The ref may set `deprecated`, and it then applies to that span alone",
      "The ref may set `deprecated` only with reason `renamed` and `renamed_to`",
      "The ref may set `deprecated`, and it propagates to every other signal",
    ],
    correctIndex: 0,
    explanation:
      "A v2 ref can refine `brief`, `note`, `examples` and `annotations`, but `stability` and `deprecated` always come from the attribute definition. Deprecation is a registry-wide decision on that definition.",
  },
  {
    id: "we-06",
    topic: "weaver",
    question:
      "`weaver registry generate --v2` renders `spans_gen.go` with `filter: semconv_grouped_spans` on a `definition/2` registry, but `ctx` lacks the v2 fields `span.type` and `span.name.note`. What fixes it?",
    options: [
      "Switch `application_mode` from `single` to `each` so fields are kept",
      'Call the helper as `semconv_grouped_spans({"v2": true})` instead',
      "Feed templates the output of `weaver registry resolve` instead",
      "Drop `--v2` from `generate` so the helper detects the format itself",
    ],
    correctIndex: 1,
    explanation:
      'The `--v2` flag does not change the jq helpers\' defaults: without `{"v2": true}` they take the legacy-schema path. Dump `{{ ctx | tojson }}` through the real filter before writing a template.',
  },
  {
    id: "we-07",
    topic: "weaver",
    question:
      '`weaver.yaml` sets `acronyms: ["ID"]`, but `{{ attr.key | pascal_case_const }}` renders `EcommerceUserId`. Which expression renders `EcommerceUserID`?',
    options: [
      "`attr.key | pascal_case_const | acronym`",
      "`attr.key | acronym | pascal_case_const`",
      '`attr.key | split_id | map("pascal_case") | map("acronym") | join("")`',
      "`attr.key | pascal_case_const(acronyms=true)`, since the list is opt-in",
    ],
    correctIndex: 2,
    explanation:
      "Case filters never consult the `acronyms` list, and the `acronym` filter only replaces whole word tokens. After `pascal_case_const`, `EcommerceUserId` is a single token, so nothing matches. Casing after `acronym` lowercases `ID` again. Apply `acronym` to each already-cased segment instead.",
  },
  {
    id: "we-08",
    topic: "weaver",
    question:
      "In Weaver v0.25+, a span lists `- ref: myapp.tenant.id` (`requirement_level: recommended`), then `- ref_group: myapp.common`, whose ref marks that attribute `required`. What is the resolved level?",
    options: [
      "`required`, because the later declaration in the list wins",
      "`required`, because a `ref_group` overrides inline references",
      "An error, since the span declares the attribute twice",
      "`recommended`, because inline refs win regardless of order",
    ],
    correctIndex: 3,
    explanation:
      "Precedence is inline ref, then `ref_group`, then attributes inherited from a refined signal, and YAML order does not matter. Only two groups on one signal that share a key are a resolution error.",
  },
  {
    id: "we-09",
    topic: "weaver",
    question:
      "A team adds a Rego `deny` rule in package `comparison_after_resolution` to block removed attributes. CI runs `weaver registry check --v2 -r ./registry --policy ./policies`. The rule never fires. Why?",
    options: [
      "That stage runs only when check also gets `--baseline-registry`",
      "That stage runs only inside `weaver registry diff`, never in check",
      "Removal rules must be in `before_resolution` to see the raw files",
      "Comparison policies are evaluated only when `--future` is also set",
    ],
    correctIndex: 0,
    explanation:
      "A comparison policy needs a baseline registry to compare against, so the stage runs only with `--baseline-registry`. `before_resolution` is also skipped under `--v2`.",
  },
  {
    id: "we-10",
    topic: "weaver",
    question:
      "A PR deletes attribute `myapp.user_id` and adds `myapp.user.id`. `weaver registry diff` against main reports `myapp.user_id` as `removed`, not `renamed`. What should the PR have done?",
    options: [
      "Set `stability: deprecated` on `myapp.user_id` and name the new key",
      "Keep `myapp.user_id` with `deprecated` reason `renamed` and `renamed_to`",
      "Bump the `schema_url` version so diff can pair the old and new key",
      "Run diff with `--include-unreferenced` so the old key still resolves",
    ],
    correctIndex: 1,
    explanation:
      "Diff derives `renamed` from the `deprecated` block on a key that still exists, and a key missing from head is reported as `removed`. Registries deprecate instead of deleting, and v2 has no `deprecated` stability level.",
  },
  // ─── otelc (10) ────────────────────────────────────────────────────
  {
    id: "oc-01",
    topic: "otelc",
    question:
      "A CI step runs `otelc go build --rules ./extra.otelc.yml -o app .` and fails with a `go build` flag error. What is wrong?",
    options: [
      "`--rules` accepts only directories, so passing a single file is rejected",
      "`--rules` is read only by `otelc setup`, never by the `otelc go` wrapper",
      "`otelc go` forwards everything after `go`, so `--rules` must come before `go`",
      "`--rules` must be given as `OTELC_RULES` when `-o` is also passed to `go`",
    ],
    correctIndex: 2,
    explanation:
      "`otelc go` and `otelc toolexec` skip flag parsing, so later flags go straight to the Go toolchain. Global flags such as `--rules`, `--debug` and `-w` must come before the `go` subcommand.",
  },
  {
    id: "oc-02",
    topic: "otelc",
    question:
      "A zero-config otelc build had `net/http` and gRPC spans. A developer sets `OTELC_RULES=./extra/` to add one custom rule. After rebuilding, only the custom hook fires. Why?",
    options: [
      "`OTELC_RULES` directories load only files named exactly `otelc.yml`",
      "Custom rules disable any bundled rule targeting the same module",
      "`OTELC_RULES` limits the build to rules matched by `otelc setup`",
      "`OTELC_RULES` replaces all lower-priority sources; nothing merges",
    ],
    correctIndex: 3,
    explanation:
      "`OTELC_RULES`, then `--rules`, then tool files, then the embedded bundle: the first one present is the only one used. An override silently masks the bundle, a common cause of missing instrumentation.",
  },
  {
    id: "oc-03",
    topic: "otelc",
    question:
      "`otelc setup` ran in `./svc`. A Makefile at the repo root (no `go.mod` there) runs `go build ./svc` with `GOFLAGS='-toolexec=otelc toolexec'`. The binary is uninstrumented. What fixes it?",
    options: [
      "Set `OTELC_WORK_DIR` to `./svc`, the directory where setup ran",
      "Remove the single quotes in `GOFLAGS` so the value is not escaped",
      "Re-run `otelc setup` from the repo root so it finds every module",
      "Add `-a` to `go build` so cached uninstrumented objects are rebuilt",
    ],
    correctIndex: 0,
    explanation:
      "`otelc toolexec` walks up from the current directory to find `.otelc-build`. The repo root is above `./svc`, so nothing is found and instrumentation is skipped unless `OTELC_WORK_DIR` points at the setup directory.",
  },
  {
    id: "oc-04",
    topic: "otelc",
    question:
      "To try instrumentation locally, a developer runs `otelc go run ./cmd/api` with otelc v1.1.0. What happens?",
    options: [
      "It builds and runs an instrumented binary, just like `otelc go build`",
      "It runs the app uninstrumented, because `go run` never honors `-toolexec`",
      "otelc exits with an error: only `build`, `install` and `test` are supported",
      "It instruments only package `main`, since `go run` builds in a temp dir",
    ],
    correctIndex: 2,
    explanation:
      "`otelc go` accepts only the `build`, `install` and `test` subcommands and rejects anything else with `'unsupported command'`. Build with `otelc go build` and run the binary.",
  },
  {
    id: "oc-05",
    topic: "otelc",
    question:
      "An otelc tool file blank-imports only the `net/http` server instrumentation. At runtime, `OTEL_GO_ENABLED_INSTRUMENTATIONS=nethttp,grpc` is set. What happens to outgoing gRPC calls?",
    options: [
      "They are traced, since the allowlist loads gRPC hooks at startup",
      "They are traced only if the binary also links `google.golang.org/grpc`",
      "They are not traced; runtime lists only gate compiled-in hooks",
      "The binary exits at startup because `grpc` names no compiled hook",
    ],
    correctIndex: 2,
    explanation:
      "Build-time rule sources decide which hooks are compiled in. The runtime allowlist and denylist can only switch those hooks on or off, and a tool file excludes the embedded bundle.",
  },
  {
    id: "oc-06",
    topic: "otelc",
    question:
      "A custom otelc hook targets `func Load[K comparable, V any](k K) (V, error)` and calls `ictx.GetParam(0)` in its `Before` hook. What happens?",
    options: [
      "The build fails, since hooks cannot target generic functions",
      "`GetParam` returns `nil`, since type parameters erase the argument",
      "It works; only `SetParam` and `SetReturnVal` are off-limits here",
      "It compiles, then panics when the instrumented function runs",
    ],
    correctIndex: 3,
    explanation:
      "For generic targets the generated `HookContext` accessors, including the getters, have panicking bodies because concrete types are unknown. Read values from the hook's own positional parameters instead.",
  },
  {
    id: "oc-07",
    topic: "otelc",
    question:
      "A `wrap_call` rule appends `grpc.WithUnaryInterceptor(...)` to `google.golang.org/grpc.Dial` calls, with no `variadic_type`. One call site is `grpc.Dial(addr, opts...)`. What happens there?",
    options: [
      "The call is skipped with a logged warning and the build succeeds",
      "The build fails, since a spread call cannot take extra arguments",
      "The option is appended after `opts...`, producing invalid Go code",
      "The option is prepended to `opts`, so the call is still wrapped",
    ],
    correctIndex: 0,
    explanation:
      "Appending to a spread call needs an IIFE typed with `variadic_type`. Without it otelc leaves that call site alone and only logs a warning, so coverage gaps are easy to miss.",
  },
  {
    id: "oc-08",
    topic: "otelc",
    question:
      "A Gin service moves from zero-config to an `otel.instrumentation.go` that blank-imports only the `gin` instrumentation. After rebuilding, no HTTP server spans appear. Why?",
    options: [
      "The `gin` hook runs only if `OTEL_GO_ENABLED_INSTRUMENTATIONS` lists `gin`",
      "Gin only enriches the `net/http` server span, which is no longer built in",
      "A tool file must also import the Go runtime metrics instrumentation",
      "Tool files add to the embedded bundle, so `gin`'s rule was deduplicated away",
    ],
    correctIndex: 1,
    explanation:
      "The `gin` hook renames and annotates the span already started by the `net/http` server hook. With a tool file only declared packages load, so the server span is never created.",
  },
  {
    id: "oc-09",
    topic: "otelc",
    question:
      "otelc instruments `net/http` in the standard library without editing `GOROOT` or the module cache. How does it get hook code into that package?",
    options: [
      "It vendors patched copies of every target package into `./vendor` before the build starts",
      "It rewrites package sources as they compile, via `-toolexec`, and links hooks with `//go:linkname`",
      "It adds `go.mod` `replace` directives pointing each target module at an instrumented fork",
      "It patches each compiled package archive (`.a`) after compilation and before the final link step",
    ],
    correctIndex: 1,
    explanation:
      "The go toolchain calls otelc through `-toolexec` for every compile. otelc injects trampoline calls into target functions and links them to hook code with generated `//go:linkname` directives, so the sources on disk are never changed. The hooks and injected SDK still cost CPU at runtime.",
  },
  {
    id: "oc-10",
    topic: "otelc",
    question:
      "In a `go.work` workspace, module `api`'s tool file enables gRPC and module `worker`'s enables only `net/http`. One `otelc go build ./api/... ./worker/...` builds both. What does `worker` get?",
    options: [
      "Only `net/http`, since each tool file scopes rules to its own module",
      "Nothing, since otelc refuses builds that span several tool files",
      "The embedded bundle, since conflicting tool files are ignored",
      "`net/http` and gRPC, since all tool files' rules are unioned",
    ],
    correctIndex: 3,
    explanation:
      "A single invocation computes one union rule set across every discovered tool file. Build modules in separate otelc invocations when their instrumentation must stay isolated.",
  },
];

const questionsByTopic = new Map<QuizTopic, QuizQuestion[]>();
for (const question of allQuestions) {
  const group = questionsByTopic.get(question.topic) ?? [];
  group.push(question);
  questionsByTopic.set(question.topic, group);
}

/** Topics in a fixed order, used for the shareable result grid. */
export const quizTopics = [...questionsByTopic.keys()];

/**
 * Select one quiz question per topic, shuffled.
 */
export function selectQuizQuestions(
  random: () => number = Math.random,
): QuizQuestion[] {
  const selected = [...questionsByTopic.values()].map(
    (group) => group[Math.floor(random() * group.length)],
  );
  return shuffle(selected, random).map((question) =>
    shuffleOptions(question, random),
  );
}

function shuffleOptions(
  question: QuizQuestion,
  random: () => number,
): QuizQuestion {
  const indices = shuffle(
    question.options.map((_, i) => i),
    random,
  );
  return {
    ...question,
    options: indices.map((i) => question.options[i]),
    correctIndex: indices.indexOf(question.correctIndex),
  };
}

function shuffle<T>(array: T[], random: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export { allQuestions };
