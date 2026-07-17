<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
SPDX-License-Identifier: CC-BY-4.0
-->
# isa4js

[![CI Tests](https://github.com/ipk-bit/isa4js/actions/workflows/test.yml/badge.svg)](https://github.com/ipk-bit/isa4js/actions)
[![License](https://img.shields.io/github/license/ipk-bit/isa4js?color=blue)](LICENSE)
[![pnpm Version](https://img.shields.io/badge/pnpm-%3E%3D_11.5.1-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vitest Tested](https://img.shields.io/badge/tested_with-vitest-76b5c5?logo=vitest&logoColor=white)](https://vitest.dev/)
[![REUSE status](https://api.reuse.software/badge/github.com/IPK-BIT/isa4js)](https://api.reuse.software/info/github.com/IPK-BIT/isa4js)
<!-- [![NPM Version](https://img.shields.io/npm/v/isa4js?color=33cd56&logo=npm)](https://www.npmjs.com/package/isa4js) -->

A robust, lightweight TypeScript library that converts complex **ISA-JSON** structures into flat, standard **ISA-Tab** files.

Unlike simple row-by-row mappers, this tool reconstructs experimental workflows by tracing a Directed Acyclic Graph (DAG) from root nodes to leaf nodes, generating highly accurate tabular metadata matrices.

---

## Features

* **Investigation Mapping**: Full conversion of vertical ISA-JSON investigation metadata into standard `i_investigation.txt` files.
* **Graph-Based Table Mapping**: Uses a custom FlowGraph traversal utility to map nonlinear `processSequence` nodes dynamically into tabular Study (`s_*.txt`) and Assay (`a_*.txt`) matrices.
* **Ontology Integration**: Automatic alignment of `Characteristics [...]` and `Parameter Value [...]` alongside their corresponding `Term Accession Number` and `Term Source REF` columns.
* **Flexible Packaging**: Convert payloads directly to an in-memory dictionary of TSV string files or export them directly into a compressed ZIP file (`JSZip`).
* **Type-Safe**: Fully typed ESM build developed using TypeScript, `pnpm`, and tested with `vitest`.

---

## Installation

Add the library to your project using your preferred package manager:

```bash
pnpm add isa4js
# or
npm install isa4js
# or
yarn add isa4js
```

## Usage

### Generate an In-Memory File Dictionary
If you need raw strings of the generated ISA-Tab files to manipulate or store yourself:

```ts
import { convertIsaJsonToIsaTab } from 'isa4js';
import myIsaPayload from './my-isa-metadata.json';

const files = convertIsaJsonToIsaTab(myIsaPayload);

// Access individual files directly
console.log(files['i_investigation.txt']);
console.log(files['s_study_01.txt']);
```

### Export Directly to a ZIP Archive

Ideal for browser downloads or writing directly to a storage system:

```ts
import { convertIsaJsonToZip } from 'isa4js';
import myIsaPayload from './my-isa-metadata.json';

// In Node.js environment
const zipBuffer = await convertIsaJsonToZip(myIsaPayload, 'nodebuffer');

// In Browser environment
const zipBlob = await convertIsaJsonToZip(myIsaPayload, 'blob');
```

## Technical Architecture

Under the hood, the library processes study and assay tables in two phases:
1. **Graph Reconstruction**: The `processSequence` of nodes (Inputs/Outputs) and edges (Processes/Protocols) are parsed by a `FlowGraph` class to build a custom DAG. Nodes are classified into their true ISA-Tab roles (`Source Name`, `Sample Name`, etc.) by cross-referencing parent table materials.
1. **Path Traversal & Mapping**: Longest-path traversal determines the exact dynamic columns (e.g., `Characteristics [organism]`). Shorter parallel paths are then mapped sequentially onto these column maps, filling empty steps gracefully and preventing column shifting.

## Development

To get started with local development:

```bash
# Install dependencies
pnpm install

# Run the test suite in watch mode
pnpm run test

# Run a single-run test execution
pnpm exec vitest run
```
