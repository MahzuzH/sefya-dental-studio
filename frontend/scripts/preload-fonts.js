import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");

const files = readdirSync(join(dist, "assets"));

const fonts = files
  .filter((f) => f.endsWith(".woff2") && f.startsWith("open-sans-latin-"))
  .sort();

const fontLinks = fonts
  .map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${f}">`)
  .join("\n    ");

const vendorIcons = files.find((f) => f.startsWith("vendor-icons-") && f.endsWith(".js"));
const iconLink = vendorIcons
  ? `<link rel="modulepreload" crossorigin href="/assets/${vendorIcons}">`
  : "";

const html = readFileSync(join(dist, "index.html"), "utf8");

const marker = '<link rel="preload" as="image"';
if (html.includes(fontLinks) && html.includes(iconLink)) {
  console.log("preload already present");
  process.exit(0);
}

const inject = [fontLinks, iconLink].filter(Boolean).join("\n    ");
const updated = html.replace(marker, `${inject}\n    ${marker}`);

writeFileSync(join(dist, "index.html"), updated);
console.log(`injected ${fonts.length} font preloads${vendorIcons ? ` + vendor-icons modulepreload` : ""}`);
