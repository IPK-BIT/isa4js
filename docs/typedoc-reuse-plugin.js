// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
//
// SPDX-License-Identifier: CC-BY-4.0

import { PageEvent } from 'typedoc';

/**
 * @param {import('typedoc').Application} app
 */
export function load(app) {
  app.renderer.on(PageEvent.END, (page) => {
    if (page.contents) {
      const reuseHeader =
`<!--
SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>

SPDX-License-Identifier: CC-BY-4.0
-->\n\n`;

      page.contents = reuseHeader + page.contents;
    }
  });
}
