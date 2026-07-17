<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
SPDX-License-Identifier: CC-BY-4.0
-->
## Description
<!-- Please include a summary of the changes and the related issue/bug. Include relevant motivation and context. -->

## Related Issue(s)
<!-- Please link to the issue(s) here (e.g., "Closes #123"). -->

## Type of Change
<!-- Please check the one that applies to this PR using "x". -->
- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🛠️ Refactor / Maintenance

## Checklist
<!-- Go over all the following points, and put an `x` in all the boxes that apply. -->
<!-- If you're unsure about any of these, don't hesitate to ask. We're here to help! -->
- [ ] I have read the **CONTRIBUTING** document.
- [ ] My code follows the code style and architectural patterns of this project.
- [ ] I have added/updated tests to cover my changes (if applicable).
- [ ] All new and existing tests passed locally (`pnpm run test`).
- [ ] Any dependent changes have been merged and published in downstream modules.

## Domain-Specific Checks (ISA-JSON / ISA-Tab)
<!-- If your changes affect the Table Mapper or FlowGraph logic, please verify the following: -->
- [ ] Graph traversal successfully handles branching and merging workflows.
- [ ] Material nodes (Sources, Samples, Extracts) are properly resolved from `tableData.materials`.
- [ ] Ontology columns (`Term Accession Number`, `Term Source REF`) correctly follow their anchor columns.

## Additional Context
<!-- Add any other context or screenshots about the pull request here. -->
