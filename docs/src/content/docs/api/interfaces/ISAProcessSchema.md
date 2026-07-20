---
editUrl: false
next: false
prev: false
title: "ISAProcessSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:250](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L250)

JSON-schema representing an ISA model Process (protocol application) object

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:252](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L252)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:251](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L251)

***

### @type?

> `optional` **@type?**: `"Process"`

Defined in: [types/isa.d.ts:253](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L253)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/isa4js/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:263](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L263)

***

### date?

> `optional` **date?**: `string`

Defined in: [types/isa.d.ts:258](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L258)

***

### executesProtocol?

> `optional` **executesProtocol?**: [`ISAProtocolSchema`](/isa4js/api/interfaces/isaprotocolschema/)

Defined in: [types/isa.d.ts:255](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L255)

***

### inputs?

> `optional` **inputs?**: ([`ISASourceSchema`](/isa4js/api/interfaces/isasourceschema/) \| [`ISASampleSchema`](/isa4js/api/interfaces/isasampleschema/) \| [`ISAMaterialSchema`](/isa4js/api/interfaces/isamaterialschema/) \| [`ISADataSchema`](/isa4js/api/interfaces/isadataschema/))[]

Defined in: [types/isa.d.ts:261](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L261)

***

### name?

> `optional` **name?**: `string`

Defined in: [types/isa.d.ts:254](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L254)

***

### nextProcess?

> `optional` **nextProcess?**: `ISAProcessSchema`

Defined in: [types/isa.d.ts:260](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L260)

***

### outputs?

> `optional` **outputs?**: ([`ISASampleSchema`](/isa4js/api/interfaces/isasampleschema/) \| [`ISAMaterialSchema`](/isa4js/api/interfaces/isamaterialschema/) \| [`ISADataSchema`](/isa4js/api/interfaces/isadataschema/))[]

Defined in: [types/isa.d.ts:262](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L262)

***

### parameterValues?

> `optional` **parameterValues?**: [`ISAProcessParameterValueSchema`](/isa4js/api/interfaces/isaprocessparametervalueschema/)[]

Defined in: [types/isa.d.ts:256](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L256)

***

### performer?

> `optional` **performer?**: `string`

Defined in: [types/isa.d.ts:257](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L257)

***

### previousProcess?

> `optional` **previousProcess?**: `ISAProcessSchema`

Defined in: [types/isa.d.ts:259](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L259)
