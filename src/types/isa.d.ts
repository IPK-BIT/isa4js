/* eslint-disable */
/**
 * This file was automatically generated.
 * DO NOT MODIFY IT BY HAND. Run "npm run generate-types" instead.
 */

/**
 * JSON-schema representing an ISA mode Investigation object
 */
export interface ISAInvestigationSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Investigation";
  filename?: string;
  identifier?: string;
  title?: string;
  description?: string;
  submissionDate?: string;
  publicReleaseDate?: string;
  ontologySourceReferences?: ISAOntologySourceReferenceSchema[];
  publications?: ISAPublicationSchema[];
  people?: ISAPersonSchema[];
  studies?: ISAStudyJSONSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model ontology reference object
 */
export interface ISAOntologySourceReferenceSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "OntologySourceReference";
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
  description?: string;
  file?: string;
  name?: string;
  version?: string;
}
/**
 * JSON-schema representing an ISA model Comment object
 */
export interface ISACommentSchemaItCorrespondsToISACommentConstruct {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Comment";
  name?: string;
  value?: string;
}
/**
 * JSON-schema representing an ISA model Publication object
 */
export interface ISAPublicationSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Publication";
  pubMedID?: string;
  doi?: string;
  authorList?: string;
  title?: string;
  status?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Ontology Reference or annotation (for fields that are required to be ontology annotations)
 */
export interface ISAOntologyReferenceSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "OntologyAnnotation";
  annotationValue?: string | number;
  /**
   * The abbreviated ontology name. It should correspond to one of the sources as specified in the ontologySourceReference section of the Investigation.
   */
  termSource?: string;
  termAccession?: string;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Person Object
 */
export interface ISAPersonSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Person";
  lastName?: string;
  firstName?: string;
  midInitials?: string;
  email?: string | null;
  phone?: string;
  fax?: string;
  address?: string;
  affiliation?: string;
  roles?: ISAOntologyReferenceSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON Schema describing an ISA model Study object
 */
export interface ISAStudyJSONSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Study";
  filename?: string;
  identifier?: string;
  title?: string;
  description?: string;
  submissionDate?: string;
  publicReleaseDate?: string;
  publications?: ISAPublicationSchema[];
  people?: ISAPersonSchema[];
  studyDesignDescriptors?: ISAOntologyReferenceSchema[];
  protocols?: ISAProtocolSchema[];
  materials?: {
    sources?: ISASourceSchema[];
    samples?: ISASampleSchema[];
    otherMaterials?: ISAMaterialSchema[];
    [k: string]: unknown;
  };
  processSequence?: ISAProcessOrProtocolApplicationSchemaCorrespondsToProtocolREFColumnsInTheStudyAndAssayFiles[];
  assays?: ISAAssayJSONSchema[];
  factors?: ISAFactorSchema[];
  /**
   * List of all the characteristics categories (or material attributes) defined in the study, used to avoid duplication of their declaration when each material_attribute_value is created.
   */
  characteristicCategories?: ISAMaterialAttributeSchema1[];
  /**
   * List of all the units defined in the study, used to avoid duplication of their declaration when each value is created.
   */
  unitCategories?: ISAOntologyReferenceSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Protocol object
 */
