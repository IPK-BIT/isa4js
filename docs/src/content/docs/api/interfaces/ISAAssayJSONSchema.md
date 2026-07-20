---
editUrl: false
next: false
prev: false
title: "ISAAssayJSONSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:306](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L306)

JSON Schema describing an ISA model Assay object

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:308](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L308)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:307](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L307)

***

### @type?

> `optional` **@type?**: `"Assay"`

Defined in: [types/isa.d.ts:309](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L309)

***

### characteristicCategories?

> `optional` **characteristicCategories?**: [`ISAMaterialAttributeSchema`](/api/interfaces/isamaterialattributeschema/)[]

Defined in: [types/isa.d.ts:323](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L323)

List of all the characteristics categories (or material attributes) defined in the study, used to avoid duplication of their declaration when each material_attribute_value is created.

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:329](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L329)

***

### dataFiles?

> `optional` **dataFiles?**: [`ISADataSchema`](/api/interfaces/isadataschema/)[]

Defined in: [types/isa.d.ts:314](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L314)

***

### filename?

> `optional` **filename?**: `string`

Defined in: [types/isa.d.ts:310](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L310)

***

### materials?

> `optional` **materials?**: `object`

Defined in: [types/isa.d.ts:315](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L315)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### otherMaterials?

> `optional` **otherMaterials?**: [`ISAMaterialSchema`](/api/interfaces/isamaterialschema/)[]

#### samples?

> `optional` **samples?**: [`ISASampleSchema`](/api/interfaces/isasampleschema/)[]

***

### measurementType?

> `optional` **measurementType?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)

Defined in: [types/isa.d.ts:311](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L311)

***

### processSequence?

> `optional` **processSequence?**: [`ISAProcessSchema`](/api/interfaces/isaprocessschema/)[]

Defined in: [types/isa.d.ts:328](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L328)

***

### technologyPlatform?

> `optional` **technologyPlatform?**: `string`

Defined in: [types/isa.d.ts:313](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L313)

***

### technologyType?

> `optional` **technologyType?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)

Defined in: [types/isa.d.ts:312](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L312)

***

### unitCategories?

> `optional` **unitCategories?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)[]

Defined in: [types/isa.d.ts:327](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L327)

List of all the unitsdefined in the study, used to avoid duplication of their declaration when each value is created.
