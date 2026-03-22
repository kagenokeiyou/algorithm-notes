import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar'

export default defineConfig(
  withSidebar(
    {
      vite: {
        plugins: [tailwindcss()],
      },

      title: 'Algorithm Notes',
      description: 'My Algorithm Notes',
      lang: 'zh-CN',
      base: '/algorithm-notes/',
      head: [['link', { rel: 'icon', href: '/algorithm-notes/avatar.png' }]],
      appearance: 'force-dark',
      cleanUrls: true,
      lastUpdated: true,

      themeConfig: {
        logo: '/avatar.png',
        search: {
          provider: 'local',
        },
        outline: {
          level: 'deep',
        },
        nav: [
          { text: '开始', link: '/start/index.md' },
          { text: '排序', link: '/sorting/sorting-algorithm.md' },
        ],
        socialLinks: [{ icon: 'github', link: 'https://github.com/kagenokeiyou/algorithm-notes' }],
        footer: {
          message:
            'Released under the <a href="https://github.com/kagenokeiyou/algorithm-notes/blob/main/LICENSE">MIT License</a>',
          copyright:
            'Copyright © 2026-present <a href="https://github.com/kagenokeiyou">Keiyou</a>',
        },
      },
    },
    [
      {
        documentRootPath: '/',
        scanStartPath: 'start',
        basePath: '/start/',
        resolvePath: '/start/',
        useTitleFromFrontmatter: true,
        sortMenusByFrontmatterOrder: true,
      },
      {
        documentRootPath: '/',
        scanStartPath: 'sorting',
        basePath: '/sorting/',
        resolvePath: '/sorting/',
        useTitleFromFrontmatter: true,
        sortMenusByFrontmatterOrder: true,
      },
    ],
  ),
)
