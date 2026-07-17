---
# SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
#
# SPDX-License-Identifier: CC-BY-4.0

title: ISA-JSON to ISA-Tab Conversion
description: How to convert ISA-JSON data into ISA-Tab format or a compressed ZIP archive using isa4js.
---

This guide shows you how to convert your ISA-JSON datasets into ISA-Tab formatted files or compressed ZIP archives.

## Installation

Install the package in your project:

```bash
pnpm add isa4js
```

## Convert to Raw ISA-Tab Strings

Use `convertIsaJsonToIsaTab` to transform your ISA-JSON data into memory strings. This returns an object containing the formatted files.

```ts
import { convertIsaJsonToIsaTab, type ISAInvestigationSchema } from 'isa4js';

const isaJsonData: ISAInvestigationSchema = {
  // Your valid ISA-JSON object
};

try {
  const files = convertIsaJsonToIsaTab(isaJsonData);

  // Iterate through the generated files
  for (const [filename, content] of Object.entries(files)) {
    console.log(`--- ${filename} ---`);
    console.log(content);
  }
  // Or access a specific file directly if you know its generated name
  // console.log(files['i_investigation.txt']);
} catch (error) {
  console.error('Conversion failed:', error);
}
```

## Convert directly to a ZIP Archive

Use `convertIsaJsonToZip` to bundle all generated ISA-Tab matrices into a single compressed archive.

```ts
import { convertIsaJsonToZip } from 'isa4js';
import { writeFile } from 'node:fs/promises';

const isaJsonData = { /* ... */ };

// Generates a ZIP archive buffer
const zipBuffer = await convertIsaJsonToZip(isaJsonData);

// Save the file to disk
await writeFile('./isa-metadata.zip', zipBuffer);
```
