---
editUrl: false
next: false
prev: false
title: "ISAProcessParameterValueSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:268](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L268)

JSON-schema representing an ISA model Parameter Value (associated with a Protocol REF) object

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:270](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L270)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:269](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L269)

***

### @type?

> `optional` **@type?**: `"ParameterValue"`

Defined in: [types/isa.d.ts:271](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L271)

***

### category?

> `optional` **category?**: [`ISAProtocolParameterSchema`](/api/interfaces/isaprotocolparameterschema/)

Defined in: [types/isa.d.ts:272](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L272)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:275](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L275)

***

### unit?

> `optional` **unit?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)

Defined in: [types/isa.d.ts:274](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L274)

***

### value?

> `optional` **value?**: `string` \| `number` \| [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)

Defined in: [types/isa.d.ts:273](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L273)
