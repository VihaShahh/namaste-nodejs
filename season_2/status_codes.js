// # Deep dive: HTTP status codes

// ## 1. Quick taxonomy and meaning (expanded)

// * **1xx — Informational**
//   Rarely used by application code. Example: `100 Continue` (used by client to know it can send the request body).
// * **2xx — Success**
//   The request was handled successfully. Each code refines *what* success means.
// * **3xx — Redirection**
//   Client must take additional action (usually follow a `Location` URL).
// * **4xx — Client error**
//   Problem with the request (invalid, unauthorized, does not exist, etc.).
// * **5xx — Server error**
//   Server failed to fulfill a valid request (bug, upstream failure, overload).

// ---

// ## 2. Important individual codes & correct usage

// ### 2xx (Success)

// * **200 OK** — Generic success. Typically returns a response body (JSON, HTML, etc.).
//   Use when resource representation is returned.
// * **201 Created** — Use after successfully creating a resource (POST).
//   Best practice: return a `Location` header with the URI of the new resource and often include the created resource in the body.

//   ```http
//   HTTP/1.1 201 Created
//   Location: /users/123
//   Content-Type: application/json
//   { "id": 123, "name": "Viha" }
//   ```
// * **202 Accepted** — Request accepted but not completed (async processing). Use when job queued.
// * **204 No Content** — Successful but no body in response (common for DELETE, sometimes PUT/PATCH). If returning nothing, use 204; do not send a body.

// ### 3xx (Redirection)

// * **301 Moved Permanently** — Use for permanent URL changes (crawlers will update links).
// * **302 Found** — Temporary redirect (historically abused). Modern alternatives:
// * **307 Temporary Redirect** — preserves method and body (use for temporary redirect when method must not change).
// * **308 Permanent Redirect** — permanent redirect preserving method.

// ### 4xx (Client errors)

// * **400 Bad Request** — Malformed syntax / cannot parse request (e.g., JSON parse error, missing required param).
// * **401 Unauthorized** — Client needs to authenticate. (Usually accompanied by `WWW-Authenticate` header for HTTP auth.) Use when no/invalid credentials.
// * **403 Forbidden** — Authenticated but not allowed to perform action (authorization failure).
// * **404 Not Found** — Resource does not exist.
// * **405 Method Not Allowed** — HTTP method not allowed on this resource. Also include `Allow` header listing allowed methods.
// * **409 Conflict** — Conflict (e.g., duplicate unique value, or version conflict in optimistic locking).
// * **415 Unsupported Media Type** — E.g., server expects `application/json` but got `text/plain`.
// * **422 Unprocessable Entity** — Semantic validation failed (valid JSON, but fields invalid). Often preferred over 400 for validation errors in some APIs (use consistently).
// * **429 Too Many Requests** — Rate limiting; often include `Retry-After` header.

// ### 5xx (Server errors)

// * **500 Internal Server Error** — Generic server error. Do not leak internals.
// * **502 Bad Gateway** — Upstream (gateway) returned invalid response.
// * **503 Service Unavailable** — Server temporarily unable (maintenance, overload). Use `Retry-After` header if appropriate.
// * **504 Gateway Timeout** — Upstream timed out.

// ---

// ## 3. HTTP semantics you must respect

// * **Idempotency**
//   — `GET`, `PUT`, `DELETE`, `HEAD` are idempotent: repeating them has same effect. `POST` usually is not. This influences retries and error handling.
// * **Safe methods**
//   — `GET` and `HEAD` should not alter server state.
// * **Cacheability**
//   — `GET` responses can be cached; include proper `Cache-Control`, `ETag`, and/or `Last-Modified`.
// * **Conditional requests**
//   — `If-None-Match` + `ETag` → return `304 Not Modified` if unchanged (client should use cached copy).

// ---

// ## 4. RESTful mapping (CRUD → HTTP)

// * **Create** → `POST /resources` → `201 Created` (+ Location)
// * **Read** → `GET /resources/:id` → `200 OK` or `404 Not Found`
// * **Update (replace)** → `PUT /resources/:id` → `200 OK` (with body) or `204 No Content`
// * **Partial update** → `PATCH /resources/:id` → `200` or `204`
// * **Delete** → `DELETE /resources/:id` → `204 No Content` (or `200` with body)

// ---

// ## 5. API error response design (best practices)

// 1. **Consistent error format** — return structured JSON with `code`, `message`, and optional `details`. Example:

