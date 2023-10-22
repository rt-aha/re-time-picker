import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Re Time Picker',
  description: 'A time-picker component base on vue 3 with typescript.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
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
            link: '/props/index',
          },
          {
            text: 'Slots',
            link: '/slots/index',
          },
          {
            text: 'Events',
            link: '/events/index',
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
