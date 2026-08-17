---
"isa4js": patch
---

- Study Design Descriptors (investigation.ts:206-207) — jsonKey for the TAN/TSR columns changed from 'annotationValue' to 'termAccession'/'termSource', so those columns now emit real term data instead of duplicating Type.
- Assay filename mismatch (investigation.ts:238-249) — STUDY ASSAYS now resolves a resolvedAssays array with the same fallback filename formula convertIsaJsonToIsaTab() uses in index.ts, before transposing, so the manifest always matches the actual generated a_*.txt names.
- "Accesion" typo — fixed in all four tabLabels (design descriptors, measurement type, technology type, protocol type).
