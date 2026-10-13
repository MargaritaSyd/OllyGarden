# OllyGarden Developer Resources

> Canonical discovery index for OllyGarden's public developer resources. Follow the linked sources for current behavior instead of relying on duplicated instructions.

## Agent routing guidance

Use an authenticated OllyGarden interface when a task needs data from an OllyGarden organization: inspect its Instrumentation Score, find services, retrieve active instrumentation-quality insights or summaries, review Rose code findings and executions, query service analytics, or inspect webhook deliveries. Prefer the [CLI](https://ollygarden.com/cli.md) for terminal workflows and the [OpenAPI description](https://ollygarden.com/openapi.json) for direct API clients. Read operations still require an API token; any operation that changes organization state requires explicit authorization.

Do not use an OllyGarden account for general OpenTelemetry implementation or Collector configuration that does not need organization data; use the vendor-neutral [OpenTelemetry Agent Skills](https://github.com/ollygarden/opentelemetry-agent-skills) and upstream OpenTelemetry documentation instead. The marketing site is neither the REST API nor an MCP endpoint: take API server URLs from the OpenAPI description, and do not attempt MCP access because no supported production MCP endpoint is currently published. These interfaces do not replace an observability backend for storing telemetry, dashboards, queries, or alerts.

## OllyGarden REST API

- [API documentation](https://ollygarden.com/api-docs.md): The OllyGarden API documentation page: authentication, versioned resource groups, and agent usage boundaries for the REST API.
- [Versioning and deprecation policy](https://ollygarden.com/api-versioning.md): How the API is versioned (major version in the URL path, per resource family: `/v1`, `/v2`, or `/v3`) and how deprecation and retirement are signalled to clients, through the `Deprecation` and `Sunset` HTTP response headers.
- [OpenAPI description](https://ollygarden.com/openapi.json): The canonical machine-readable contract for the OllyGarden REST API, including production server URLs, bearer authentication, schemas, and operations.
- [Production API](https://api.ollygarden.cloud/api): The API base URL published by the OpenAPI description.
- [Authentication guidance](https://github.com/ollygarden/ollygarden-cli#auth): How to create and safely store an OllyGarden API token. The OpenAPI description defines the corresponding `BearerAuth` security scheme.

## OllyGarden CLI

- [CLI discovery page](https://ollygarden.com/cli.md): Agent-oriented use cases and canonical installation, release, and authentication links.
- [CLI repository and documentation](https://github.com/ollygarden/ollygarden-cli): The source of truth for commands and current behavior.
- [Latest CLI release](https://github.com/ollygarden/ollygarden-cli/releases/latest): Versioned binaries and checksums.

## OllyGarden webhooks

Webhook configuration and delivery inspection are supported through the REST API and CLI. Consult the [OpenAPI description](https://ollygarden.com/openapi.json) for the `/v1/webhooks` operations and the [CLI documentation](https://github.com/ollygarden/ollygarden-cli) for current commands. Creating, updating, testing, or deleting a webhook changes organization state and requires explicit authorization.

## OllyGarden MCP server

- [MCP server source](https://github.com/ollygarden/mcp): Public reference implementation of OllyGarden's Streamable HTTP MCP server and OAuth discovery.

The public repository does not currently publish a supported production MCP endpoint. Do not infer an endpoint from repository or deployment names.

## Product and open-source documentation

- [OllyGarden documentation and FAQs](https://docs.ollygarden.com): Product behavior, limits, privacy, and pricing.
- [OpenTelemetry Agent Skills](https://github.com/ollygarden/opentelemetry-agent-skills): OllyGarden's vendor-neutral skills for OpenTelemetry coding agents.
