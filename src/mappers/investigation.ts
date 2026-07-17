import { ISAInvestigationSchema } from '../types/isa.js';

/**
 * Extracts a value from a potentially nested ISA-JSON field.
 * Handles strings, numbers, nested Ontology Annotation objects, or arrays of annotations.
 */
export function extractValue(obj: any, path: string): string {
  if (obj === null || obj === undefined) return '';

  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // If we encounter an array, map the remaining path over its items and join with "; "
    if (Array.isArray(current)) {
      const remainingPath = parts.slice(i).join('.');
      return current
        .map(item => extractValue(item, remainingPath))
        .filter(Boolean)
        .join('; ');
    }

    if (current[part] === undefined || current[part] === null) return '';
    current = current[part];
  }

  // Handle arrays at the terminal node (fallback safety)
  if (Array.isArray(current)) {
    return current
      .map(item => (typeof item === 'object' && item !== null ? (item.annotationValue || '') : String(item)))
      .filter(Boolean)
      .join('; ');
  }

  // If the final value is an object, default to its annotationValue (e.g. for standard objects)
  return typeof current === 'object' && current !== null
    ? (current.annotationValue || '')
    : String(current);
}

/**
 * Transposes an array of objects into vertical keys and horizontal, tab-delimited values.
 */
export function transposeSection(
  sectionHeader: string,
  items: any[] | undefined,
  fields: { jsonKey: string; tabLabel: string }[]
): string {
  if (!items || items.length === 0) {
    return fields.map(field => `${sectionHeader} ${field.tabLabel}`).join('\n');
  }

  return fields.map(field => {
    const values = items
      .map(item => {
        const val = extractValue(item, field.jsonKey);
        return val !== undefined && val !== null && val !== '' ? `"${val}"` : '""';
      })
      .join('\t');
    
    return `${sectionHeader} ${field.tabLabel}\t${values}`;
  }).join('\n');
}
/**
 * Maps the complete ISA-JSON Investigation object to the i_investigation.txt string.
 */
