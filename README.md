# debug

[![Tags](https://img.shields.io/github/release/denosaurs/debug)](https://github.com/denosaurs/debug/releases)
[![CI Status](https://img.shields.io/github/workflow/status/denosaurs/debug/check)](https://github.com/denosaurs/debug/actions)
[![Dependencies](https://img.shields.io/github/workflow/status/denosaurs/debug/depsbot?label=dependencies)](https://github.com/denosaurs/depsbot)
[![License](https://img.shields.io/github/license/denosaurs/debug)](https://github.com/denosaurs/debug/blob/master/LICENSE)

<p align="center">
	<br>
	<img src="assets/example.svg" width="500">
	<br>
</p>

```typescript
import { debug } from "https://deno.land/x/debug/mod.ts";

const log = debug("app");
const name = "My Awesome App"

const app = new Application();

app.use((ctx) => {
  log("%s %s", ctx.request.method, ctx.request.url.pathname);
  ctx.response.body = "Hello World!";
});

log("Starting %s...", name);
await app.listen({ port: 8000 });
```

```
$ DEBUG=worker deno run --allow-env script.ts
```

## Namespace Colors

Every debug instance has a color generated for it based on its namespace name.
This helps when visually parsing the debug output to identify which debug instance
a debug line belongs to.

## Millisecond diff

When actively developing an application it can be useful to see when the time spent between one `debug()` call and the next. Suppose for example you invoke `debug()` before requesting a resource, and after as well, the "+NNNms" will show you how much time was spent between calls.

## Wildcards

The `*` character may be used as a wildcard. Suppose for example your library has
debuggers named "connect:bodyParser", "connect:compress", "connect:session",
instead of listing all three with
`DEBUG=connect:bodyParser,connect:compress,connect:session`, you may simply do
`DEBUG=connect:*`, or to run everything using this module simply use `DEBUG=*`.

You can also exclude specific debuggers by prefixing them with a "-" character.
For example, `DEBUG=*,-connect:*` would include all debuggers except those
starting with "connect:".

## Formatters

Debug uses [printf-style](https://wikipedia.org/wiki/Printf_format_string) formatting.
Below are the officially supported formatters:

| Formatter | Representation |
|-----------|----------------|
| `%O`      | Pretty-print an Object on multiple lines. |
| `%o`      | Pretty-print an Object all on a single line. |
| `%s`      | String. |
| `%d`      | Number (both integer and float). |
| `%j`      | JSON. Replaced with the string '[Circular]' if the argument contains circular references. |
| `%%`      | Single percent sign ('%'). This does not consume an argument. |

## Maintainers

- Filippo Rossi ([@qu4k](https://github.com/qu4k))

## Other

### Related

- [debug](https://github.com/visionmedia/debug) - A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.

### Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with `deno fmt` and commit messages are done following Conventional Commits spec.

### Licence

Copyright 2020-present, the denosaurs team. All rights reserved. MIT license.
