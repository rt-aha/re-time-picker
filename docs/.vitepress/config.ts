import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Re Time Picker Doc',
  description: 'A time-picker component base on vue 3 with typescript.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [

      {
        text: 'Introduction',
        items: [
          { text: 'Getting Start', link: '/introduction/getting-start' },
        ],
      },
      {
        text: 'Features',
        items: [
          {
            text: 'Props',
            link: '/props/index.md',
          },
          {
            text: 'Slots',
            link: '/slots/index.md',
          },
          {
            text: 'Events',
            link: '/events/index.md',
          },
        ],
      },

      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },

    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
});