//    ```json
//    {
//      "error": {
//        "code": "USER_NOT_FOUND",
//        "message": "User 123 not found",
//        "details": {}
//      }
//    }
//    ```
// 2. **Use machine-readable error codes** (strings like `INVALID_INPUT`) + human-friendly messages.
// 3. **HTTP status should match the error** (don’t return 200 for errors).
// 4. **Avoid exposing internal traces** in production (no stack traces).
// 5. **Include helpful headers** where useful (`Location`, `Retry-After`, `Allow`, `WWW-Authenticate`).

// ---

// ## 6. Express.js patterns & examples

// ### Simple responses

// ```js
// app.get('/ok', (req, res) => {
//   res.status(200).json({ message: 'Success' });
// });

// app.post('/items', (req, res) => {
//   const created = createItem(req.body); // hypothetical
//   res.status(201).location(`/items/${created.id}`).json(created);
// });

// app.delete('/items/:id', (req, res) => {
//   deleteItem(req.params.id);
//   res.sendStatus(204); // No Content
// });
// ```

// ### Validation vs parsing errors

// * JSON parse error → `400 Bad Request`.
// * Validation error (required fields missing or format wrong) → `400` or `422` (pick one and be consistent).

// ### 404 handler (catch-all)

// ```js
// // put after your routes
// app.use((req, res, next) => {
//   res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' }});
// });
// ```

// ### Centralized error-handling middleware

// ```js
// // error-handling middleware signature: (err, req, res, next)
// app.use((err, req, res, next) => {
//   console.error(err); // log internal details (not returned)
//   if (err.name === 'UnauthorizedError') {
//     return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: err.message }});
//   }
//   if (err.isValidation) {
//     return res.status(422).json({ error: { code: 'INVALID_INPUT', message: err.message, details: err.details }});
//   }
//   // fallback
//   res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' }});
// });
// ```

// ### Returning `405 Method Not Allowed`

// If a route exists but not for the used method:

// ```js
// app.route('/resource')
//   .get(handleGet)
//   .post(handlePost);

// // If you want to reject e.g. PUT:
// app.put('/resource', (req, res) => res.set('Allow', 'GET, POST').sendStatus(405));
// ```

// ---

// ## 7. Asynchronous operations & status choices

// * For jobs that run asynchronously (background processing), `202 Accepted` is appropriate. Include a status URL the client can poll:

//   ```
//   202 Accepted
//   Location: /jobs/abc123
//   ```
// * Avoid returning `200` immediately if the job hasn't completed; `202` clarifies that processing happens later.

// ---

// ## 8. Caching & conditional requests

// * Use `ETag` or `Last-Modified`. When client sends `If-None-Match`/`If-Modified-Since`, if not changed return `304 Not Modified` (no body).
// * Use `Cache-Control` and `Expires` headers for cache rules.

// ---

// ## 9. Security considerations

// * For `401` include `WWW-Authenticate` when using HTTP auth. For token-based APIs, 401 alone is common.
// * Do not differentiate too specifically between authentication and authorization failures in public messages (avoid revealing whether a username exists).
// * Sanitize error messages to avoid leaking stack traces or internal IDs.

// ---

// ## 10. Practical checklist for API responses

// * [ ] Status code reflects the semantic outcome.
// * [ ] Use `201` + `Location` on creation.
// * [ ] Use `204` when no response body should be returned.
// * [ ] Use `4xx` for client errors; `5xx` for server errors.
// * [ ] Structured, consistent error JSON.
// * [ ] Proper headers for caching, retry, or allowed methods.
// * [ ] Central error logging + friendly public messages.
// * [ ] Rate limit responses use `429` + `Retry-After`.

// ---

// ## 11. Small cheat-sheet (common choices)

// * `200 OK` — success with body
// * `201 Created` — resource created (include `Location`)
// * `204 No Content` — success, no body
// * `400 Bad Request` — malformed/invalid request
// * `401 Unauthorized` — authentication required/invalid
// * `403 Forbidden` — authenticated but not allowed
// * `404 Not Found` — resource not found
// * `409 Conflict` — unique/consistency conflict
// * `422 Unprocessable Entity` — semantic validation failure
// * `429 Too Many Requests` — rate-limited
// * `500 Internal Server Error` — server error
// * `503 Service Unavailable` — maintenance/temporary unavailability

// ---

// If you want, I can:

// * Review your current Express error-handler and suggest improvements,
// * Create a small error-handling middleware template you can drop into your project,
// * Or explain any specific code snippet you have (e.g., when to use 422 vs 400 in your app).

// Which of those would help most right now?
