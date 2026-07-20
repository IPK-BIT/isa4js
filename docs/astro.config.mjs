// SPDX-FileCopyrightText: 2026 Manuel Feser <feser@ipk-gatersleben.de>
// SPDX-License-Identifier: CC-BY-4.0

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

export default defineConfig({
  base: '/isa4js',
  integrations: [
    starlight({
      title: 'isa4js',
      social: [
		    { icon: 'github', href: 'https://github.com/ipk-bit/isa4js', label: 'GitHub' },
	    ],
      plugins: [
        // Generate TS API docs cleanly into Markdown files inside Astro
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'], // Points back to your root package source
          tsconfig: '../tsconfig.json',    // Points back to your root tsconfig
          output: 'api',                    // Groups generated docs into a /api/ directory
        }),
      ],
      sidebar: [
        {
          label: 'Guides',
          items: [{ autogenerate: { directory: 'guides' } }],
        },
        {
          label: 'Reference Specifications', // Information-oriented (The exact machinery rules)
          items: [{ autogenerate: { directory: 'reference' } }],
        },
        // Injects the automatically generated API sidebar items right here
        typeDocSidebarGroup,
      ],
    }),
  ],
});
