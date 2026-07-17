// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

export interface GraphNode {
  id: string;
  name: string;
  nodeType: string; // 'Source Name', 'Sample Name', 'Extract Name', 'Raw Data File', etc.
  rawEntity: any;   // The full underlying JSON entity
}

export interface ProcessEdge {
  protocolName: string;
  inputs: string[];  // Node IDs
  outputs: string[]; // Node IDs
  rawProcess: any;
}

export class FlowGraph {
  nodes = new Map<string, GraphNode>();
  edges: ProcessEdge[] = [];

  // Adjacency mapping for traversal
  outgoing = new Map<string, { edge: ProcessEdge; targetId: string }[]>();
  incoming = new Map<string, { edge: ProcessEdge; sourceId: string }[]>();

  constructor(tableData: any) {
    this.buildGraph(tableData);
  }

  private buildGraph(tableData: any) {
    const processSequence = tableData.processSequence || [];

    // Pre-classify material types by looking in both tableData.materials.* and tableData.*
    const sourceIds = new Set<string>();
    const sampleIds = new Set<string>();
    const otherMaterialsMap = new Map<string, string>(); // ID -> Material Type (e.g., 'Extract Name')

    // 1. Resolve Sources
    const rawSources = tableData.materials?.sources || tableData.sources || [];
    rawSources.forEach((s: any) => {
      if (s['@id']) sourceIds.add(s['@id']);
      if (s.name) sourceIds.add(s.name);
    });

    // 2. Resolve Samples
    const rawSamples = tableData.materials?.samples || tableData.samples || [];
    rawSamples.forEach((s: any) => {
      if (s['@id']) sampleIds.add(s['@id']);
      if (s.name) sampleIds.add(s.name);
    });

    // 3. Resolve Other Materials (e.g., Extract Name, Labeled Extract Name)
    const rawOtherMaterials = tableData.materials?.otherMaterials || tableData.otherMaterials || [];
    rawOtherMaterials.forEach((m: any) => {
      const id = m['@id'] || m.name;
      if (id) {
        otherMaterialsMap.set(id, m.type || 'Extract Name');
      }
    });

    // Helper to resolve the correct ISA-Tab node type
    const determineNodeType = (entity: any): string => {
      const id = entity['@id'] || entity.name;

      // 1. Check data files (usually explicitly labeled in their type, e.g., 'Raw Data File')
      if (entity.type && entity.type.toLowerCase().includes('data file')) {
        return entity.type;
      }

      // 2. Resolve mapped material nodes
      if (id) {
        if (sourceIds.has(id)) return 'Source Name';
        if (sampleIds.has(id)) return 'Sample Name';
        if (otherMaterialsMap.has(id)) return otherMaterialsMap.get(id)!;
      }

      // Default fallback
      return 'Material';
    };

    for (const proc of processSequence) {
      const protocolName = proc.executesProtocol?.name || 'Unknown Protocol';

      const inputIds: string[] = [];
      const outputIds: string[] = [];

      // Process inputs
      for (const input of proc.inputs || []) {
        const id = input['@id'] || input.name;
        if (id) {
          inputIds.push(id);
          if (!this.nodes.has(id)) {
            this.nodes.set(id, {
              id,
              name: input.name || '',
              nodeType: determineNodeType(input),
              rawEntity: input
            });
          }
        }
      }

      // Process outputs
      for (const output of proc.outputs || []) {
        const id = output['@id'] || output.name;
        if (id) {
          outputIds.push(id);
          if (!this.nodes.has(id)) {
            this.nodes.set(id, {
              id,
              name: output.name || '',
              nodeType: determineNodeType(output),
              rawEntity: output
            });
          }
        }
      }

      // Record the edge
      const edge: ProcessEdge = {
        protocolName,
        inputs: inputIds,
        outputs: outputIds,
        rawProcess: proc
      };
      this.edges.push(edge);

      // Build adjacencies
      for (const inId of inputIds) {
        for (const outId of outputIds) {
          if (!this.outgoing.has(inId)) this.outgoing.set(inId, []);
          this.outgoing.get(inId)!.push({ edge, targetId: outId });

          if (!this.incoming.has(outId)) this.incoming.set(outId, []);
          this.incoming.get(outId)!.push({ edge, sourceId: inId });
        }
      }
    }
  }

  getRoots(): GraphNode[] {
    return Array.from(this.nodes.values()).filter(node => {
      const inEdges = this.incoming.get(node.id) || [];
      return inEdges.length === 0;
    });
  }

  getLeaves(): GraphNode[] {
    return Array.from(this.nodes.values()).filter(node => {
      const outEdges = this.outgoing.get(node.id) || [];
      return outEdges.length === 0;
    });
  }

  getLinearSequences(): any[][] {
    const paths: any[][] = [];
    const roots = this.getRoots();

    const dfs = (currentNodeId: string, currentPath: any[]) => {
      const node = this.nodes.get(currentNodeId)!;
      const nextSteps = this.outgoing.get(currentNodeId) || [];

      if (nextSteps.length === 0) {
        paths.push([...currentPath, { type: 'node', data: node }]);
        return;
      }

      for (const step of nextSteps) {
        dfs(step.targetId, [
          ...currentPath,
          { type: 'node', data: node },
          { type: 'protocol', data: step.edge }
        ]);
      }
    };

    for (const root of roots) {
      dfs(root.id, []);
    }

    return paths;
  }
}
