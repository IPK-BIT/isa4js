import { describe, it, expect } from 'vitest';
import { convertInvestigation, transposeSection, extractValue } from '../src/mappers/investigation.js';
import { ISAInvestigationSchema } from '../src/types/isa.js';

describe('Investigation Mapper Unit Tests', () => {

  // ==========================================
  // 1. extractValue() Helper Tests
  // ==========================================
  describe('extractValue()', () => {
    it('should extract simple flat values', () => {
      const obj = { name: 'NCBITaxon' };
      expect(extractValue(obj, 'name')).toBe('NCBITaxon');
    });

    it('should safely extract deeply nested properties', () => {
      const obj = { protocolType: { annotationValue: 'extraction' } };
      expect(extractValue(obj, 'protocolType.annotationValue')).toBe('extraction');
    });

    it('should automatically fall back to annotationValue if target is an object', () => {
      const obj = { factorType: { annotationValue: 'temperature' } };
      expect(extractValue(obj, 'factorType')).toBe('temperature');
    });

    it('should handle arrays of OntologyAnnotations (like roles) and join with a semicolon', () => {
      const obj = {
        roles: [
          { annotationValue: 'co-investigator' },
          { annotationValue: 'data curator' }
        ]
      };
      expect(extractValue(obj, 'roles')).toBe('co-investigator; data curator');
    });

    it('should extract deeply nested properties within arrays and join them with a semicolon', () => {
      const obj = {
        roles: [
          { termAccession: 'MS:1000582', termSource: 'PSI-MS' },
          { termAccession: 'MS:1000583', termSource: 'PSI-MS' }
        ]
      };
      expect(extractValue(obj, 'roles.termAccession')).toBe('MS:1000582; MS:1000583');
      expect(extractValue(obj, 'roles.termSource')).toBe('PSI-MS; PSI-MS');
    });

    it('should extract nested properties from objects inside arrays (like parameters)', () => {
      const obj = {
        parameters: [
          {
            parameterName: {
              annotationValue: 'light intensity',
              termAccession: 'UO_0000160',
              termSource: 'uo'
            }
          }
        ]
      };
      expect(extractValue(obj, 'parameters.parameterName.annotationValue')).toBe('light intensity');
      expect(extractValue(obj, 'parameters.parameterName.termAccession')).toBe('UO_0000160');
      expect(extractValue(obj, 'parameters.parameterName.termSource')).toBe('uo');
    });

    it('should return empty string for undefined paths or null values', () => {
      const obj = { name: null };
      expect(extractValue(obj, 'name')).toBe('');
      expect(extractValue(obj, 'nonExistentPath.child')).toBe('');
    });
  });

  // ==========================================
  // 2. transposeSection() Helper Tests
  // ==========================================
  describe('transposeSection()', () => {
    it('should convert an array of objects into tab-separated rows using jsonKey', () => {
      const mockOntologies = [
        { name: 'NCBITaxon', file: 'ncbi.owl' },
        { name: 'UO', file: 'uo.owl' }
      ];

      const fields = [
        { jsonKey: 'name', tabLabel: 'Name' },
        { jsonKey: 'file', tabLabel: 'File' }
      ];

      const result = transposeSection('Term Source', mockOntologies, fields);

      const expected = [
        'Term Source Name\t"NCBITaxon"\t"UO"',
        'Term Source File\t"ncbi.owl"\t"uo.owl"'
      ].join('\n');

      expect(result).toBe(expected);
    });
  });

  // ==========================================
  // 3. convertInvestigation() Main Loop Tests
  // ==========================================
  describe('convertInvestigation()', () => {
    it('should correctly build and format all required sections, detecting deviations in publication status, contact roles, and protocol definitions', () => {
      const mockPayload: Partial<ISAInvestigationSchema> = {
        identifier: "i_001",
        title: "Global Stress Responses",
        description: "Sandbox run simulating environmental stress",
        submissionDate: "2026-07-15",
        ontologySourceReferences: [
          { name: "NCBITaxon", file: "ncbi.owl" }
        ],
        publications: [
          { 
            doi: "10.1234/parent", 
            title: "Investigation Paper", 
            authorList: "Author A",
            status: {
              annotationValue: "published",
              termAccession: "EFO:0001234",
              termSource: "EFO"
            }
          }
        ],
        people: [
          { 
            lastName: "Einstein", 
            firstName: "Albert", 
            affiliation: "Princeton",
            roles: [
              { 
                annotationValue: "principal investigator",
                termAccession: "MS:1000582",
                termSource: "PSI-MS"
              }
            ]
          }
        ],
        studies: [
          {
            identifier: "s_001",
            title: "Arabidopsis Cold Response",
            description: "Study tracking freezing stressors",
            submissionDate: "2026-07-15",
            publicReleaseDate: "2026-12-31",
            studyDesignDescriptors: [{ annotationValue: "parallel group design" }],
            publications: [
              { doi: "10.5678/study", title: "Study Paper", authorList: "Author B" }
            ],
            factors: [
              { factorName: "Temperature", factorType: { annotationValue: "physical quality" } }
            ],
            assays: [
              { 
                filename: "a_metabolomics.txt", 
                measurementType: { annotationValue: "metabolite profiling" },
                technologyType: { annotationValue: "mass spectrometry" },
                technologyPlatform: "Orbitrap"
              }
            ],
            protocols: [
              { 
                name: "extraction_01", 
                protocolType: { annotationValue: "sample extraction" },
                description: "Methanol extraction process",
                uri: "http://protocols.io/ext",
                version: "v1.0",
                parameters: [
                  {
                    parameterName: {
                      annotationValue: "extraction temperature",
                      termAccession: "NCIT:C25206",
                      termSource: "NCIT"
                    }
                  }
                ],
                components: [
                  {
                    componentName: "centrifuge",
                    componentType: {
                      annotationValue: "instrument",
                      termAccession: "NCIT:C12345",
                      termSource: "NCIT"
                    }
                  }
                ]
              }
            ],
            people: [
              { 
                lastName: "Franklin", 
                firstName: "Rosalind", 
                email: "rosalind@example.com", 
                affiliation: "King's College",
                roles: [
                  { 
                    annotationValue: "co-investigator",
                    termAccession: "MS:1000583",
                    termSource: "PSI-MS"
                  }
                ]
              }
            ]
          }
        ]
      };

      const result = convertInvestigation(mockPayload as ISAInvestigationSchema);

      // --- SECTION HEADER VERIFICATIONS ---
      expect(result).toContain('STUDY PROTOCOLS');
      expect(result).toContain('STUDY FACTORS');
      expect(result).toContain('STUDY CONTACTS');

      // --- INVESTIGATION PUBLICATIONS TRANSPOSED VALUES (NESTED STATUS TEST) ---
      expect(result).toContain('Investigation Publication Status\t"published"');
      expect(result).toContain('Investigation Publication Status Term Accession Number\t"EFO:0001234"');
      expect(result).toContain('Investigation Publication Status Term Source REF\t"EFO"');

      // --- INVESTIGATION CONTACTS TRANSPOSED VALUES (ROLE TAN / TSR TEST) ---
      expect(result).toContain('Investigation Person Roles\t"principal investigator"');
      expect(result).toContain('Investigation Person Roles Term Accession Number\t"MS:1000582"');
      expect(result).toContain('Investigation Person Roles Term Source REF\t"PSI-MS"');

      // --- STUDY CONTACTS TRANSPOSED VALUES (ROLE TAN / TSR TEST) ---
      expect(result).toContain('Study Person Roles\t"co-investigator"');
      expect(result).toContain('Study Person Roles Term Accession Number\t"MS:1000583"');
      expect(result).toContain('Study Person Roles Term Source REF\t"PSI-MS"');

      // --- STUDY FACTORS TRANSPOSED VALUES ---
      expect(result).toContain('Study Factor Name\t"Temperature"');
      expect(result).toContain('Study Factor Type\t"physical quality"');

      // --- STUDY PROTOCOLS COMPREHENSIVE SPEC VERIFICATIONS ---
      // Standard Protocol Details
      expect(result).toContain('Study Protocol Name\t"extraction_01"');
      expect(result).toContain('Study Protocol Type\t"sample extraction"');
      expect(result).toContain('Study Protocol Description\t"Methanol extraction process"');
      expect(result).toContain('Study Protocol URI\t"http://protocols.io/ext"');
      expect(result).toContain('Study Protocol Version\t"v1.0"');

      // Parameters Array Details (Correctly Transposed)
      expect(result).toContain('Study Protocol Parameters Name\t"extraction temperature"');
      expect(result).toContain('Study Protocol Parameters Term Accession Number\t"NCIT:C25206"');
      expect(result).toContain('Study Protocol Parameters Term Source REF\t"NCIT"');

      // Components Array Details (Correctly Transposed)
      expect(result).toContain('Study Protocol Components Name\t"centrifuge"');
      expect(result).toContain('Study Protocol Components Type\t"instrument"');
      expect(result).toContain('Study Protocol Components Type Term Accession Number\t"NCIT:C12345"');
      expect(result).toContain('Study Protocol Components Type Term Source REF\t"NCIT"');
    });
  });
});