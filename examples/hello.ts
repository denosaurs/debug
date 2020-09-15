import { debug } from "../mod.ts";

const log = debug("app");
const name = "My Awesome App";

log("Starting %s...", name);
