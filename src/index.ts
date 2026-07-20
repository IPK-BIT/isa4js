// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import JSZip from 'jszip';
import { ISAInvestigationSchema } from './types/isa.js';
import { convertInvestigation } from './mappers/investigation.js';
import { convertTable } from './mappers/table.js';

export interface ISATabFiles {
  [filename: string]: string;
}
export type * from './types/isa.js';

/**
 * Helper to convert ISA-JSON to an in-memory dictionary of file names and content.
 */
export function convertIsaJsonToIsaTab(isaJson: ISAInvestigationSchema): ISATabFiles {
  const files: ISATabFiles = {};

  // 1. Generate the i_investigation.txt file
  files['i_investigation.txt'] = convertInvestigation(isaJson);

  // 2. Process and generate each s_*.txt Study and a_*.txt Assay spreadsheet file
  if (isaJson.studies && isaJson.studies.length > 0) {
    isaJson.studies.forEach((study, index) => {
      // Determine the filename for the Study table (falling back to study_index if no identifier)
      const studyFilename = `s_${study.identifier || `study_${index}`}.txt`;

      // Generate real TSV data for the Study file using our FlowGraph table mapper
      files[studyFilename] = convertTable(study);

      if (study.assays && study.assays.length > 0) {
        study.assays.forEach((assay, assayIdx) => {
          // Determine the filename for the Assay table
          const assayFilename = assay.filename || `a_${study.identifier || `study_${index}`}_assay_${assayIdx}.txt`;

          // Generate real TSV data for the Assay file using our FlowGraph table mapper
          files[assayFilename] = convertTable(assay);
        });
      }
    });
  }

  return files;
}

/**
 * Converts a complete ISA-JSON structure into a single ZIP archive containing the ISA-Tab files.
 *
 * @param isaJson The parsed ISA-JSON Investigation object.
 * @param type The output format for JSZip ('blob' for browser, 'nodebuffer' or 'uint8array' for Node.js).
 * @returns A promise resolving to the requested zip format.
 */
export async function convertIsaJsonToZip(
  isaJson: ISAInvestigationSchema,
  type: 'blob' | 'uint8array' | 'nodebuffer' = 'blob'
): Promise<Blob | Uint8Array | Buffer> {
  const zip = new JSZip();
  const isaTabFiles = convertIsaJsonToIsaTab(isaJson);

  // Add each generated ISA-Tab text file to the zip structure
  for (const [filename, content] of Object.entries(isaTabFiles)) {
    zip.file(filename, content);
  }

  // Generate the zip archive in memory
  return await zip.generateAsync({
    type,
    compression: 'DEFLATE',
    compressionOptions: { level: 9 } // Maximum compression
  });
}
