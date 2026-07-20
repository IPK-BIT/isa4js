// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import { compileFromFile } from 'json-schema-to-typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to convert strings like "ISA Comment schema" -> "ISACommentSchema"
function toPascalCase(str: string) {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase());
}

async function generateTypes() {
  const schemaPath = path.resolve(__dirname, '../schemas/investigation_schema.json');
  const outputPath = path.resolve(__dirname, '../src/types/isa.d.ts');

  console.log('Generating TS interfaces from ISA-JSON schemas...');

  try {
    const ts = await compileFromFile(schemaPath, {
      cwd: path.resolve(__dirname, '../schemas'),
      declareExternallyReferenced: true,
      // Custom naming rule to favor `name` over verbose `title`
      customName: (schema) => {
        if (schema.name) {
          return toPascalCase(schema.name);
        }
        // Fallback: strip descriptive suffixes from title if name isn't set
        if (schema.title) {
          const cleanTitle = schema.title.split('-')[0].trim();
          return toPascalCase(cleanTitle);
        }
      },
      bannerComment: [
        '// SPDX-File' + 'CopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>',
        '//',
        '// SPDX-License-' + 'Identifier: ISC',
        '',
        '/* eslint-disable */',
        '/**',
        ' * This file was automatically generated.',
        ' * DO NOT MODIFY IT BY HAND. Run "pnpm run generate-types" instead.',
        ' */'
      ].join('\n')
    });

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, ts);

    console.log(`Successfully generated types at: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate types:', error);
    process.exit(1);
  }
}

generateTypes();
