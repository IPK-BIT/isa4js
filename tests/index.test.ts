import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { convertIsaJsonToZip } from '../src/index.js';
import { ISAInvestigationSchema } from '../src/types/isa.js';

describe('convertIsaJsonToZip() Entry Point', () => {
  it('should compile ISA-Tab files, pack them into a ZIP, and contain expected sheets', async () => {
    const mockJson: ISAInvestigationSchema = {
      identifier: "i_global_01",
      title: "Zipped Experiment Suite",
      ontologySourceReferences: [],
      publications: [],
      people: [],
      studies: [
        {
          identifier: "study_beta",
          title: "Study Beta",
          studyDesignDescriptors: [],
          publications: [],
          factors: [],
          assays: [
            {
              filename: "a_transcriptomics.txt",
              measurementType: { annotationValue: "transcription profiling" }
            }
          ],
          protocols: [],
          people: []
        }
      ]
    };

    // Run the zip generator returning a Uint8Array
    const zipBuffer = await convertIsaJsonToZip(mockJson, 'uint8array') as Uint8Array;
    expect(zipBuffer).toBeInstanceOf(Uint8Array);
    expect(zipBuffer.length).toBeGreaterThan(0);

    // Read it back via JSZip to verify the internal file structure
    const loadedZip = await JSZip.loadAsync(zipBuffer);
    
    expect(loadedZip.files).toHaveProperty('i_investigation.txt');
    expect(loadedZip.files).toHaveProperty('s_study_beta.txt');
    expect(loadedZip.files).toHaveProperty('a_transcriptomics.txt');

    // Retrieve contents and assert investigation settings
    const investigationContent = await loadedZip.file('i_investigation.txt')?.async('string');
    expect(investigationContent).toContain('Study File Name\t"s_study_beta.txt"');
  });
});