export function convertInvestigation(isaJson: ISAInvestigationSchema): string {
  const sections: string[] = [];

  // =========================================================================
  // 1. ONTOLOGY SOURCE REFERENCE
  // =========================================================================
  sections.push('ONTOLOGY SOURCE REFERENCE');
  sections.push(transposeSection('Term Source', isaJson.ontologySourceReferences, [
    { jsonKey: 'name', tabLabel: 'Name' },
    { jsonKey: 'file', tabLabel: 'File' },
    { jsonKey: 'version', tabLabel: 'Version' },
    { jsonKey: 'description', tabLabel: 'Description' }
  ]));

  // =========================================================================
  // 2. INVESTIGATION METADATA
  // =========================================================================
  sections.push('INVESTIGATION');
  sections.push(`Investigation Identifier\t"${isaJson.identifier || ''}"`);
  sections.push(`Investigation Title\t"${isaJson.title || ''}"`);
  sections.push(`Investigation Description\t"${isaJson.description || ''}"`);
  sections.push(`Investigation Submission Date\t"${isaJson.submissionDate || ''}"`);
  sections.push(`Investigation Public Release Date\t"${isaJson.publicReleaseDate || ''}"`);

  // =========================================================================
  // 3. INVESTIGATION PUBLICATIONS
  // =========================================================================
  sections.push('INVESTIGATION PUBLICATIONS');
  sections.push(transposeSection('Investigation Publication', isaJson.publications, [
    { jsonKey: 'pubMedID', tabLabel: 'PubMed ID' },
    { jsonKey: 'doi', tabLabel: 'DOI' },
    { jsonKey: 'authorList', tabLabel: 'Author List' },
    { jsonKey: 'title', tabLabel: 'Title' },
    { jsonKey: 'status.annotationValue', tabLabel: 'Status' },
    { jsonKey: 'status.termAccession', tabLabel: 'Status Term Accession Number' },
    { jsonKey: 'status.termSource', tabLabel: 'Status Term Source REF' }
  ]));

  // =========================================================================
  // 4. INVESTIGATION CONTACTS
  // =========================================================================
  sections.push('INVESTIGATION CONTACTS');
  sections.push(transposeSection('Investigation Person', isaJson.people, [
    { jsonKey: 'lastName', tabLabel: 'Last Name' },
    { jsonKey: 'firstName', tabLabel: 'First Name' },
    { jsonKey: 'midInitials', tabLabel: 'Mid Initials' },
    { jsonKey: 'email', tabLabel: 'Email' },
    { jsonKey: 'phone', tabLabel: 'Phone' },
    { jsonKey: 'fax', tabLabel: 'Fax' },
    { jsonKey: 'address', tabLabel: 'Address' },
    { jsonKey: 'affiliation', tabLabel: 'Affiliation' },
    { jsonKey: 'roles.annotationValue', tabLabel: 'Roles' },
    { jsonKey: 'roles.termAccession', tabLabel: 'Roles Term Accession Number' },
    { jsonKey: 'roles.termSource', tabLabel: 'Roles Term Source REF' }
  ]));

  // =========================================================================
  // 5. STUDIES (The core loops)
  // =========================================================================
  if (isaJson.studies && isaJson.studies.length > 0) {
    isaJson.studies.forEach((study, index) => {
      // 5.1 Study Metadata
      sections.push('STUDY');
      sections.push(`Study Identifier\t"${study.identifier || ''}"`);
      sections.push(`Study Title\t"${study.title || ''}"`);
      sections.push(`Study Description\t"${study.description || ''}"`);
      sections.push(`Study Submission Date\t"${study.submissionDate || ''}"`);
      sections.push(`Study Public Release Date\t"${study.publicReleaseDate || ''}"`);
      sections.push(`Study File Name\t"s_${study.identifier || `study_${index}`}.txt"`);
      
      // 5.2 Study Design Descriptors
      sections.push('STUDY DESIGN DESCRIPTORS');
      sections.push(transposeSection('Study Design', study.studyDesignDescriptors, [
        { jsonKey: 'annotationValue', tabLabel: 'Type' },
        { jsonKey: 'annotationValue', tabLabel: 'Type Term Accesion Number' },
        { jsonKey: 'annotationValue', tabLabel: 'Type Term Source REF' }
      ]));
      
      // 5.3 Study Publications
      sections.push('STUDY PUBLICATIONS');
      sections.push(transposeSection('Study Publication', study.publications, [
        { jsonKey: 'pubMedID', tabLabel: 'PubMed ID' },
        { jsonKey: 'doi', tabLabel: 'DOI' },
        { jsonKey: 'authorList', tabLabel: 'Author List' },
        { jsonKey: 'title', tabLabel: 'Title' },
        { jsonKey: 'status.annotationValue', tabLabel: 'Status' },
        { jsonKey: 'status.termAccession', tabLabel: 'Status Term Accession Number' },
        { jsonKey: 'status.termSource', tabLabel: 'Status Term Source REF' }
      ]));
      
      // 5.4 Study Factors (Corrected to 'factorName' for ISA-JSON compatibility)
      sections.push('STUDY FACTORS');
      sections.push(transposeSection('Study Factor', study.factors, [
        { jsonKey: 'factorName', tabLabel: 'Name' },
        { jsonKey: 'factorType.annotationValue', tabLabel: 'Type' },
        { jsonKey: 'factorType.termAccession', tabLabel: 'Type Term Accession Number' },
        { jsonKey: 'factorType.termSource', tabLabel: 'Type Term Source REF' }
      ]));
      
      // 5.5 Study Assays
      sections.push('STUDY ASSAYS');
      sections.push(transposeSection('Study Assay', study.assays, [
        { jsonKey: 'filename', tabLabel: 'File Name' },
        { jsonKey: 'measurementType.annotationValue', tabLabel: 'Measurement Type' },
        { jsonKey: 'measurementType.termAccession', tabLabel: 'Measurement Type Term Accesion Number' },
        { jsonKey: 'measurementType.termSource', tabLabel: 'Measurement Type Term Source REF' },
        { jsonKey: 'technologyType.annotationValue', tabLabel: 'Technology Type' },
        { jsonKey: 'technologyType.termAccession', tabLabel: 'Technology Type Term Accesion Number' },
        { jsonKey: 'technologyType.termSource', tabLabel: 'Technology Type Term Source REF' },
        { jsonKey: 'technologyPlatform', tabLabel: 'Technology Platform' }
      ]));
      
      // 5.6 Study Protocols
      sections.push('STUDY PROTOCOLS');
      sections.push(transposeSection('Study Protocol', study.protocols, [
        { jsonKey: 'name', tabLabel: 'Name' },
        { jsonKey: 'protocolType.annotationValue', tabLabel: 'Type' },
        { jsonKey: 'protocolType.termAccession', tabLabel: 'Type Term Accesion Number' },
        { jsonKey: 'protocolType.termSource', tabLabel: 'Type Term Source REF' },
        { jsonKey: 'description', tabLabel: 'Description' },
        { jsonKey: 'uri', tabLabel: 'URI' },
        { jsonKey: 'version', tabLabel: 'Version' },
        { jsonKey: 'parameters.parameterName.annotationValue', tabLabel: 'Parameters Name' },
        { jsonKey: 'parameters.parameterName.termAccession', tabLabel: 'Parameters Term Accession Number' },
        { jsonKey: 'parameters.parameterName.termSource', tabLabel: 'Parameters Term Source REF' },
        { jsonKey: 'components.componentName', tabLabel: 'Components Name' },
        { jsonKey: 'components.componentType.annotationValue', tabLabel: 'Components Type' },
        { jsonKey: 'components.componentType.termAccession', tabLabel: 'Components Type Term Accession Number' },
        { jsonKey: 'components.componentType.termSource', tabLabel: 'Components Type Term Source REF' }
      ]));
      
      // 5.7 Study Contacts
      sections.push('STUDY CONTACTS');
      sections.push(transposeSection('Study Person', study.people, [
        { jsonKey: 'lastName', tabLabel: 'Last Name' },
        { jsonKey: 'firstName', tabLabel: 'First Name' },
        { jsonKey: 'midInitials', tabLabel: 'Mid Initials' },
        { jsonKey: 'email', tabLabel: 'Email' },
        { jsonKey: 'phone', tabLabel: 'Phone' },
        { jsonKey: 'fax', tabLabel: 'Fax' },
        { jsonKey: 'address', tabLabel: 'Address' },
        { jsonKey: 'affiliation', tabLabel: 'Affiliation' },
        { jsonKey: 'roles.annotationValue', tabLabel: 'Roles' },
        { jsonKey: 'roles.termAccession', tabLabel: 'Roles Term Accession Number' },
        { jsonKey: 'roles.termSource', tabLabel: 'Roles Term Source REF' }
      ]));
    });
  }

  return sections.join('\n');
}