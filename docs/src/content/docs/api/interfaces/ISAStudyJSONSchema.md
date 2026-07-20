---
editUrl: false
next: false
prev: false
title: "ISAStudyJSONSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:103](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L103)

JSON Schema describing an ISA model Study object

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:105](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L105)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:104](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L104)

***

### @type?

> `optional` **@type?**: `"Study"`

Defined in: [types/isa.d.ts:106](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L106)

***

### assays?

> `optional` **assays?**: [`ISAAssayJSONSchema`](/api/interfaces/isaassayjsonschema/)[]

Defined in: [types/isa.d.ts:124](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L124)

***

### characteristicCategories?

> `optional` **characteristicCategories?**: [`ISAMaterialAttributeSchema`](/api/interfaces/isamaterialattributeschema/)[]

Defined in: [types/isa.d.ts:129](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L129)

List of all the characteristics categories (or material attributes) defined in the study, used to avoid duplication of their declaration when each material_attribute_value is created.

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:134](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L134)

***

### description?

> `optional` **description?**: `string`

Defined in: [types/isa.d.ts:110](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L110)

***

### factors?

> `optional` **factors?**: [`ISAFactorSchema`](/api/interfaces/isafactorschema/)[]

Defined in: [types/isa.d.ts:125](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L125)

***

### filename?

> `optional` **filename?**: `string`

Defined in: [types/isa.d.ts:107](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L107)

***

### identifier?

> `optional` **identifier?**: `string`

Defined in: [types/isa.d.ts:108](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L108)

***

### materials?

> `optional` **materials?**: `object`

Defined in: [types/isa.d.ts:117](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L117)

#### Index Signature

\[`k`: `string`\]: `unknown`

#### otherMaterials?

> `optional` **otherMaterials?**: [`ISAMaterialSchema`](/api/interfaces/isamaterialschema/)[]

#### samples?

> `optional` **samples?**: [`ISASampleSchema`](/api/interfaces/isasampleschema/)[]

#### sources?

> `optional` **sources?**: [`ISASourceSchema`](/api/interfaces/isasourceschema/)[]

***

### people?

> `optional` **people?**: [`ISAPersonSchema`](/api/interfaces/isapersonschema/)[]

Defined in: [types/isa.d.ts:114](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L114)

***

### processSequence?

> `optional` **processSequence?**: [`ISAProcessSchema`](/api/interfaces/isaprocessschema/)[]

Defined in: [types/isa.d.ts:123](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L123)

***

### protocols?

> `optional` **protocols?**: [`ISAProtocolSchema`](/api/interfaces/isaprotocolschema/)[]

Defined in: [types/isa.d.ts:116](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L116)

***

### publications?

> `optional` **publications?**: [`ISAPublicationSchema`](/api/interfaces/isapublicationschema/)[]

Defined in: [types/isa.d.ts:113](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L113)

***

### publicReleaseDate?

> `optional` **publicReleaseDate?**: `string`

Defined in: [types/isa.d.ts:112](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L112)

***

### studyDesignDescriptors?

> `optional` **studyDesignDescriptors?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)[]

Defined in: [types/isa.d.ts:115](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L115)

***

### submissionDate?

> `optional` **submissionDate?**: `string`

Defined in: [types/isa.d.ts:111](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L111)

***

### title?

> `optional` **title?**: `string`

Defined in: [types/isa.d.ts:109](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L109)

***

### unitCategories?

> `optional` **unitCategories?**: [`ISAOntologyReferenceSchema`](/api/interfaces/isaontologyreferenceschema/)[]

Defined in: [types/isa.d.ts:133](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L133)

List of all the units defined in the study, used to avoid duplication of their declaration when each value is created.
