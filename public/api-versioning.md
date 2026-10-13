# OllyGarden API Versioning and Deprecation Policy

> How the OllyGarden REST API is versioned, and how the deprecation and retirement of an API version or operation is signalled to clients. The [OpenAPI description](https://ollygarden.com/openapi.json) remains the machine-readable contract and the source of truth for what exists today; this page describes the rules that govern how that contract changes.

## Versioning scheme

The OllyGarden REST API uses URL path versioning. Every operation is served under a major version prefix on the API server published by the OpenAPI description. Versions are resource-specific: most resource families currently use `v1`, while Magnolia reporting uses `v2` and `v3`. Full paths include `https://api.ollygarden.cloud/api/v1/services` and `https://api.ollygarden.cloud/api/v2/magnolia/findings`.

The current contract exposes Analytics at `/v1/analytics/log-volume` and `/v1/services/{id}/analytics/log-volume`, and Magnolia at `/v2/magnolia/findings`, `/v2/magnolia/report`, and the per-signal `/v3/magnolia/*` operations such as `/v3/magnolia/summary`.

The major version in the path identifies the contract:

- A change that would break a conforming client of an existing major version is introduced under a new major version prefix, not applied in place.
- Additive changes may appear within an existing major version: new operations, new optional parameters, and new fields in a response. Clients must therefore tolerate unknown response fields, and must not depend on the ordering of members within a JSON object or on a field being absent.

Read the server URL and version prefix from the [OpenAPI description](https://ollygarden.com/openapi.json) rather than hard-coding them. It is generated from the deployed service and is authoritative for the operations, parameters, schemas, and status codes that each version exposes.

## How deprecation is signalled

Deprecation is announced on the API responses themselves, not only in prose, so that a client can detect it without anyone reading a page. Two standard HTTP response header fields carry the signal:

- **`Deprecation`** ([RFC 9745](https://www.rfc-editor.org/rfc/rfc9745.html)) marks a deprecated operation or API version. Its value is a structured-field date giving the moment the deprecation took, or takes, effect — for example `Deprecation: @1688169599`. Its presence means the endpoint still works, but should no longer be adopted by new integrations.
- **`Sunset`** ([RFC 8594](https://www.rfc-editor.org/rfc/rfc8594.html)) marks a resource for which a retirement date has been set. Its value is an HTTP-date giving the point in time after which the resource is expected to stop responding — for example `Sunset: Sat, 31 Dec 2033 23:59:59 GMT`. Where both fields are present, the `Sunset` date is never earlier than the `Deprecation` date.

A `Link` header may accompany either field: the `deprecation` relation points at documentation about that specific deprecation, and the `sunset` relation points back at this policy.

**The current OpenAPI contract marks no operation as deprecated, so the API does not currently emit either field.** Treat their absence as "not deprecated" and their appearance as the signal to plan a migration. The headers on a given response are authoritative for that resource, and are more current than any page.

## What clients and agents should do

- Read `Deprecation` and `Sunset` on every response and log or surface them, rather than inspecting them only once something breaks. These headers are the earliest notice a client receives.
- Do not fail a request because these fields are present. A deprecated operation keeps serving until its sunset; the headers are advisory.
- Follow the `Link` relation, when one is present, to reach the documentation for that deprecation.
- Re-read the [OpenAPI description](https://ollygarden.com/openapi.json) when a signal appears, and migrate to the operation or version it then describes.

## Retirement

A superseding version is announced before the version it replaces is retired, so a documented migration target exists before anything stops responding. Once an operation or version is retired, the OpenAPI description stops describing it; the description is therefore the check for whether something is still available.

## Where to find the current contract

- [OpenAPI description](https://ollygarden.com/openapi.json): the canonical machine-readable contract — servers, operations, parameters, schemas, and responses.
- [API documentation](https://ollygarden.com/api-docs.md): authentication, versioned resource groups, and agent usage boundaries for the REST API.
- [Developer resource index](https://ollygarden.com/developers.md): the canonical index of all OllyGarden developer resources.
