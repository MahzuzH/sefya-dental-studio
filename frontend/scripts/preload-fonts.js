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

let html = readFileSync(join(dist, "index.html"), "utf8");

if (html.includes("onload=")) {
  console.log("preload already present");
  process.exit(0);
}

// Convert render-blocking stylesheet to async preload
html = html.replace(
  /<link rel="stylesheet"([^>]*?)>/,
  (_, attrs) =>
    `<link rel="preload" as="style"${attrs} onload="this.rel='stylesheet'">\n  <noscript><link rel="stylesheet"${attrs}></noscript>`,
);

// Inject font preloads
html = html.replace(
  '<link rel="preload" as="image"',
  `${fontLinks}\n    <link rel="preload" as="image"`,
);

writeFileSync(join(dist, "index.html"), html);
console.log(`injected ${fonts.length} font preloads + async CSS`);
