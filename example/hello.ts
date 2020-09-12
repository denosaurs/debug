import { debug } from "../mod.ts";

import { Application } from "https://deno.land/x/oak@v6.1.0/mod.ts";

const log = debug("app");
const name = "My Awesome App";

const app = new Application();

app.use((ctx) => {
  log("%s %s", ctx.request.method, ctx.request.url.pathname);
  ctx.response.body = "Hello World!";
});

log("Starting %s...", name);
await app.listen({ port: 8000 });
