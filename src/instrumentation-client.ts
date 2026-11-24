import { z } from "zod"

// Zod v4 probes for `new Function` support when object schemas are created so
// it can JIT-compile parsers. Our Content-Security-Policy forbids eval, so the
// probe only produces a CSP violation report before Zod falls back anyway.
// Opt out of JIT up front so the probe never runs in the browser.
z.config({ jitless: true })