export interface ISAProtocolSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Protocol";
  name?: string;
  protocolType?: ISAOntologyReferenceSchema;
  description?: string;
  uri?: string;
  version?: string;
  parameters?: ISAProtocolParameterSchema[];
  components?: {
    componentName?: string;
    componentType?: ISAOntologyReferenceSchema;
    comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
    [k: string]: unknown;
  }[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Protocol Parameter parameter object (i.e. category declared in the investigation file)
 */
export interface ISAProtocolParameterSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "ProtocolParameter";
  parameterName?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Source object (Sources are considered as the starting biological material used in a study)
 */
export interface ISASourceSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Source";
  name?: string;
  characteristics?: ISAMaterialAttributeSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model material attribute (or characteristic) value object
 */
export interface ISAMaterialAttributeSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "MaterialAttributeValue";
  category?: ISAMaterialAttributeSchema1;
  value?: ISAOntologyReferenceSchema | string | number;
  unit?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing a characteristics category (what appears between the brackets in Characteristics[]) in the ISA model
 */
export interface ISAMaterialAttributeSchema1 {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "MaterialAttribute";
  characteristicType?: ISAOntologyReferenceSchema;
}
/**
 * JSON-schema representing an ISA model Sample object (A sample represents a major output resulting from a protocol application other than the special case outputs of Extract or a Labeled Extract)
 */
export interface ISASampleSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Sample";
  name?: string;
  characteristics?: ISAMaterialAttributeSchema[];
  factorValues?: ISAFactorValueSchema[];
  derivesFrom?: ISASourceSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Factor Value object
 */
export interface ISAFactorValueSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "FactorValue";
  category?: ISAFactorSchema;
  value?: ISAOntologyReferenceSchema | string | number;
  unit?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Factor object
 */
export interface ISAFactorSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Factor";
  factorName?: string;
  factorType?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model material object, which is not a source or a sample (as they have specific schemas) - this will correspond to 'Extract Name', 'Labeled Extract Name'
 */
export interface ISAMaterialSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Material";
  name?: string;
  type?: "Extract Name" | "Labeled Extract Name";
  characteristics?: ISAMaterialAttributeSchema[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Process (protocol application) object
 */
export interface ISAProcessOrProtocolApplicationSchemaCorrespondsToProtocolREFColumnsInTheStudyAndAssayFiles {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Process";
  name?: string;
  executesProtocol?: ISAProtocolSchema;
  parameterValues?: ISAProcessParameterValueSchema[];
  performer?: string;
  date?: string;
  previousProcess?: ISAProcessOrProtocolApplicationSchemaCorrespondsToProtocolREFColumnsInTheStudyAndAssayFiles;
  nextProcess?: ISAProcessOrProtocolApplicationSchemaCorrespondsToProtocolREFColumnsInTheStudyAndAssayFiles;
  inputs?: (ISASourceSchema | ISASampleSchema | ISADataSchema | ISAMaterialSchema)[];
  outputs?: (ISASampleSchema | ISADataSchema | ISAMaterialSchema)[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Parameter Value (associated with a Protocol REF) object
 */
export interface ISAProcessParameterValueSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "ParameterValue";
  category?: ISAProtocolParameterSchema;
  value?: ISAOntologyReferenceSchema | string | number;
  unit?: ISAOntologyReferenceSchema;
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON-schema representing an ISA model Data object
 */
export interface ISADataSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Data";
  name?: string;
  type?:
    | "Raw Data File"
    | "Derived Data File"
    | "Image File"
    | "Acquisition Parameter Data File"
    | "Derived Spectral Data File"
    | "Protein Assignment File"
    | "Raw Spectral Data File"
    | "Peptide Assignment File"
    | "Array Data File"
    | "Derived Array Data File"
    | "Post Translational Modification Assignment File"
    | "Derived Array Data Matrix File"
    | "Free Induction Decay Data File"
    | "Metabolite Assignment File"
    | "Array Data Matrix File";
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
/**
 * JSON Schema describing an ISA model Assay object
 */
export interface ISAAssayJSONSchema {
  "@id"?: string;
  "@context"?: string;
  "@type"?: "Assay";
  filename?: string;
  measurementType?: ISAOntologyReferenceSchema;
  technologyType?: ISAOntologyReferenceSchema;
  technologyPlatform?: string;
  dataFiles?: ISADataSchema[];
  materials?: {
    samples?: ISASampleSchema[];
    otherMaterials?: ISAMaterialSchema[];
    [k: string]: unknown;
  };
  /**
   * List of all the characteristics categories (or material attributes) defined in the study, used to avoid duplication of their declaration when each material_attribute_value is created.
   */
  characteristicCategories?: ISAMaterialAttributeSchema1[];
  /**
   * List of all the unitsdefined in the study, used to avoid duplication of their declaration when each value is created.
   */
  unitCategories?: ISAOntologyReferenceSchema[];
  processSequence?: ISAProcessOrProtocolApplicationSchemaCorrespondsToProtocolREFColumnsInTheStudyAndAssayFiles[];
  comments?: ISACommentSchemaItCorrespondsToISACommentConstruct[];
}
