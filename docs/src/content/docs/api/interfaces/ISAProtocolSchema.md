---
editUrl: false
next: false
prev: false
title: "ISAProtocolSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:139](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L139)

JSON-schema representing an ISA model Protocol object

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:141](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L141)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:140](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L140)

***

### @type?

> `optional` **@type?**: `"Protocol"`

Defined in: [types/isa.d.ts:142](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L142)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/isa4js/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:155](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L155)

***

### components?

> `optional` **components?**: `object`[]

Defined in: [types/isa.d.ts:149](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L149)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### comments?

> `optional` **comments?**: [`ISACommentSchema`](/isa4js/api/interfaces/isacommentschema/)[]

#### componentName?

> `optional` **componentName?**: `string`

#### componentType?

> `optional` **componentType?**: [`ISAOntologyReferenceSchema`](/isa4js/api/interfaces/isaontologyreferenceschema/)

***

### description?

> `optional` **description?**: `string`

Defined in: [types/isa.d.ts:145](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L145)

***

### name?

> `optional` **name?**: `string`

Defined in: [types/isa.d.ts:143](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L143)

***

### parameters?

> `optional` **parameters?**: [`ISAProtocolParameterSchema`](/isa4js/api/interfaces/isaprotocolparameterschema/)[]

Defined in: [types/isa.d.ts:148](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L148)

***

### protocolType?

> `optional` **protocolType?**: [`ISAOntologyReferenceSchema`](/isa4js/api/interfaces/isaontologyreferenceschema/)

Defined in: [types/isa.d.ts:144](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L144)

***

### uri?

> `optional` **uri?**: `string`

Defined in: [types/isa.d.ts:146](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L146)

***

### version?

> `optional` **version?**: `string`

Defined in: [types/isa.d.ts:147](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L147)
