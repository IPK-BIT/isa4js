// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

import { FlowGraph, GraphNode, ProcessEdge } from '../utils/graph.js';
import { ISAStudyJSONSchema, ISAAssayJSONSchema } from '../types/isa.js';

/**
 * Metadata configuration to keep track of how headers maps to path traversal.
 */
interface HeaderMapping {
  header: string;
  type: 'node' | 'protocol';
  nodeIndex: number;      // Which node in our linear path sequence this maps to
  protocolIndex?: number; // Which protocol edge this maps to (if type is 'protocol')
  extractor: (element: any) => string;
}

/**
 * Determines headers and compiles mapping instructions for row extraction.
 */
function buildHeaderMappings(longestSequence: any[]): { headers: string[]; mappings: HeaderMapping[] } {
  const headers: string[] = [];
  const mappings: HeaderMapping[] = [];

  let nodeCounter = 0;
  let protocolCounter = 0;

  for (const element of longestSequence) {
    if (element.type === 'node') {
      const currentNodeIdx = nodeCounter;

      // Node Column (e.g., "Source Name")
      headers.push(element.data.nodeType || 'Node Name');
      mappings.push({
        header: element.data.nodeType || 'Node Name',
        type: 'node',
        nodeIndex: currentNodeIdx,
        extractor: (node: GraphNode) => node.name || ''
      });

      // Extract Node Characteristics
      if (element.data.rawEntity.characteristics) {
        element.data.rawEntity.characteristics.forEach((char: any, charIdx: number) => {
          const category = char.category?.characteristicType?.annotationValue
            || char.category?.annotationValue
            || 'Unknown';

          // Characteristics Value
          const charHeader = `Characteristics [${category}]`;
          headers.push(charHeader);
          mappings.push({
            header: charHeader,
            type: 'node',
            nodeIndex: currentNodeIdx,
            extractor: (node: GraphNode) => node.rawEntity.characteristics?.[charIdx]?.value?.annotationValue || node.rawEntity.characteristics?.[charIdx]?.value || ''
          });

          // Characteristics Term Accession Number
          const tanHeader = `Term Accession Number`;
          headers.push(tanHeader);
          mappings.push({
            header: tanHeader,
            type: 'node',
            nodeIndex: currentNodeIdx,
            extractor: (node: GraphNode) => node.rawEntity.characteristics?.[charIdx]?.value?.termAccession || ''
          });

          // Characteristics Term Source REF
          const tsrHeader = `Term Source REF`;
          headers.push(tsrHeader);
          mappings.push({
            header: tsrHeader,
            type: 'node',
            nodeIndex: currentNodeIdx,
            extractor: (node: GraphNode) => node.rawEntity.characteristics?.[charIdx]?.value?.termSource || ''
          });
        });
      }

      // Extract Node Comments
      if (element.data.rawEntity.comments) {
        element.data.rawEntity.comments.forEach((comment: any, commIdx: number) => {
          const commHeader = `Comment [${comment.name}]`;
          headers.push(commHeader);
          mappings.push({
            header: commHeader,
            type: 'node',
            nodeIndex: currentNodeIdx,
            extractor: (node: GraphNode) => node.rawEntity.comments?.[commIdx]?.value || ''
          });
        });
      }

      nodeCounter++;
    } else if (element.type === 'protocol') {
      const currentProtoIdx = protocolCounter;

      // Protocol Column ("Protocol REF")
      headers.push('Protocol REF');
      mappings.push({
        header: 'Protocol REF',
        type: 'protocol',
        nodeIndex: nodeCounter - 1, // Associated with the preceding node
        protocolIndex: currentProtoIdx,
        extractor: (edge: ProcessEdge) => edge.protocolName || ''
      });

      // Extract Parameter Values
      if (element.data.rawProcess.parameterValues) {
        element.data.rawProcess.parameterValues.forEach((param: any, paramIdx: number) => {
          const paramName = param.category?.parameterName?.annotationValue || 'Unknown';

          // Parameter Value
          const paramHeader = `Parameter Value [${paramName}]`;
          headers.push(paramHeader);
          mappings.push({
            header: paramHeader,
            type: 'protocol',
            nodeIndex: nodeCounter - 1,
            protocolIndex: currentProtoIdx,
            extractor: (edge: ProcessEdge) => edge.rawProcess.parameterValues?.[paramIdx]?.value?.annotationValue || edge.rawProcess.parameterValues?.[paramIdx]?.value || ''
          });

          // Parameter Term Accession Number
          const tanHeader = `Term Accession Number`;
          headers.push(tanHeader);
          mappings.push({
            header: tanHeader,
            type: 'protocol',
            nodeIndex: nodeCounter - 1,
            protocolIndex: currentProtoIdx,
            extractor: (edge: ProcessEdge) => edge.rawProcess.parameterValues?.[paramIdx]?.value?.termAccession || ''
          });

          // Parameter Term Source REF
          const tsrHeader = `Term Source REF`;
          headers.push(tsrHeader);
          mappings.push({
            header: tsrHeader,
            type: 'protocol',
            nodeIndex: nodeCounter - 1,
            protocolIndex: currentProtoIdx,
            extractor: (edge: ProcessEdge) => edge.rawProcess.parameterValues?.[paramIdx]?.value?.termSource || ''
          });
        });
      }

      protocolCounter++;
    }
  }

  return { headers, mappings };
}

