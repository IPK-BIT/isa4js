---
editUrl: false
next: false
prev: false
title: "ISAOntologyReferenceSchema"
---

<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->

Defined in: [types/isa.d.ts:70](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L70)

JSON-schema representing an ISA model Ontology Reference or annotation (for fields that are required to be ontology annotations)

## Properties

### @context?

> `optional` **@context?**: `string`

Defined in: [types/isa.d.ts:72](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L72)

***

### @id?

> `optional` **@id?**: `string`

Defined in: [types/isa.d.ts:71](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L71)

***

### @type?

> `optional` **@type?**: `"OntologyAnnotation"`

Defined in: [types/isa.d.ts:73](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L73)

***

### annotationValue?

> `optional` **annotationValue?**: `string` \| `number`

Defined in: [types/isa.d.ts:74](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L74)

***

### comments?

> `optional` **comments?**: [`ISACommentSchema`](/api/interfaces/isacommentschema/)[]

Defined in: [types/isa.d.ts:80](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L80)

***

### termAccession?

> `optional` **termAccession?**: `string`

Defined in: [types/isa.d.ts:79](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L79)

***

### termSource?

> `optional` **termSource?**: `string`

Defined in: [types/isa.d.ts:78](https://github.com/IPK-BIT/isa4js/blob/main/src/types/isa.d.ts#L78)

The abbreviated ontology name. It should correspond to one of the sources as specified in the ontologySourceReference section of the Investigation.
