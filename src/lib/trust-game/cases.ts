import type { TrustCase } from "./types";

/** Anonymized production cases from the Pages preview. Names are invented; structure and ratios are as measured. */
export const trustCases = [
  {
    "id": "T1",
    "truth": true,
    "signal": "trace",
    "situation": "A customer says their verification request hung for a second and then failed. Support asks if our platform is broken.",
    "claim": "The request failed because the external verification provider had no record for this customer. Our own services were fast.",
    "screen": "trace 4f1c…a90e · 11 spans · 1.14 s",
    "panels": [
      {
        "type": "trace",
        "total": 1140,
        "rows": [
          {
            "svc": "report-api",
            "name": "POST /v1/users/:uid/verification",
            "kind": "SERVER",
            "start": 0,
            "dur": 1139.3,
            "depth": 0,
            "err": true
          },
          {
            "svc": "report-api",
            "name": "HTTP GET",
            "kind": "CLIENT",
            "start": 0.2,
            "dur": 1.8,
            "depth": 1
          },
          {
            "svc": "user-profile",
            "name": "GET /v1/users/{uid}",
            "kind": "SERVER",
            "start": 0.5,
            "dur": 1.2,
            "depth": 2
          },
          {
            "svc": "report-api",
            "name": "VerificationReport()",
            "kind": "INTERNAL",
            "start": 2.1,
            "dur": 1137,
            "depth": 1
          },
          {
            "svc": "user-profile",
            "name": "GET /v1/users/{uid}/verification",
            "kind": "SERVER",
            "start": 2.4,
            "dur": 2.1,
            "depth": 2
          },
          {
            "svc": "user-profile",
            "name": "GET /v1/users/{uid}/preferences",
            "kind": "SERVER",
            "start": 5.3,
            "dur": 3.5,
            "depth": 2
          },
          {
            "svc": "report-api",
            "name": "SELECT verification_cache",
            "kind": "CLIENT",
            "start": 9.3,
            "dur": 2.6,
            "depth": 2
          },
          {
            "svc": "report-api",
            "name": "fetch provider report",
            "kind": "INTERNAL",
            "start": 11.9,
            "dur": 1127.2,
            "depth": 2,
            "err": true,
            "hl": true
          },
          {
            "svc": "report-api",
            "name": "HTTP POST provider",
            "kind": "CLIENT",
            "start": 25.6,
            "dur": 1105.8,
            "depth": 3,
            "hl": true
          }
        ],
        "footer": "status message on 'fetch provider report': report not found: provider code 000003, no record found for subject"
      }
    ],
    "headline": "The trace tells the whole story.",
    "explain": "Every internal hop finished in under 5 ms. The 1.1 s sits on the outbound call to the provider, and the error is on the exact span that failed, with the provider's own reason code in the status message.",
    "tell": "Error status lives on the failing span, not just the root, and the message names the cause.",
    "source": "Real trace from a production sample. Durations are exact; names changed."
  },
  {
    "id": "T2",
    "truth": true,
    "signal": "trace",
    "situation": "An order event fired. The product team wants to know if every downstream system got it, and how fast.",
    "claim": "One event reached four downstream consumers, and the slowest picked it up about 1.7 ms after it was sent.",
    "screen": "trace dc3a…6b · 6 spans · 4 services · 24.4 ms",
    "panels": [
      {
        "type": "trace",
        "total": 24.5,
        "rows": [
          {
            "svc": "order-events",
            "name": "events-channel process",
            "kind": "CONSUMER",
            "start": 0,
            "dur": 23.3,
            "depth": 0
          },
          {
            "svc": "order-events",
            "name": "order-update send",
            "kind": "PRODUCER",
            "start": 22.4,
            "dur": 0.88,
            "depth": 1,
            "hl": true
          },
          {
            "svc": "user-manager",
            "name": "order-update process",
            "kind": "CONSUMER",
            "start": 23.22,
            "dur": 0.02,
            "depth": 2
          },
          {
            "svc": "user-manager",
            "name": "order-update process",
            "kind": "CONSUMER",
            "start": 23.24,
            "dur": 0.19,
            "depth": 2
          },
          {
            "svc": "push-gateway",
            "name": "order-update process",
            "kind": "CONSUMER",
            "start": 24.06,
            "dur": 0.16,
            "depth": 2
          },
          {
            "svc": "order-listeners",
            "name": "order-update process",
            "kind": "CONSUMER",
            "start": 24.08,
            "dur": 0.29,
            "depth": 2,
            "hl": true
          }
        ]
      }
    ],
    "headline": "Context propagated through the broker.",
    "explain": "The producer span and all four consumer spans share one trace, each consumer is parented to the send, and the start times line up: sent at 22.4 ms, last consumer started at 24.08 ms.",
    "tell": "Producer and consumer spans are linked in one trace with consistent timing.",
    "source": "Real messaging trace from a production sample."
  },
  {
    "id": "T3",
    "truth": true,
    "signal": "trace",
    "situation": "A new engineer flags this trace: the child span runs far past the end of its parent. They think the clocks are broken.",
    "claim": "The clocks are fine. The consumer kept working after the producer handed off the message, so the child outlives its parent.",
    "screen": "trace 91be…07 · 2 spans · 2 services",
    "panels": [
      {
        "type": "trace",
        "total": 110,
        "rows": [
          {
            "svc": "event-mirror",
            "name": "account-event send",
            "kind": "PRODUCER",
            "start": 0,
            "dur": 14.8,
            "depth": 0,
            "hl": true
          },
          {
            "svc": "account-sync",
            "name": "account-event process",
            "kind": "CONSUMER",
            "start": 12.1,
            "dur": 86.4,
            "depth": 1,
            "hl": true
          }
        ],
        "footer": "Child ends 83.7 ms after its parent. Span kinds: PRODUCER → CONSUMER."
      }
    ],
    "headline": "This is how async work looks.",
    "explain": "A producer's span ends once the message is handed to the broker. The consumer does its work afterwards. For PRODUCER → CONSUMER pairs, a child that outlives its parent is expected, not clock skew.",
    "tell": "Check the span kinds before blaming clocks. Messaging hand-offs are allowed to overlap like this.",
    "source": "Real pattern: in one sample, about 90% of child spans that outlived their parent were producer-to-consumer hand-offs. Timings here are illustrative."
  },
  {
    "id": "T4",
    "truth": true,
    "signal": "table",
    "situation": "The AI knowledge-base feature returns empty answers. Someone opens the outbound call stats for its backing service.",
    "claim": "Every outbound call from this service is being rejected. Its credentials are broken.",
    "screen": "spans · service = knowledge-base-svc · kind = CLIENT · last capture",
    "panels": [
      {
        "type": "table",
        "title": "Outbound HTTP calls by response code",
        "cols": [
          {
            "label": "span"
          },
          {
            "label": "http.status_code"
          },
          {
            "label": "span status"
          },
          {
            "label": "share of calls",
            "num": true
          },
          {
            "label": "Relative share",
            "bar": true
          }
        ],
        "rows": [
          {
            "cells": [
              "HTTP GET",
              "401",
              {
                "text": "ERROR",
                "err": true
              },
              "100%",
              {
                "bar": 100,
                "err": true
              }
            ],
            "hl": true
          },
          {
            "cells": [
              "HTTP GET",
              "2xx",
              "OK",
              "0%",
              {
                "bar": 0
              }
            ]
          }
        ]
      }
    ],
    "headline": "Every outbound call got a 401.",
    "explain": "A 401 on a CLIENT span means our service was refused. When every single call is refused, the problem is our token or key, not the upstream.",
    "tell": "100% of client calls rejected with 401, marked as errors on the client side, where they belong.",
    "source": "Real ratio from a production sample."
  },
  {
    "id": "T5",
    "truth": true,
    "signal": "span",
    "situation": "Order detail lookups fail intermittently in the test environment. The on-call opens one failing span.",
    "claim": "The call failed because nothing was listening on the downstream port.",
    "screen": "span · order-detail · POST",
    "panels": [
      {
        "type": "span",
        "title": "POST  ·  CLIENT  ·  status ERROR",
        "attrs": [
          {
            "key": "service.name",
            "value": "order-detail"
          },
          {
            "key": "span.kind",
            "value": "CLIENT"
          },
          {
            "key": "http.request.method",
            "value": "POST"
          },
          {
            "key": "server.address",
            "value": "inventory.test.svc"
          },
          {
            "key": "status",
            "value": "ERROR",
            "err": true
          }
        ],
        "events": [
          {
            "name": "exception",
            "attrs": [
              {
                "key": "exception.type",
                "value": "java.net.ConnectException"
              },
              {
                "key": "exception.message",
                "value": "Connection refused"
              }
            ],
            "stack": "java.net.ConnectException: Connection refused\n\tat java.base/sun.nio.ch.Net.pollConnect(Native Method)\n\tat java.base/sun.nio.ch.Net.pollConnectNow(Net.java:682)\n\t...",
            "hl": true
          }
        ]
      }
    ],
    "headline": "The exception event says exactly what happened.",
    "explain": "Connection refused means the TCP connection was rejected outright: no process on that port, or a pod that is not ready. The span is marked ERROR and carries the exception with its stack trace.",
    "tell": "A recorded exception event with type, message and stack, on the span that failed.",
    "source": "Real span from a production sample."
  },
  {
    "id": "T6",
    "truth": true,
    "signal": "span",
    "situation": "A team's custom business dashboard has gaps. They ask whether the service is down.",
    "claim": "The service is up, but its own custom metrics are being rejected, so the dashboard is missing data.",
    "screen": "span · catalog-preview · metrics-api PutMetricData",
    "panels": [
      {
        "type": "span",
        "title": "metrics-api PutMetricData  ·  CLIENT  ·  status ERROR",
        "attrs": [
          {
            "key": "service.name",
            "value": "catalog-preview"
          },
          {
            "key": "server.address",
            "value": "metrics-api"
          },
          {
            "key": "rpc.method",
            "value": "PutMetricData"
          },
          {
            "key": "status",
            "value": "ERROR",
            "err": true
          }
        ],
        "events": [
          {
            "name": "exception",
            "attrs": [
              {
                "key": "exception.message",
                "value": "The parameter MetricData.member.1.Dimensions.member.1.Value is required. (Status Code: 400)"
              }
            ],
            "hl": true
          }
        ]
      }
    ],
    "headline": "The metrics push fails with a 400.",
    "explain": "The service emits a metric with an empty dimension value, and the metrics API rejects the whole call. The traces show the service working; only the metric writes fail.",
    "tell": "Instrumented SDK calls expose failures you would never see in the metrics themselves.",
    "source": "Real span from a production sample."
  },
  {
    "id": "T7",
    "truth": true,
    "signal": "table",
    "situation": "The error-rate panel spiked. Before paging the team, you check what the error spans actually are.",
    "claim": "The spike is real. These are genuine server-side 5xx failures.",
    "screen": "spans · status = ERROR · grouped by http.status_code",
    "panels": [
      {
        "type": "table",
        "title": "Error spans by HTTP response code",
        "cols": [
          {
            "label": "http.status_code"
          },
          {
            "label": "share of error spans",
            "num": true
          },
          {
            "label": "Relative share",
            "bar": true
          }
        ],
        "rows": [
          {
            "cells": [
              "500",
              "87%",
              {
                "bar": 87,
                "err": true
              }
            ],
            "hl": true
          },
          {
            "cells": [
              "(none, non-HTTP)",
              "9%",
              {
                "bar": 9,
                "err": true
              }
            ]
          },
          {
            "cells": [
              "503",
              "3%",
              {
                "bar": 3,
                "err": true
              }
            ],
            "hl": true
          },
          {
            "cells": [
              "400",
              "<1%",
              {
                "bar": 1,
                "err": true
              }
            ]
          }
        ],
        "footer": "Every span with a 5xx response is marked ERROR. No 2xx span is."
      }
    ],
    "headline": "Status codes and span status agree.",
    "explain": "Every 5xx response is an ERROR span, and successful responses are not. When those two agree, an error-rate panel built on span status means what it says.",
    "tell": "5xx maps to ERROR, 2xx never does, and client errors (4xx) are rare.",
    "source": "Real ratios from a production sample."
  },
  {
    "id": "T8",
    "truth": true,
    "signal": "span",
    "situation": "Order outcome tracking stopped updating. A background job span shows up with an error.",
    "claim": "The background tracker crashed on a NullPointerException in our own code.",
    "screen": "span · checkout-worker · OutcomeTrackingRunnable.run",
    "panels": [
      {
        "type": "span",
        "title": "OutcomeTrackingRunnable.run  ·  INTERNAL  ·  status ERROR",
        "attrs": [
          {
            "key": "service.name",
            "value": "checkout-worker"
          },
          {
            "key": "span.kind",
            "value": "INTERNAL"
          },
          {
            "key": "code.function",
            "value": "OutcomeTrackingRunnable.run"
          },
          {
            "key": "status",
            "value": "ERROR",
            "err": true
          }
        ],
        "events": [
          {
            "name": "exception",
            "attrs": [
              {
                "key": "exception.type",
                "value": "java.lang.NullPointerException"
              }
            ],
            "stack": "java.lang.NullPointerException",
            "hl": true
          }
        ]
      }
    ],
    "headline": "The span points straight at the bug.",
    "explain": "An INTERNAL span for our own runnable, an ERROR status, and an exception event typed as NullPointerException. That is a code defect in this job, not a dependency problem.",
    "tell": "Background work is instrumented too, so failures outside a request still show up.",
    "source": "Real span from a production sample."
  },
  {
    "id": "T9",
    "truth": true,
    "signal": "logs",
    "situation": "A refund request took 412 ms. You find a log line and want to know if it belongs to that request.",
    "claim": "This log line was written during the slow request in the trace.",
    "screen": "trace 7c21…e4 + correlated logs",
    "panels": [
      {
        "type": "trace",
        "total": 420,
        "rows": [
          {
            "svc": "refunds-api",
            "name": "GET /refunds/{id}",
            "kind": "SERVER",
            "start": 0,
            "dur": 412.4,
            "depth": 0,
            "hl": true
          },
          {
            "svc": "refunds-api",
            "name": "SELECT refunds",
            "kind": "CLIENT",
            "start": 3.1,
            "dur": 388,
            "depth": 1
          }
        ],
        "footer": "trace_id 7c21b0f3a19d44e0b2c5d81e66f0a9e4 · span_id 3be08a7c51d2f964"
      },
      {
        "type": "logs",
        "rows": [
          {
            "ts": "00:45:34.384",
            "sev": "INFO",
            "svc": "refunds-api",
            "body": "level=INFO [http-nio-8077-exec-4] trace_id=7c21b0f3a19d44e0b2c5d81e66f0a9e4, trace_flags=01, span_id=3be08a7c51d2f964 app=refunds-api Lookup returned 1 row after 388ms",
            "hl": true
          }
        ]
      }
    ],
    "headline": "Same trace ID, same span ID.",
    "explain": "The logging library stamps the active trace and span IDs into each record. They match the server span exactly, so this line came from that request, not a neighbor that happened to run at the same time.",
    "tell": "Trace context inside the log record, matching the span.",
    "source": "Real log format from a production sample. IDs changed."
  },
  {
    "id": "T10",
    "truth": true,
    "signal": "table",
    "situation": "Partners complain the verification endpoint keeps telling them to slow down.",
    "claim": "Callers are hitting our rate limit on that endpoint.",
    "screen": "spans · service = report-api · kind = SERVER",
    "panels": [
      {
        "type": "table",
        "title": "Rejected requests, POST /v1/users/:uid/verification",
        "cols": [
          {
            "label": "http.status_code"
          },
          {
            "label": "span status"
          },
          {
            "label": "share of rejections",
            "num": true
          },
          {
            "label": "Relative share",
            "bar": true
          }
        ],
        "rows": [
          {
            "cells": [
              "429",
              {
                "text": "ERROR",
                "err": true
              },
              "86%",
              {
                "bar": 86,
                "err": true
              }
            ],
            "hl": true
          },
          {
            "cells": [
              "404",
              {
                "text": "ERROR",
                "err": true
              },
              "7%",
              {
                "bar": 7,
                "err": true
              }
            ]
          },
          {
            "cells": [
              "403",
              {
                "text": "ERROR",
                "err": true
              },
              "7%",
              {
                "bar": 7,
                "err": true
              }
            ]
          }
        ]
      }
    ],
    "headline": "Most rejections were 429s.",
    "explain": "429 Too Many Requests on our own SERVER spans means we turned callers away, and it is 86% of this endpoint's rejections. The partners are right, and the telemetry backs them up.",
    "tell": "A specific status code on the server span answers the question directly.",
    "source": "Real ratios from a production sample."
  },
  {
    "id": "D1",
    "truth": false,
    "signal": "span",
    "situation": "Logs from one cluster are missing in the backend. The mesh gateway's span for the export call shows HTTP 200.",
    "claim": "The export returned HTTP 200, so the gateway delivered the log batch to the collector.",
    "screen": "span · mesh-gateway · LogsService/Export",
    "panels": [
      {
        "type": "span",
        "title": "collector:4317/opentelemetry.proto.collector.logs.v1.LogsService/Export  ·  CLIENT",
        "attrs": [
          {
            "key": "http.protocol",
            "value": "HTTP/2"
          },
          {
            "key": "http.status_code",
            "value": "200"
          },
          {
            "key": "grpc.content_type",
            "value": "application/grpc"
          },
          {
            "key": "grpc.status_code",
            "value": "8",
            "hl": true
          },
          {
            "key": "grpc.message",
            "value": "grpc: received message after decompression larger than max 4194304",
            "hl": true
          },
          {
            "key": "duration",
            "value": "107.9 ms"
          }
        ]
      }
    ],
    "headline": "gRPC hides failures behind HTTP 200.",
    "explain": "gRPC almost always answers HTTP 200 and puts the real result in grpc-status. Code 8 is RESOURCE_EXHAUSTED: the collector refused a batch bigger than its 4 MiB limit. The logs were dropped.",
    "tell": "grpc.status_code 8 and the size error in grpc.message.",
    "fix": "Alert on grpc.status_code, not HTTP status. Lower the exporter batch size or raise the receiver's max_recv_msg_size_mib.",
    "flaw": "reading",
    "source": "Real span from a production sample: OTLP traffic through a service mesh."
  },
  {
    "id": "D2",
    "truth": false,
    "signal": "logs",
    "situation": "Customers report stale prices. The on-call checks the pricing engine's error logs for the last hour.",
    "claim": "Zero error logs from the pricing engine. It's healthy.",
    "screen": "logs · service = pricing-engine",
    "panels": [
      {
        "type": "logs",
        "query": {
          "text": "service.name = pricing-engine  AND  severity >= ERROR  ·  last 1h",
          "result": "0 records"
        },
        "rows": [
          {
            "divider": "Same service, no severity filter:"
          },
          {
            "ts": "13:04:37.279",
            "sev": "UNSET",
            "svc": "pricing-engine",
            "body": "INFORMATIONAL: [QUEUE#1] (BusinessLogic) PriceContext::applyRecalcResult SKU-20000: RECALC ERROR - status=0, msg='missing input quote'",
            "hl": true
          },
          {
            "ts": "13:04:37.281",
            "sev": "UNSET",
            "svc": "pricing-engine",
            "body": "INFORMATIONAL: [QUEUE#1] (BusinessLogic) PriceContext::applyRecalcResult SKU-20500: RECALC ERROR - status=0, msg='missing input quote'",
            "hl": true
          }
        ],
        "footer": "95% of this service's records have no severity."
      }
    ],
    "headline": "The errors have no severity.",
    "explain": "The engine writes plain text and nothing maps its levels to OpenTelemetry severity, so every record arrives UNSET. A severity filter finds nothing while recalculation errors pile up.",
    "tell": "Severity UNSET on lines that say ERROR.",
    "fix": "Parse the level from the body in the Collector (OTTL) or fix the log appender, so severity_number is set at the source.",
    "flaw": "data",
    "source": "Real: in one sample, three quarters of all log records, and 95% of this service's, had no severity. Message text changed."
  },
  {
    "id": "D3",
    "truth": false,
    "signal": "logs",
    "situation": "During last night's outage the database team says they saw nothing. You search the database logs for the incident window.",
    "claim": "The database logged nothing during the outage.",
    "screen": "logs · service = document-db",
    "panels": [
      {
        "type": "logs",
        "query": {
          "text": "service.name = document-db  ·  02:10 to 03:10 UTC",
          "result": "0 records"
        },
        "rows": [
          {
            "divider": "Latest records by ingest time:"
          },
          {
            "ts": "1970-01-01 00:00:00",
            "sev": "WARN",
            "svc": "document-db",
            "body": "Slow query: aggregate on oplog.rs took 4123ms",
            "hl": true
          },
          {
            "ts": "1970-01-01 00:00:00",
            "sev": "ERROR",
            "svc": "document-db",
            "body": "Connection pool exhausted, waiting for available connection",
            "hl": true
          },
          {
            "ts": "1970-01-01 00:00:00",
            "sev": "WARN",
            "svc": "document-db",
            "body": "Replication lag above threshold: 38s",
            "hl": true
          }
        ]
      }
    ],
    "headline": "The logs were filed under 1970.",
    "explain": "These records arrived with a timestamp of 0, which backends show as the Unix epoch. Any time-range search skips them. The database was talking the whole time; nobody could find it.",
    "tell": "1970-01-01 00:00:00 in the timestamp column.",
    "fix": "Parse the event time from the body, or fall back to observed_timestamp in the Collector when time_unix_nano is 0.",
    "flaw": "data",
    "source": "Real: in one sample, about 1% of all log records were stamped at epoch zero, from a database, a message broker and a load balancer. Bodies changed."
  },
  {
    "id": "D4",
    "truth": false,
    "signal": "logs",
    "situation": "Users see intermittent 502s. The on-call skims the service-check logs on the hosts.",
    "claim": "The health-check logs are all INFO, so the checks are passing.",
    "screen": "logs · source = host · service-check",
    "panels": [
      {
        "type": "logs",
        "rows": [
          {
            "ts": "13:04:37.186",
            "sev": "INFO",
            "svc": "host-agent",
            "body": "INFO -- ServiceCheck::HttpServiceCheck: service check http-10.0.12.7:8080/monitor/version got error #<Errno::ECONNREFUSED: Connection refused>",
            "hl": true
          },
          {
            "ts": "13:04:39.190",
            "sev": "INFO",
            "svc": "host-agent",
            "body": "INFO -- ServiceCheck::HttpServiceCheck: service check http-10.0.12.7:8080/monitor/version got error #<Errno::ECONNREFUSED: Connection refused>",
            "hl": true
          },
          {
            "ts": "13:04:41.188",
            "sev": "INFO",
            "svc": "host-agent",
            "body": "INFO -- ServiceCheck::HttpServiceCheck: service check http-10.0.14.3:8080/monitor/version got error #<Errno::ECONNREFUSED: Connection refused>",
            "hl": true
          }
        ],
        "footer": "More than 99% of these service checks failed in one sample, every one logged at INFO."
      }
    ],
    "headline": "Failures logged at INFO.",
    "explain": "The checker reports each failed check at INFO level. Severity says fine, the body says connection refused. Anything that filters or alerts on severity misses the outage.",
    "tell": "ECONNREFUSED inside an INFO record.",
    "fix": "Log failed checks at WARN or ERROR, or emit the check result as a metric with a success attribute.",
    "flaw": "data",
    "source": "Real pattern from a production sample. Addresses changed."
  },
  {
    "id": "D5",
    "truth": false,
    "signal": "trace",
    "situation": "A ledger balance was wrong. You open the trace for the update to see where the request came from.",
    "claim": "This trace starts at the ledger consumer. Nothing upstream was involved.",
    "screen": "trace 2b9d…11 · 3 spans · 1 service",
    "panels": [
      {
        "type": "trace",
        "total": 9,
        "rows": [
          {
            "svc": "ledger-consumer",
            "name": "ledger.balance process",
            "kind": "CONSUMER",
            "start": 0,
            "dur": 8.6,
            "depth": 0,
            "ghost": true,
            "hl": true
          },
          {
            "svc": "ledger-consumer",
            "name": "UPDATE balances",
            "kind": "CLIENT",
            "start": 1.2,
            "dur": 5.9,
            "depth": 1
          },
          {
            "svc": "ledger-consumer",
            "name": "cache invalidate",
            "kind": "CLIENT",
            "start": 7.3,
            "dur": 0.9,
            "depth": 1
          }
        ],
        "footer": "⚠ root span has parent_span_id 9e41c07d2a5f3b18, which never arrived"
      }
    ],
    "headline": "The trace is missing its top.",
    "explain": "The 'root' has a parent span ID, so something upstream started this work. That parent was never exported, or was dropped on the way. The real origin of the bad balance is invisible.",
    "tell": "A root span that still points at a parent.",
    "fix": "Find the producer that is not exporting (unsampled, uninstrumented, or a broken pipeline), and use parent-based sampling end to end.",
    "flaw": "data",
    "source": "Real: in one sample, a third of all child spans pointed at parents that never arrived."
  },
  {
    "id": "D6",
    "truth": false,
    "signal": "trace map",
    "situation": "The platform team is planning a migration and pulls up the service map for the authorization server.",
    "claim": "The authorization server has no downstream dependencies. Safe to move it on its own.",
    "screen": "service map · authorization-server · derived from traces",
    "panels": [
      {
        "type": "map",
        "center": "authorization-server",
        "caption": "87% single-span traces · 0 edges",
        "footer": {
          "text": "Across this organization, 87% of traces contain exactly one span.",
          "hl": true
        }
      }
    ],
    "headline": "Broken propagation draws empty maps.",
    "explain": "Service maps are built from parent/child links between services. If trace context is not passed on outgoing calls, every hop starts a new one-span trace and the map shows an island. The dependencies exist; the links do not.",
    "tell": "87% single-span traces is not a quiet architecture, it is missing context.",
    "fix": "Enable context propagation on HTTP, gRPC and messaging clients so outgoing calls carry traceparent.",
    "flaw": "data",
    "detector": "Single-span trace",
    "source": "Real: 87% of traces in one sample had a single span."
  },
  {
    "id": "D7",
    "truth": false,
    "signal": "metric",
    "situation": "The weekly review shows the refund worker at the top of the slowest-services list.",
    "claim": "The refund worker is painfully slow: its p99 is 20 seconds.",
    "screen": "p99 span duration · refund-worker · 6h",
    "panels": [
      {
        "type": "chart",
        "title": "p99 duration, Sqs.ReceiveMessage",
        "unit": "s",
        "max": 24,
        "ticks": [
          0,
          10,
          20
        ],
        "series": [
          20,
          20,
          20,
          19.98,
          20,
          20,
          20,
          20,
          19.99,
          20,
          20,
          20,
          20,
          20,
          20,
          19.97,
          20,
          20,
          20,
          20,
          20,
          20,
          20,
          20
        ],
        "xlabels": [
          "06:00",
          "08:00",
          "10:00",
          "12:00"
        ],
        "hl": true,
        "footer": "Span kind CLIENT · queue long-poll wait: 20 s"
      }
    ],
    "headline": "It is waiting, not working.",
    "explain": "ReceiveMessage uses long polling: the call stays open up to 20 s until a message arrives. A flat line at exactly 20.0 s is the configured wait, not slowness. The worker is idle most of the time.",
    "tell": "A latency that sits exactly on a round configured number.",
    "fix": "Exclude polling spans from latency SLOs, or measure processing time from the consumer's process span.",
    "flaw": "reading",
    "source": "Real: the longest spans in one sample were all 20.0 s queue polls."
  },
  {
    "id": "D8",
    "truth": false,
    "signal": "table",
    "situation": "Triage meeting. The top source of errors this week is a name nobody on the call recognizes.",
    "claim": "The noisiest source is 'unknown_service:java'. Nobody owns it, so it is not our problem.",
    "screen": "errors by service.name · last 7d",
    "panels": [
      {
        "type": "table",
        "title": "Top error sources",
        "cols": [
          {
            "label": "service.name"
          },
          {
            "label": "share of error records",
            "num": true
          },
          {
            "label": "Relative share",
            "bar": true
          }
        ],
        "rows": [
          {
            "cells": [
              "unknown_service:java",
              "38%",
              {
                "bar": 100,
                "err": true
              }
            ],
            "hl": true
          },
          {
            "cells": [
              "billing-api",
              "21%",
              {
                "bar": 55,
                "err": true
              }
            ]
          },
          {
            "cells": [
              "forum-service",
              "14%",
              {
                "bar": 37,
                "err": true
              }
            ]
          },
          {
            "cells": [
              "identity-gateway",
              "7%",
              {
                "bar": 18,
                "err": true
              }
            ]
          }
        ]
      }
    ],
    "headline": "Someone owns it. It just has no name.",
    "explain": "unknown_service:java is the SDK's default when service.name is not set. It is a real application, probably one of yours, and it is your biggest error source. Missing names also break per-service alerts and dashboards.",
    "tell": "The 'unknown_service:' prefix is an SDK default, not a service.",
    "fix": "Set service.name (OTEL_SERVICE_NAME) on every workload, or add it in the Collector from Kubernetes metadata.",
    "flaw": "data",
    "detector": "Missing service name",
    "source": "Real: about 15% of log records in one sample had no usable service name, and its spans came from unknown_service:java. Table rows illustrative."
  },
  {
    "id": "D9",
    "truth": false,
    "signal": "logs",
    "situation": "A dashboard tile shows tens of thousands of error lines from one backend service. Leadership asks how many customers were hit.",
    "claim": "Tens of thousands of errors means a massive customer-facing outage.",
    "screen": "logs · service = catalog-sync · grouped by body",
    "panels": [
      {
        "type": "logs",
        "rows": [
          {
            "ts": "13:04:37.100",
            "sev": "UNSET",
            "svc": "catalog-sync",
            "body": "SystemException during NamingBinder::bindService(): TRANSIENT, retrying bind",
            "count": "49%",
            "hl": true
          },
          {
            "ts": "13:04:37.600",
            "sev": "UNSET",
            "svc": "catalog-sync",
            "body": "TIMEOUT during NamingBinder::bindService(), retrying bind",
            "count": "48%",
            "hl": true
          }
        ],
        "footer": "2 distinct messages · 97% of this service's records"
      }
    ],
    "headline": "One retry loop, logged on every attempt.",
    "explain": "Two messages make up 97% of the service's records: a process retrying its registration with a naming service. The count measures retry attempts, not failed customer requests. Something is wrong, but the number says nothing about customers.",
    "tell": "Two bodies, repeated tens of thousands of times.",
    "fix": "Count customer-facing failures from request spans or metrics. Log the retry loop once, with an attempt counter.",
    "flaw": "reading",
    "detector": "Duplicate log records",
    "source": "Real ratios from a production sample. Message text changed."
  },
  {
    "id": "D10",
    "truth": false,
    "signal": "logs",
    "situation": "Errors appeared around a deploy. The incident channel is deciding whether to roll back.",
    "claim": "The errors started 24 minutes after the 12:40 UTC deploy. Roll it back.",
    "screen": "deploy markers + error logs · times in UTC",
    "panels": [
      {
        "type": "logs",
        "rows": [
          {
            "divider": "▲ 12:40:00 UTC  deploy pricing-api v4.18.2"
          },
          {
            "ts": "13:04:37.279",
            "sev": "ERROR",
            "svc": "pricing-api",
            "body": "2026-10-06 13:04:37:279 +0100 ERROR [QUEUE#1] refresh failed: upstream feed timeout",
            "hl": true
          },
          {
            "ts": "13:04:38.010",
            "sev": "ERROR",
            "svc": "pricing-api",
            "body": "2026-10-06 13:04:38:010 +0100 ERROR [QUEUE#2] refresh failed: upstream feed timeout",
            "hl": true
          },
          {
            "ts": "13:04:39.442",
            "sev": "ERROR",
            "svc": "pricing-api",
            "body": "2026-10-06 13:04:39:442 +0100 ERROR [QUEUE#1] refresh failed: upstream feed timeout"
          }
        ],
        "footer": "observed_timestamp of first error (Collector clock): 12:04:37 UTC"
      }
    ],
    "headline": "Local time labelled as UTC.",
    "explain": "The parser read the time from the log body but dropped the +0100 offset, so every event is shifted an hour into the future. The errors really began at 12:04 UTC, 36 minutes before the deploy. Rolling back would not fix it.",
    "tell": "+0100 in the body, and an observed timestamp an hour earlier.",
    "fix": "Keep the offset when parsing timestamps, and alert when event time and observed time drift apart.",
    "flaw": "data",
    "source": "Real: in one sample, 0.2% of log records had event and observed times more than an hour apart, with local time and an offset in the body."
  }
] satisfies TrustCase[];
