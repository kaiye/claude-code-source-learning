# Claude Code Recovery Notes

This directory was reconstructed from:

- `node_modules/@anthropic-ai/claude-code/cli.js`
- `node_modules/@anthropic-ai/claude-code/cli.js.map`

## What was restored

- All sourcemap-backed files from `sourcesContent`:
  - Restored files: 4756
  - Source files under `src/`: 1902
  - Vendor files under `vendor/`: 4
  - Bundled dependency source files under `node_modules/`: 2850
- Original bundle artifacts copied to:
  - `dist/cli.js`
  - `dist/cli.js.map`

## Key recovered entrypoints

- `src/entrypoints/cli.tsx` (boot entrypoint, `void main();`)
- `src/main.tsx` (`export async function main()`)
- `src/entrypoints/mcp.ts`
- `src/entrypoints/init.ts`

## Important limitations

- Build/config files not embedded in sourcemap cannot be recovered exactly
  (for example root `package.json`, root `tsconfig.json`, build scripts).
- Sourcemap paths were normalized to this recovery root, so path semantics are
  approximate but source contents are preserved.

## Metadata

- Summary: `MANIFEST.json`
- Full file list: `MANIFEST.files.json`
