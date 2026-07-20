---
editUrl: false
next: false
prev: false
title: "convertIsaJsonToZip"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

> **convertIsaJsonToZip**(`isaJson`, `type?`): `Promise`\<`Blob` \| `Uint8Array`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>\>

Defined in: [index.ts:54](https://github.com/IPK-BIT/isa4js/blob/main/src/index.ts#L54)

Converts a complete ISA-JSON structure into a single ZIP archive containing the ISA-Tab files.

## Parameters

### isaJson

[`ISAInvestigationSchema`](/api/interfaces/isainvestigationschema/)

The parsed ISA-JSON Investigation object.

### type?

`"blob"` \| `"uint8array"` \| `"nodebuffer"`

The output format for JSZip ('blob' for browser, 'nodebuffer' or 'uint8array' for Node.js).

## Returns

`Promise`\<`Blob` \| `Uint8Array`\<`ArrayBufferLike`\> \| `Buffer`\<`ArrayBufferLike`\>\>

A promise resolving to the requested zip format.
