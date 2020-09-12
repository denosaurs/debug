# debug

[![Tags](https://img.shields.io/github/release/denosaurs/debug)](https://github.com/denosaurs/debug/releases)
[![CI Status](https://img.shields.io/github/workflow/status/denosaurs/debug/check)](https://github.com/denosaurs/debug/actions)
[![Dependencies](https://img.shields.io/github/workflow/status/denosaurs/debug/depsbot?label=dependencies)](https://github.com/denosaurs/depsbot)
[![License](https://img.shields.io/github/license/denosaurs/debug)](https://github.com/denosaurs/debug/blob/master/LICENSE)

```typescript
import { debug } from "https://deno.land/x/debug/mod.ts";

const log = debug("worker");

for (let i = 0; i < 5; i++) {
  log("Hello World");
}
```

```
$ DEBUG=worker deno run --allow-env script.ts
```

## Maintainers

- Filippo Rossi ([@qu4k](https://github.com/qu4k))

## Other

### Related

- [debug](https://github.com/visionmedia/debug) - A tiny JavaScript debugging utility modelled after Node.js core's debugging technique.

### Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with `deno fmt` and commit messages are done following Conventional Commits spec.

### Licence

Copyright 2020-present, the denosaurs team. All rights reserved. MIT license.
