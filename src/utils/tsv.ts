// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: ISC

/**
 * Quotes a value for use as a TSV field, escaping embedded double quotes
 * by doubling them (matching the CSV/TSV quoting convention expected by
 * downstream ISA-Tab tooling such as Python's csv module).
 */
export function quoteCell(value: unknown): string {
  const str = value === undefined || value === null ? '' : String(value);
  return `"${str.replace(/"/g, '""')}"`;
}
