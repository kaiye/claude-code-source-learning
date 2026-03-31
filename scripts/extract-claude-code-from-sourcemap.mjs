#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const mapPath =
  process.argv[2] ??
  "node_modules/@anthropic-ai/claude-code/cli.js.map";
const outDir = process.argv[3] ?? "recovered/claude-code-original";

const mapRaw = fs.readFileSync(mapPath, "utf8");
const map = JSON.parse(mapRaw);

if (!Array.isArray(map.sources) || !Array.isArray(map.sourcesContent)) {
  throw new Error("Invalid sourcemap: missing sources/sourcesContent arrays");
}
if (map.sources.length !== map.sourcesContent.length) {
  throw new Error("Invalid sourcemap: sources and sourcesContent length mismatch");
}

const normalizeSourcePath = (sourcePath, index) => {
  let normalized = sourcePath.replaceAll("\\", "/");

  if (normalized.startsWith("webpack://")) {
    normalized = normalized.slice("webpack://".length);
  }
  if (normalized.startsWith("file://")) {
    normalized = normalized.slice("file://".length);
  }

  while (normalized.startsWith("./")) normalized = normalized.slice(2);
  while (normalized.startsWith("../")) normalized = normalized.slice(3);
  while (normalized.startsWith("/")) normalized = normalized.slice(1);

  if (!normalized || normalized === ".") {
    normalized = `__unknown__/source-${index}.txt`;
  }

  return normalized;
};

fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
const categoryCounts = new Map();
let restored = 0;
let skippedNull = 0;
let skippedUnsafe = 0;

for (let i = 0; i < map.sources.length; i += 1) {
  const sourcePath = map.sources[i];
  const content = map.sourcesContent[i];

  if (content == null) {
    skippedNull += 1;
    continue;
  }

  const relativePath = normalizeSourcePath(sourcePath, i);
  const targetPath = path.resolve(outDir, relativePath);
  const resolvedOutDir = path.resolve(outDir) + path.sep;

  if (!targetPath.startsWith(resolvedOutDir)) {
    skippedUnsafe += 1;
    continue;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, "utf8");
  restored += 1;

  const category = relativePath.split("/").slice(0, 2).join("/") || "<root>";
  categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);

  manifest.push({
    index: i,
    source: sourcePath,
    restoredPath: relativePath,
    bytes: Buffer.byteLength(content, "utf8"),
  });
}

manifest.sort((a, b) => a.restoredPath.localeCompare(b.restoredPath));

const categories = [...categoryCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([category, count]) => ({ category, count }));

fs.writeFileSync(
  path.join(outDir, "MANIFEST.json"),
  JSON.stringify(
    {
      mapPath,
      outDir,
      totalSources: map.sources.length,
      restored,
      skippedNull,
      skippedUnsafe,
      categories,
      generatedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
  "utf8",
);

fs.writeFileSync(
  path.join(outDir, "MANIFEST.files.json"),
  JSON.stringify(manifest, null, 2),
  "utf8",
);

console.log(`Restored ${restored}/${map.sources.length} files into ${outDir}`);
console.log(`Skipped null content: ${skippedNull}, skipped unsafe: ${skippedUnsafe}`);
console.log("Top categories:");
for (const { category, count } of categories.slice(0, 20)) {
  console.log(`  ${String(count).padStart(4, " ")}  ${category}`);
}
