---
"isa4js": patch
---

- Quoted-value escaping — table.ts row cells and investigation.ts transposed sections/comments/scalar fields now escape embedded double quotes by doubling them (matching Python csv module conventions), instead of emitting broken TSV when a value contains a literal `"`.
- Cycle detection — FlowGraph.getLinearSequences() now throws a descriptive error when a processSequence contains a cycle, instead of stack-overflowing with an opaque RangeError.
- Process/protocol comments — buildHeaderMappings() in table.ts now surfaces process-level `comments` as `Comment [...]` columns, matching the existing extraction for node-level comments.
