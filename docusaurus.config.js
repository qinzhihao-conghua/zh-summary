/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '博客系统',
  tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'qinzhihao-conghua', // Usually your GitHub org/user name.
  projectName: 'my-summary', // Usually your repo name.
  themeConfig: {
    // 配置公告栏
    announcementBar: {
      id: "note",
      content:
        "这里是公告栏",
      backgroundColor: "#fafbfc",
      textColor: "#091E42",
    },
    // 导航菜单
    navbar: {
      title: '个人主页',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      // 配置头部菜单导航，一一对应根目录下的文件夹
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        { to: 'blog', label: '博客', position: 'left' },
        { to: 'demo', label: 'demo', position: 'left' },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    // 页面底部信息
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 不要葱花博客, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/qinzhihao-conghua',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // 通过插件配置多个博客菜单
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'demo',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'demo',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './demo',
      },
    ],
  ]
};