/**
 * Determines headers sequentially based on the longest pathway in the DAG.
 */
export function determineHeaders(tableData: ISAStudyJSONSchema | ISAAssayJSONSchema): string[] {
  const processSequence = tableData.processSequence || [];
  if (processSequence.length === 0) return [];

  // Pass the full tableData object
  const graph = new FlowGraph(tableData);
  const sequences = graph.getLinearSequences();
  if (sequences.length === 0) return [];

  const longestSequence = sequences.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  , sequences[0]);

  return buildHeaderMappings(longestSequence).headers;
}

/**
 * Main conversion function. Translates Study/Assay JSON records into horizontal TSV structures.
 */
export function convertTable(tableData: ISAStudyJSONSchema | ISAAssayJSONSchema): string {
  const processSequence = tableData.processSequence || [];
  if (processSequence.length === 0) return '';

  // Pass the full tableData object
  const graph = new FlowGraph(tableData);
  const sequences = graph.getLinearSequences();
  if (sequences.length === 0) return '';

  // 1. Identify the longest sequence structure to define our column architecture
  const longestSequence = sequences.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  , sequences[0]);

  const { headers, mappings } = buildHeaderMappings(longestSequence);

  // 2. Map every linear path onto our columns to generate the table rows
  const rows: string[][] = [];

  for (const path of sequences) {
    const rowValues: string[] = [];

    // Separate nodes and protocols in the current path for easy structural access
    const pathNodes = path.filter(el => el.type === 'node').map(el => el.data);
    const pathProtos = path.filter(el => el.type === 'protocol').map(el => el.data);

    for (const mapping of mappings) {
      if (mapping.type === 'node') {
        const node = pathNodes[mapping.nodeIndex];
        rowValues.push(node ? mapping.extractor(node) : '');
      } else if (mapping.type === 'protocol') {
        // Fallback checks for optional intermediary edges
        const edge = mapping.protocolIndex !== undefined ? pathProtos[mapping.protocolIndex] : undefined;
        rowValues.push(edge ? mapping.extractor(edge) : '');
      }
    }

    rows.push(rowValues);
  }

  // 3. Compile the resulting arrays into double-quote wrapped, tab-delimited values
  const headerRow = headers.join('\t');
  const bodyRows = rows.map(row => row.map(cell => `"${cell}"`).join('\t')).join('\n');

  return `${headerRow}\n${bodyRows}`;
}
