import { compileFromFile } from 'json-schema-to-typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypes() {
  const schemaPath = path.resolve(__dirname, '../schemas/investigation_schema.json');
  const outputPath = path.resolve(__dirname, '../src/types/isa.d.ts');

  console.log('Generating TS interfaces from ISA-JSON schemas...');

  try {
    const ts = await compileFromFile(schemaPath, {
      cwd: path.resolve(__dirname, '../schemas'), // Resolve references in schemas/
      declareExternallyReferenced: true,          // Inline child references
      bannerComment: `/* eslint-disable */\n/**\n * This file was automatically generated.\n * DO NOT MODIFY IT BY HAND. Run "npm run generate-types" instead.\n */`
    });

    // Ensure types folder exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, ts);
    
    console.log(`Successfully generated types at: ${outputPath}`);
  } catch (error) {
    console.error('Failed to generate types:', error);
    process.exit(1);
  }
}

generateTypes();