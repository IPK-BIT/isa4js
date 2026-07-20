---
# SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
#
# SPDX-License-Identifier: CC-BY-4.0

title: Investigation Schema
description: Technical specification, properties, and ISA-Tab mapping rules for the Investigation schema in isa4js.
sidebar:
  order: 0
---

This reference document defines the programmatic structure and properties of the `ISAInvestigationSchema` object within `isa4js`. It details the JSON-schema representation of an ISA model Investigation object and how its fields map to standard ISA-Tab strings.

## Object Properties

The `ISAInvestigationSchema` contains the following top-level properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `@type` | `"Investigation"` | The strictly enforced type identifier for the object. |
| `@id` | `string` | Optional JSON-LD identifier. |
| `@context` | `string` | Optional JSON-LD context string. |
| `filename` | `string` | The intended filename for the investigation. |
| `identifier` | `string` | A string identifying the investigation framework. Maps to `Investigation Identifier` in ISA-Tab. |
| `title` | `string` | The formal title of the research project. Maps to `Investigation Title` in ISA-Tab. |
| `description` | `string` | A textual abstract detailing the goals and scope of the work. Maps to `Investigation Description` in ISA-Tab. |
| `submissionDate` | `string` | The date the investigation record was submitted. Maps to `Investigation Submission Date` in ISA-Tab. |
| `publicReleaseDate` | `string` | The date the investigation data is scheduled for public availability. Maps to `Investigation Public Release Date` in ISA-Tab. |
| `ontologySourceReferences` | `ISAOntologySourceReferenceSchema[]` | Maps to the `ONTOLOGY SOURCE REFERENCE` section in ISA-Tab. |
| `publications` | `ISAPublicationSchema[]` | Maps to the `INVESTIGATION PUBLICATIONS` section in ISA-Tab. |
| `people` | `ISAPersonSchema[]` | Maps to the `INVESTIGATION CONTACTS` section in ISA-Tab. |
| `studies` | `ISAStudyJSONSchema[]` | Generates the core `STUDY` loops during conversion. |
| `comments` | `ISACommentSchema[]` | It corresponds to ISA Comment objects. |


## Conversion Mapping Constraints

When utilizing `convertInvestigation(isaJson: ISAInvestigationSchema)` to map the JSON object to an `i_investigation.txt` string, the following rules apply:

* **Null/Undefined Handling:** If primitive metadata fields (like `identifier` or `title`) are missing, they default to an empty string `""` within the generated ISA-Tab document.
* **Missing Arrays:** If a nested array (e.g., `publications` or `people`) is undefined or empty, the ISA-Tab transposition simply outputs the section headers without row data.
* **Nested Values Extraction:** When mapping complex nested fields (such as extracting `annotationValue` from an `ISAOntologyReferenceSchema`), the converter automatically extracts the terminal value or falls back to an empty string if the path does not exist.

## Example Instance

The following block represents a compliant minimal JSON structure recognized by the `isa4js` definitions:

```json
{
  "@type": "Investigation",
  "@id": "#investigation/inv-001-2026",
  "identifier": "inv-001-2026",
  "title": "Plant Phenotyping Dataset",
  "submissionDate": "2026-07-17",
  "ontologySourceReferences": [
    {
      "@type": "OntologySourceReference",
      "@id": "#ontology-source/credit",
      "name": "CRediT",
      "file": "https://credit.niso.org/",
      "version": "2022",
      "description": "Contributor Roles Taxonomy (ANSI/NISO Z39.104-2022)"
    }
  ],
  "publications": [],
  "people": [
    {
      "@type": "Person",
      "@id": "#person/feser@ipk-gatersleben.de",
      "firstName": "Manuel",
      "lastName": "Feser",
      "midInitials": "",
      "email": "feser@ipk-gatersleben.de",
      "phone": "",
      "fax": "",
      "affiliation": "IPK Gatersleben",
      "roles": [
        {
          "@type": "OntologyAnnotation",
          "annotationValue": "Software",
          "termSource": "CRediT",
          "termAccession": "https://credit.niso.org/contributor-roles/software/"
        }
      ],
      "comments": []
    }
  ],
  "studies": [],
  "comments": []
}
```
