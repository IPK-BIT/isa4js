// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import { describe, it, expect } from 'vitest';
import { convertInvestigation } from '../src/mappers/investigation.js';
import { ISAInvestigationSchema } from '../src/types/isa.js';

/**
 * These tests specify the expected behaviour for ISA-JSON "comments" arrays:
 * every entity in the schema (Investigation, OntologySourceReference,
 * Publication, Person, Study, Protocol, Factor, Assay, ...) can carry a
 * `comments` array of `{ name, value }` pairs. The ISA-Tab format renders
 * each distinct comment name as its own `Comment [Name]` row, following the
 * same `Comment [${name}]` convention already used for node/process comments
 * in `mappers/table.ts`.
 *
 * NOTE: as of writing, `convertInvestigation()` does not yet read `comments`
 * anywhere, so these tests are expected to fail until that support is added.
 */
describe('convertInvestigation() Comment handling', () => {

  // ==========================================
  // 1. Investigation-level comments
  // ==========================================
  it('should render top-level Investigation comments as Comment [Name] rows', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      identifier: 'i_001',
      title: 'Global Stress Responses',
      comments: [
        { name: 'Created With Configuration', value: 'ISAcreator' },
        { name: 'Last Update Date', value: '2026-07-15' }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Comment [Created With Configuration]\t"ISAcreator"');
    expect(result).toContain('Comment [Last Update Date]\t"2026-07-15"');
  });

  // ==========================================
  // 2. Ontology Source Reference comments
  // ==========================================
  it('should transpose Comment [Name] rows for ontology source references, aligned by item', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      ontologySourceReferences: [
        {
          name: 'NCBITaxon',
          file: 'ncbi.owl',
          comments: [{ name: 'Comment Type', value: 'taxonomy' }]
        },
        {
          name: 'UO',
          file: 'uo.owl'
          // no comments on this item -> should align with an empty cell
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Term Source Comment [Comment Type]\t"taxonomy"\t""');
  });

  // ==========================================
  // 3. Investigation Publication comments
  // ==========================================
  it('should render Investigation Publication comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      publications: [
        {
          doi: '10.1234/parent',
          title: 'Investigation Paper',
          authorList: 'Author A',
          comments: [{ name: 'Preprint DOI', value: '10.1234/preprint' }]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Investigation Publication Comment [Preprint DOI]\t"10.1234/preprint"');
  });

  // ==========================================
  // 4. Investigation Contacts (People) comments
  // ==========================================
  it('should render Investigation Person comments (e.g. ORCID)', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      people: [
        {
          lastName: 'Einstein',
          firstName: 'Albert',
          affiliation: 'Princeton',
          comments: [{ name: 'Investigation Person ORCID', value: '0000-0001-2345-6789' }]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Investigation Person Comment [Investigation Person ORCID]\t"0000-0001-2345-6789"');
  });

  // ==========================================
  // 5. Study-level comments
  // ==========================================
  it('should render Study-level comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          title: 'Arabidopsis Cold Response',
          comments: [{ name: 'Data Repository', value: 'e!DAL-PGP' }]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Comment [Data Repository]\t"e!DAL-PGP"');
  });

  // ==========================================
  // 6. Study Design Descriptor comments
  // ==========================================
  it('should render Study Design Descriptor comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          studyDesignDescriptors: [
            {
              annotationValue: 'parallel group design',
              comments: [{ name: 'Design Rationale', value: 'controlled comparison' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Design Comment [Design Rationale]\t"controlled comparison"');
  });

  // ==========================================
  // 7. Study Publication comments
  // ==========================================
  it('should render Study Publication comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          publications: [
            {
              doi: '10.5678/study',
              title: 'Study Paper',
              comments: [{ name: 'Supplementary Info', value: 'see appendix B' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Publication Comment [Supplementary Info]\t"see appendix B"');
  });

  // ==========================================
  // 8. Study Factor comments
  // ==========================================
  it('should render Study Factor comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          factors: [
            {
              factorName: 'Temperature',
              factorType: { annotationValue: 'physical quality' },
              comments: [{ name: 'Measurement Unit', value: 'Celsius' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Factor Comment [Measurement Unit]\t"Celsius"');
  });

  // ==========================================
  // 9. Study Protocol comments
  // ==========================================
  it('should render Study Protocol comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          protocols: [
            {
              name: 'extraction_01',
              protocolType: { annotationValue: 'sample extraction' },
              comments: [{ name: 'Validated By', value: 'QA Team' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Protocol Comment [Validated By]\t"QA Team"');
  });

  // ==========================================
  // 10. Study Contacts (People) comments
  // ==========================================
  it('should render Study Person comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          people: [
            {
              lastName: 'Franklin',
              firstName: 'Rosalind',
              comments: [{ name: 'Study Person ORCID', value: '0000-0002-1111-2222' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Person Comment [Study Person ORCID]\t"0000-0002-1111-2222"');
  });

  // ==========================================
  // 11. Study Assay comments
  // ==========================================
  it('should render Study Assay comments', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      studies: [
        {
          identifier: 's_001',
          assays: [
            {
              filename: 'a_metabolomics.txt',
              measurementType: { annotationValue: 'metabolite profiling' },
              comments: [{ name: 'Instrument Serial Number', value: 'ORB-4471' }]
            }
          ]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain('Study Assay Comment [Instrument Serial Number]\t"ORB-4471"');
  });

  // ==========================================
  // 12. Multiple items, differing comment name sets, aligned by index
  // ==========================================
  it('should align differing comment names across multiple items in the same section, filling gaps with empty cells', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      people: [
        {
          lastName: 'Einstein',
          firstName: 'Albert',
          comments: [{ name: 'ORCID', value: '0000-0001-2345-6789' }]
        },
        {
          lastName: 'Curie',
          firstName: 'Marie'
          // no comments -> should still produce an aligned, empty cell for 'ORCID'
        },
        {
          lastName: 'Franklin',
          firstName: 'Rosalind',
          comments: [{ name: 'ORCID', value: '0000-0002-1111-2222' }]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).toContain(
      'Investigation Person Comment [ORCID]\t"0000-0001-2345-6789"\t""\t"0000-0002-1111-2222"'
    );
  });

  // ==========================================
  // 13. No comments present anywhere -> no stray "Comment [" rows emitted
  // ==========================================
  it('should not emit any Comment [ rows when no comments are present in the source data', () => {
    const mockPayload: Partial<ISAInvestigationSchema> = {
      identifier: 'i_002',
      title: 'No Comments Here',
      people: [{ lastName: 'Doe', firstName: 'Jane' }],
      studies: [
        {
          identifier: 's_002',
          title: 'Plain Study',
          people: [{ lastName: 'Roe', firstName: 'Richard' }]
        }
      ]
    };

    const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

    expect(result).not.toContain('Comment [');
  });
});
