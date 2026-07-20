---
editUrl: false
next: false
prev: false
title: "ISASampleSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:202](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L202)

JSON-schema representing an ISA model Sample object (A sample represents a major output resulting from a protocol application other than the special case outputs of Extract or a Labeled Extract)

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:204](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L204)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:203](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L203)

***

### @type?

> `optional` **@type?**: `"Sample"`

Defined in: [types/isa.d.ts:205](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L205)

***

### characteristics?

> `optional` **characteristics?**: [`ISAMaterialAttributeValueSchema`](/api/interfaces/isamaterialattributevalueschema/)[]

Defined in: [types/isa.d.ts:207](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L207)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:210](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L210)

***

### derivesFrom?

> `optional` **derivesFrom?**: [`ISASourceSchema`](/api/interfaces/isasourceschema/)[]

Defined in: [types/isa.d.ts:209](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L209)

***

### factorValues?

> `optional` **factorValues?**: [`ISAFactorValueSchema`](/api/interfaces/isafactorvalueschema/)[]

Defined in: [types/isa.d.ts:208](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L208)

***

### name?

> `optional` **name?**: `string`

Defined in: [types/isa.d.ts:206](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L206)
