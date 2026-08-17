<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
SPDX-License-Identifier: CC-BY-4.0
-->
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`isa4js` is a TypeScript library that converts **ISA-JSON** (a hierarchical metadata format for life-science experiments) into flat **ISA-Tab** files (`i_investigation.txt`, `s_*.txt` study tables, `a_*.txt` assay tables), either as an in-memory string dictionary or a ZIP archive.

## Commands

All commands run from the repo root with `pnpm` (workspace root, `packages: [.]`).

```bash
pnpm install                 # install deps
pnpm run test                 # run the full vitest suite once (CI uses this)
pnpm run test:watch           # vitest in watch mode
pnpm exec vitest run tests/table.test.ts       # run a single test file
pnpm exec vitest run -t "Study Flow mapping"   # run tests matching a name
pnpm run build                # tsup (cjs+esm+minified) then tsc for .d.ts, output to dist/
pnpm run dev                  # tsup --watch
pnpm run generate-types       # regenerate src/types/isa.d.ts from schemas/investigation_schema.json
pnpm run change                # create a changeset (changesets/cli) for a release
```

There is no separate lint script; `tsc`/`tsup` type-checking during build is the main static check. Pre-commit hooks (`.pre-commit-config.yaml`) handle whitespace/EOF/YAML/JSON checks and REUSE license-header linting on modified files.

The `docs/` directory is a **separate pnpm workspace** (an Astro/Starlight documentation site) with its own `package.json`, `pnpm-lock.yaml`, and its own `CLAUDE.md`/`AGENTS.md` — its build/dev commands don't apply to the library itself. It is only touched when updating published documentation.

## Module system notes

- The package is pure ESM (`"type": "module"`, `moduleResolution: "NodeNext"`). Relative imports inside `src/` must use explicit `.js` extensions even though the source files are `.ts` (e.g. `import { FlowGraph } from '../utils/graph.js'`).
- `tsup.config.ts` builds two entry variants: a full `cjs`+`esm` bundle (`index.*`) and a minified ESM-only bundle (`index.min.js`). Type declarations are emitted separately via `tsc --emitDeclarationOnly` in the `build` script, not by tsup.

## Architecture

The conversion pipeline has three layers, entered through `src/index.ts` (`convertIsaJsonToIsaTab` / `convertIsaJsonToZip`):

1. **Investigation mapper** (`src/mappers/investigation.ts`) — handles the *vertical* metadata sections of ISA-Tab (`ONTOLOGY SOURCE REFERENCE`, `INVESTIGATION`, `STUDY`, `STUDY FACTORS`, `STUDY PROTOCOLS`, etc.). These sections are transposed: each JSON field becomes a row, and each item in an array becomes a tab-separated column. `transposeSection` and `transposeComments` are the generic helpers that do this; `extractValue` resolves nested/array-valued ISA-JSON fields (including Ontology Annotation objects with `annotationValue`/`termAccession`/`termSource`) into flat strings.

2. **Graph builder** (`src/utils/graph.ts`) — `FlowGraph` parses a Study or Assay's `processSequence` into a DAG. Process inputs/outputs become `GraphNode`s, processes become `ProcessEdge`s. Node classification (`Source Name`, `Sample Name`, `Extract Name`, `Raw Data File`, etc.) is resolved by cross-referencing IDs against `tableData.materials.{sources,samples,otherMaterials}` — this classification logic is the thing most likely to need extending when supporting new ISA-Tab node types. 1-to-1 processes zip inputs/outputs pairwise; N-to-M processes (pooling/splitting) fall back to a Cartesian product of edges. `getLinearSequences()` does a DFS from every root node to every leaf, producing one path per root→leaf route.

3. **Table mapper** (`src/mappers/table.ts`) — converts the graph into a flat table. It picks the **longest** linear sequence to define the column structure (`buildHeaderMappings`), since the longest path has the most nodes/protocols/characteristics/parameters to expose as columns. Every other (shorter) path is then mapped onto that same fixed column set by node/protocol index, leaving gaps blank rather than shifting columns — this is what keeps parallel/divergent workflows aligned in the output table. Ontology-valued columns (`Characteristics [...]`, `Parameter Value [...]`) are always immediately followed by their `Term Accession Number` and `Term Source REF` columns.

When changing header/column logic, keep `determineHeaders()` (used for previewing headers) and `convertTable()` (used for full row generation) consistent — they share `buildHeaderMappings()` and must derive columns the same way.

## Types

`src/types/isa.d.ts` is **generated, not hand-written** — regenerate it with `pnpm run generate-types`, which runs `json-schema-to-typescript` over `schemas/investigation_schema.json` (which `$ref`s the other `schemas/*.json` files). If you need to change a type, edit the corresponding JSON Schema in `schemas/` and regenerate, don't edit the `.d.ts` directly.

## Licensing / REUSE compliance

This repo is [REUSE](https://reuse.software/)-compliant and enforces it in CI (`.github/workflows/reuse.yml`) and via pre-commit. Every source file needs `SPDX-FileCopyrightText`/`SPDX-License-Identifier` header comments (see any file in `src/` or `tests/` for the exact format). License varies by area, per `REUSE.toml`:
- `src/`, `tests/`, config files at the root → `ISC`
- `schemas/*.json` → `CPAL-1.0` (owned by the upstream ISA-tools team, not this project)
- `docs/` and markdown/docs assets → `CC-BY-4.0`

New files should carry the header matching their directory's license.

## Testing conventions

Tests live in `tests/*.test.ts` (vitest) and build inline mock ISA-JSON payloads (see `tests/table.test.ts` for the shape of a mock Study with `materials`/`processSequence`) rather than depending on fixture files. When adding mapping behavior, prefer extending an existing `describe` block with a new mock payload over introducing new fixture infrastructure.
