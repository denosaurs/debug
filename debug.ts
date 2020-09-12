import { generateColor, ColorFunction } from "./colors.ts";
import { encode } from "./deps.ts";
import { format } from "./format.ts";

export interface Debug {
  (fmt: string, ...args: unknown[]): void;
  self: Debugger;
}

export class Debugger {
  manager: DebugManager;
  ns: string;
  color: ColorFunction;
  last: number;
  enabled: boolean;

  constructor(manager: DebugManager, namespace: string) {
    this.manager = manager;
    this.ns = namespace;
    this.color = generateColor(namespace);
    this.last = 0;
    this.enabled = manager.enabled.some((r) => r.test(namespace));
  }

  log(fmt: string, ...args: unknown[]): void {
    if (!this.enabled) return;
    const diff = Date.now() - (this.last || Date.now());
    fmt = format(fmt, ...args);
    const msg = `${this.color(this.ns)} ${fmt} ${this.color(`+${diff}ms`)}\n`;
    Deno.stderr.writeSync(encode(msg));
    this.last = Date.now();
  }
}

class DebugManager {
  debuggers: Map<string, Debugger>;
  enabled: RegExp[];

  constructor(enabled?: RegExp[]) {
    this.debuggers = new Map();
    this.enabled = enabled ?? [];
  }
}

function extract(opts?: string): RegExp[] {
  if (!opts || opts.length === 0) return [];
  opts = opts.replace(/\s/g, "").replace(/\*/g, ".+");
  return opts.split(",").map((rule) => new RegExp(`^${rule}$`));
}

let manager: DebugManager;

export function withoutEnv(enabled?: RegExp[] | string) {
  if (!enabled) enabled = [];
  if (typeof enabled === "string") enabled = extract(enabled);
  manager = new DebugManager(enabled);
}

export function debug(namespace: string): Debug {
  if (!manager) manager = new DebugManager(extract(Deno.env.get("DEBUG")));

  const dbg = new Debugger(manager, namespace);
  manager.debuggers.set(namespace, dbg);
  const de: Debug = Object.assign(dbg.log.bind(dbg), {
    self: dbg,
  });
  return de;
}
