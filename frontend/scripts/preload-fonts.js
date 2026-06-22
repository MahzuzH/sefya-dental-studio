import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");

const files = readdirSync(join(dist, "assets"));
const fonts = files
  .filter((f) => f.endsWith(".woff2") && f.includes("poppins-latin-"))
  .sort();

const links = fonts
  .map((f) => {
    const name = f.replace(/-[a-zA-Z0-9]+\.woff2$/, ".woff2");
    return `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}">`;
  })
  .join("\n    ");

const html = readFileSync(join(dist, "index.html"), "utf8");
if (html.includes(links)) {
  console.log("preload already present");
  process.exit(0);
}
const updated = html.replace(
  '<link rel="preload"',
  `${links}\n    <link rel="preload"`,
);
writeFileSync(join(dist, "index.html"), updated);
console.log(`injected ${fonts.length} font preloads`);
