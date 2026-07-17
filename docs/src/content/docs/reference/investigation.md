---
# SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
#
# SPDX-License-Identifier: CC-BY-4.0

title: Investigation Schema
description: Technical specification, properties, and ISA-Tab mapping rules for the Investigation schema in isa4js.
sidebar:
  order: 0
---

This reference document defines the programmatic structure and properties of the `ISAInvestigationSchema` object within `isa4js`[cite: 2]. It details the JSON-schema representation of an ISA model Investigation object and how its fields map to standard ISA-Tab strings[cite: 2, 4].

## Object Properties

The `ISAInvestigationSchema` contains the following top-level properties[cite: 2]:

| Property | Type | Description |
| :--- | :--- | :--- |
| `@type` | `"Investigation"` | The strictly enforced type identifier for the object[cite: 2]. |
| `@id` | `string` | Optional JSON-LD identifier[cite: 2]. |
| `@context` | `string` | Optional JSON-LD context string[cite: 2]. |
| `filename` | `string` | The intended filename for the investigation[cite: 2]. |
| `identifier` | `string` | A string identifying the investigation framework[cite: 2]. Maps to `Investigation Identifier` in ISA-Tab[cite: 4]. |
| `title` | `string` | The formal title of the research project[cite: 2]. Maps to `Investigation Title` in ISA-Tab[cite: 4]. |
| `description` | `string` | A textual abstract detailing the goals and scope of the work[cite: 2]. Maps to `Investigation Description` in ISA-Tab[cite: 4]. |
| `submissionDate` | `string` | The date the investigation record was submitted[cite: 2]. Maps to `Investigation Submission Date` in ISA-Tab[cite: 4]. |
| `publicReleaseDate` | `string` | The date the investigation data is scheduled for public availability[cite: 2]. Maps to `Investigation Public Release Date` in ISA-Tab[cite: 4]. |

### Nested Array Properties

The investigation object supports nested arrays containing specific sub-schemas[cite: 2]:

* **`ontologySourceReferences`**: Array of `ISAOntologySourceReferenceSchema` objects[cite: 2]. Maps to the `ONTOLOGY SOURCE REFERENCE` section in ISA-Tab[cite: 4].
* **`publications`**: Array of `ISAPublicationSchema` objects[cite: 2]. Maps to the `INVESTIGATION PUBLICATIONS` section in ISA-Tab[cite: 4].
* **`people`**: Array of `ISAPersonSchema` objects[cite: 2]. Maps to the `INVESTIGATION CONTACTS` section in ISA-Tab[cite: 4].
* **`studies`**: Array of `ISAStudyJSONSchema` objects[cite: 2]. Generates the core `STUDY` loops during conversion[cite: 4].
* **`comments`**: Array of `ISACommentSchemaItCorrespondsToISACommentConstruct` objects[cite: 2].

## Conversion Mapping Constraints

When utilizing `convertInvestigation(isaJson: ISAInvestigationSchema)` to map the JSON object to an `i_investigation.txt` string, the following rules apply[cite: 4]:

* **Null/Undefined Handling:** If primitive metadata fields (like `identifier` or `title`) are missing, they default to an empty string `""` within the generated ISA-Tab document[cite: 4].
* **Missing Arrays:** If a nested array (e.g., `publications` or `people`) is undefined or empty, the ISA-Tab transposition simply outputs the section headers without row data[cite: 4].
* **Nested Values Extraction:** When mapping complex nested fields (such as extracting `annotationValue` from an `ISAOntologyReferenceSchema`), the converter automatically extracts the terminal value or falls back to an empty string if the path does not exist[cite: 4].

## Example Instance

The following block represents a compliant minimal JSON structure recognized by the `isa4js` definitions:

```json
{
  "@type": "Investigation",
  "identifier": "inv-001-2026",
  "title": "Plant Phenotyping Dataset",
  "submissionDate": "2026-07-17",
  "ontologySourceReferences": [
    {
      "name": "NCBITaxon",
      "file": "[http://purl.obolibrary.org/obo/ncbitaxon.owl](http://purl.obolibrary.org/obo/ncbitaxon.owl)",
      "version": "2026-01-01",
      "description": "National Center for Biotechnology Information Taxonomy"
    }
  ],
  "studies": []
}
