/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: '博客系统',
  tagline: 'The tagline of my site',
  url: 'https://zh-summary.github.io',
  baseUrl: '/zh-summary/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'qinzhihao-conghua', // Usually your GitHub org/user name.
  // trailingSlash: true,
  projectName: 'zh-summary', // Usually your repo name.
  themeConfig: {
    // 配置公告栏
    // announcementBar: {
    //   id: "note",
    //   content: "这里是公告栏",
    //   backgroundColor: "#fafbfc",
    //   textColor: "#091E42",
    // },
    // 收起侧边看
    hideableSidebar: true,
    // 导航菜单
    navbar: {
      title: '不要葱花',
      logo: {
        alt: 'Logo',
        src: 'img/logo.jpg',
      },
      // 配置头部菜单导航，一一对应根目录下的文件夹
      items: [
        { to: '/', label: '首页', position: 'right' },
        {
          to: 'docs',
          activeBasePath: 'docs',
          label: '文档',
          position: 'right',
        },
        // 取消博客部分
        { 
          to: 'blog', 
          activeBasePath: 'blog',
          label: '博客', 
          position: 'right' 
        },
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
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/qinzhihao-conghua',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 不要葱花博客 Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/qinzhihao-conghua',
        },
        blog: {
          path: "./blog",
          // 设置成/斜杠就是默认网站的首页
          // routeBasePath: "/",
          blogSidebarTitle: "所有文章",
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: "all",
            title: "不要葱花",
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // 通过插件配置多个博客菜单
  plugins: [
    // 在这里配置多个博客页面
    // [
    //   '@docusaurus/plugin-content-blog',
    //   {
    //     id: 'demo',
    //     routeBasePath: 'demo',
    //     path: './demo',
    //   },
    // ],
  ]
};
