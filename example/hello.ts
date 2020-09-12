import { debug, withoutEnv } from "../mod.ts";

withoutEnv([/worker:(a|b)/]);

const logA = debug("worker:a");
const logB = debug("worker:b");
const logC = debug("service");

// logC.self.enabled = true;

for (let i = 0; i < 5; i++) {
  logA("Hello World");
  logB("Hello World");
  logC("Hello World");
  await new Promise((resolve) => setTimeout(resolve, 200));
}
