// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import { describe, it, expect } from 'vitest';
import { FlowGraph } from '../src/utils/graph.js';
import { determineHeaders, convertTable } from '../src/mappers/table.js';

describe('Table Graph and Header Utility Tests', () => {

  // ==========================================
  // STUDY SUITE
  // ==========================================
  describe('Study Flow mapping', () => {
    const mockStudyPayload = {
      materials: {
        sources: [
          { "@id": "source_1", name: "Source-01" }
        ],
        samples: [
          { "@id": "sample_1", name: "Sample-01" }
        ],
        otherMaterials: [
          { "@id": "extract_1", name: "Extract-01", type: "Extract Name" }
        ]
      },
      processSequence: [
        {
          "@id": "proc_1",
          executesProtocol: { name: "sample collection" },
          inputs: [
            {
              "@id": "source_1",
              name: "Source-01",
              type: "Material",
              characteristics: [
                {
                  category: {
                    characteristicType: { annotationValue: "organism" }
                  },
                  value: {
                    annotationValue: "Homo sapiens",
                    termAccession: "NCBITaxon:9606",
                    termSource: "NCBITaxon"
                  }
                }
              ]
            }
          ],
          outputs: [
            {
              "@id": "sample_1",
              name: "Sample-01",
              type: "Material"
            }
          ]
        },
        {
          "@id": "proc_2",
          executesProtocol: { name: "extraction" },
          inputs: [
            {
              "@id": "sample_1",
              name: "Sample-01",
              type: "Material"
            }
          ],
          outputs: [
            {
              "@id": "extract_1",
              name: "Extract-01",
              type: "Material"
            }
          ],
          parameterValues: [
            {
              category: {
                parameterName: { annotationValue: "solvent" }
              },
              value: {
                annotationValue: "Methanol",
                termAccession: "CHEBI:17790",
                termSource: "ChEBI"
              }
            }
          ]
        }
      ]
    };

    it('should correctly identify study roots, leaves, and resolve their real ISA-Tab Node Types', () => {
      const graph = new FlowGraph(mockStudyPayload);
      const roots = graph.getRoots();
      const leaves = graph.getLeaves();

      expect(roots.map(r => r.id)).toEqual(['source_1']);
      expect(roots[0].nodeType).toBe('Source Name');

      expect(leaves.map(l => l.id)).toEqual(['extract_1']);
      expect(leaves[0].nodeType).toBe('Extract Name');
    });

    it('should generate study headers in sequential order matching the flow path', () => {
      const headers = determineHeaders(mockStudyPayload as any);

      expect(headers).toEqual([
        'Source Name',
        'Characteristics [organism]',
        'Term Accession Number',
        'Term Source REF',
        'Protocol REF',
        'Sample Name',
        'Protocol REF',
        'Parameter Value [solvent]',
        'Term Accession Number',
        'Term Source REF',
        'Extract Name'
      ]);
    });

    it('should cleanly compile the study path to an ISA-Tab TSV with quoted cell values', () => {
      const result = convertTable(mockStudyPayload as any);
      const lines = result.split('\n');

      expect(lines.length).toBe(2);
      expect(lines[0]).toContain('Source Name\tCharacteristics [organism]\tTerm Accession Number\tTerm Source REF');
      expect(lines[1]).toBe(
        `"Source-01"\t"Homo sapiens"\t"NCBITaxon:9606"\t"NCBITaxon"\t"sample collection"\t"Sample-01"\t"extraction"\t"Methanol"\t"CHEBI:17790"\t"ChEBI"\t"Extract-01"`
      );
    });
  });

  // ==========================================
  // ASSAY SUITE (Data File Leaf Node)
  // ==========================================
  describe('Assay Flow with Raw Data File Leaf Node mapping', () => {
    const mockAssayPayload = {
      materials: {
        samples: [
          { "@id": "sample_1", name: "Sample-01" }
        ]
      },
      processSequence: [
        {
          "@id": "proc_assay_1",
          executesProtocol: { name: "nucleic acid sequencing" },
          inputs: [
            {
              "@id": "sample_1",
              name: "Sample-01",
              type: "Material"
            }
          ],
          outputs: [
            {
              "@id": "raw_data_1",
              name: "sequencing_runs_R1.fastq.gz",
              type: "Raw Data File" // Explicit type definition for the file
            }
          ],
          parameterValues: [
            {
              category: {
                parameterName: { annotationValue: "sequencing instrument" }
              },
              value: {
                annotationValue: "Illumina NovaSeq 6000",
                termAccession: "TXID:2120138",
                termSource: "NCBI"
              }
            }
          ]
        }
      ]
    };

    it('should correctly resolve a Raw Data File as the graph leaf node and use its specific type', () => {
      const graph = new FlowGraph(mockAssayPayload);
      const roots = graph.getRoots();
      const leaves = graph.getLeaves();

      expect(roots.map(r => r.id)).toEqual(['sample_1']);
      expect(roots[0].nodeType).toBe('Sample Name');

      expect(leaves.map(l => l.id)).toEqual(['raw_data_1']);
      expect(leaves[0].nodeType).toBe('Raw Data File');
    });

    it('should generate assay headers with the Raw Data File header name', () => {
      const headers = determineHeaders(mockAssayPayload as any);

      expect(headers).toEqual([
        'Sample Name',
        'Protocol REF',
        'Parameter Value [sequencing instrument]',
        'Term Accession Number',
        'Term Source REF',
        'Raw Data File'
      ]);
    });

    it('should compile the assay path with the leaf data file name included', () => {
      const result = convertTable(mockAssayPayload as any);
      const lines = result.split('\n');

      expect(lines.length).toBe(2);
      expect(lines[0]).toBe(
        'Sample Name\tProtocol REF\tParameter Value [sequencing instrument]\tTerm Accession Number\tTerm Source REF\tRaw Data File'
      );
      expect(lines[1]).toBe(
        `"Sample-01"\t"nucleic acid sequencing"\t"Illumina NovaSeq 6000"\t"TXID:2120138"\t"NCBI"\t"sequencing_runs_R1.fastq.gz"`
      );
    });
  });
});
