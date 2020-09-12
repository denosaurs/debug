export function format(f: string, ...args: unknown[]) {
  let i = 0;
  let len = args.length;
  let str = String(f).replace(/%[sdjoO%]/g, (x: string): string => {
    if (x === "%%") return "%";
    if (i >= len) return x;
    switch (x) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]).toString();
      case "%o":
        return Deno.inspect(args[i++]).replace("\n", " ");
      case "%O":
        return Deno.inspect(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch {
          return "[Circular]";
        }
      default:
        return x;
    }
  });
  for (const x of args.splice(i)) {
    if (x === null || !(typeof x === "object" && x !== null)) {
      str += " " + x;
    } else {
      str += " " + Deno.inspect(x);
    }
  }
  return str;
}
