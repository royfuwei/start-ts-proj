import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'start-ts-by',
  description: 'Scaffold TypeScript projects with templates.',
  base: process.env.VITEPRESS_BASE || '/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Home', link: '/' }],

    sidebar: [
      /* {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      }, */
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/royfuwei/start-ts-by' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/start-ts-by' },
    ],
  },
});
