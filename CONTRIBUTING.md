# Contributing to isa4j

First off, thank you for taking the time to contribute! 🎉 

This project aims to bridge the gap between rich ISA-JSON models and legacy ISA-Tab spreadsheets with high fidelity. We love pull requests, bug reports, and suggestions.

---

## Development Setup

We use `pnpm` to manage dependencies and `vitest` for fast, reactive unit testing.

### Prerequisites
* **Node.js**: >= 18.x
* **pnpm**: >= 9.x

### Step-by-Step Environment Setup

1. **Fork and Clone the Repo**
   ```bash
   git clone https://github.com/your-username/isa4js.git
   cd isa4js
   ```
1. **Install Dependencies**
   ```bash
   pnpm install
   ```
1. **Run the Test Suite**
   Keep the tests running in watch mode while you write code:
   ```bash
   pnpm run test
   ```

## Project Structure 

- `src/mappers/investigation.ts`: Handles metadata parsing for the Investigation sheet.
- `src/utils/graph.ts`: Contains the FlowGraph DAG parser. It is responsible for identifying root and leaf nodes and tracing correct paths.
- `src/mappers/table.ts`: Translates graph paths into actual sequential column headers and matches rows of cells.src/index.ts: The entry point exporting JSZip bindings and TSV generation helpers.
-  `tests/`: Home of the Vitest unit tests.

## Mapping Rules & Guidelines

When implementing updates to the Study or Assay table mappers, remember to follow these standard ISA-Tab design patterns:

1. **Node Classifications**

The `FlowGraph` must classify material nodes based on where they are declared in the `tableData.materials` object:
- `tableData.materials.sources` $\rightarrow$ Source Name
- `tableData.materials.samples` $\rightarrow$ Sample Name
- `tableData.materials.otherMaterials` $\rightarrow$ Reads dynamic property type (e.g., Extract Name, Labeled Extract Name)

2. **Column Headers**

- Column headers must be sequentially aligned (`Node` $\rightarrow$ `Protocol` $\rightarrow$ `Node`).
- All ontology expansion columns (e.g., `Term Accession Number`, `Term Source REF`) must immediately follow their primary anchor column (`Characteristics [...]` or `Parameter Value [...]`).

## Submitting a Pull Request

1. **Create a branch** for your work: 
    ```bash
    git checkout -b feature/my-new-feature 
    # or 
    git checkout -b fix/bug-description
    ```
1. **Write tests** covering any new behavior in `tests/`.
1. **Verify all tests pass** locally: 
    ```bash
    pnpm exec vitest run
    ```
1. **Add your name** to the authors array in `CITATION.cff`:
   ```
    authors:
    - given-names: Manuel
        family-names: Feser
        email: feser@ipk-gatersleben.de
        affiliation: >-
        Leibniz Institute of Plant Genetics and Crop Plant
        Research (IPK) Gatersleben
        orcid: 'https://orcid.org/0000-0001-6546-1818'
   ```
1. **Commit your changes** using clean commit messages: 
    ```bash
    git commit -m "feat: add support for factor values"
    ```
1. **Push to your fork** and submit a Pull Request to our master/main branch.

## Continuous Integration (CI)

Our GitHub Actions workflow runs the test suite on every single commit and pull request. Ensure that your tests pass on local runs before pushing your branch.