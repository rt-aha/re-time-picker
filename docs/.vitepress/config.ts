import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/re-time-picker/',
  title: 'Re Time Picker',
  description: 'A time-picker component base on vue 3 with typescript.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Doc', link: '/introduction/getting-started' },
    ],

    sidebar: [

      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started' },
        ],
      },
      {
        text: 'Features',
        items: [
          {
            text: 'Props',
            link: '/features/props',
          },
          {
            text: 'Slots',
            link: '/features/slots',
          },
          {
            text: 'Events',
            link: '/features/events',
          },
          {
            text: 'Style',
            link: '/features/style',
          },
        ],
      },
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' },
      //   ],
      // },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rt-aha/re-time-picker' },
    ],
  },
});
