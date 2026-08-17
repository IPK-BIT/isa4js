# isa4js

## 0.1.2

### Patch Changes

- 063f750: - Study Design Descriptors (investigation.ts:206-207) — jsonKey for the TAN/TSR columns changed from 'annotationValue' to 'termAccession'/'termSource', so those columns now emit real term data instead of duplicating Type.
  - Assay filename mismatch (investigation.ts:238-249) — STUDY ASSAYS now resolves a resolvedAssays array with the same fallback filename formula convertIsaJsonToIsaTab() uses in index.ts, before transposing, so the manifest always matches the actual generated a_*.txt names.
  - "Accesion" typo — fixed in all four tabLabels (design descriptors, measurement type, technology type, protocol type).
- 063f750: - test.yml: added a Type-check step (pnpm exec tsc --noEmit) before tests, concurrency group, timeout-minutes: 10, SHA-pinned pnpm/action-setup.
  - reuse.yml: added concurrency group, timeout-minutes: 5, SHA-pinned fsfe/reuse-action.
  - release.yml: aligned Node version to 24 (was 22, now matches the other workflows), timeout-minutes: 10, SHA-pinned pnpm/action-setup and changesets/action.
  - deploy-docs.yml: removed the now-unused BUILD_PATH env var (was set but never referenced), timeout-minutes on both jobs, SHA-pinned pnpm/action-setup. Left the install/build steps untouched since you've confirmed the deploy actually works.
- 063f750: - Quoted-value escaping — table.ts row cells and investigation.ts transposed sections/comments/scalar fields now escape embedded double quotes by doubling them (matching Python csv module conventions), instead of emitting broken TSV when a value contains a literal `"`.
  - Cycle detection — FlowGraph.getLinearSequences() now throws a descriptive error when a processSequence contains a cycle, instead of stack-overflowing with an opaque RangeError.
  - Process/protocol comments — buildHeaderMappings() in table.ts now surfaces process-level `comments` as `Comment [...]` columns, matching the existing extraction for node-level comments.

## 0.1.1

### Patch Changes

- f2dec21: conversion of comments in the investigation file now supported
