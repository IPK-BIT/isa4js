---
editUrl: false
next: false
prev: false
title: "ISAMaterialSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:238](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L238)

JSON-schema representing an ISA model material object, which is not a source or a sample (as they have specific schemas) - this will correspond to 'Extract Name', 'Labeled Extract Name'

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:240](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L240)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:239](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L239)

***

### @type?

> `optional` **@type?**: `"Material"`

Defined in: [types/isa.d.ts:241](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L241)

***

### characteristics?

> `optional` **characteristics?**: [`ISAMaterialAttributeValueSchema`](/isa4js/api/interfaces/isamaterialattributevalueschema/)[]

Defined in: [types/isa.d.ts:244](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L244)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/isa4js/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:245](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L245)

***

### name?

> `optional` **name?**: `string`

Defined in: [types/isa.d.ts:242](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L242)

***

### type?

> `optional` **type?**: `"Extract Name"` \| `"Labeled Extract Name"`

Defined in: [types/isa.d.ts:243](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L243)
