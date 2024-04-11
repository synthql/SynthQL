import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'synthql',
    tagline: 'A fullstack, type-safe client for your postgresql database',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'http://synthql.github.io/',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/synthql/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'synthql', // Usually your GitHub org/user name.
    projectName: 'synthql', // Usually your repo name.
    deploymentBranch: 'gh-pages',
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/synthql/synthql/tree/master/packages/docs/',
                },
                blog: false && {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/synthql/synthql/tree/master/packages/docs/',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        //image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'synthql',
            logo: {
                alt: 'synthql Logo',
                src: '/img/logo.webp',
                style: {
                    borderRadius: '100%',
                },
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                // TODO(fhur): Add blog support
                // { to: '/blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://synthql.github.io/synthql/reference',
                    label: 'API',
                    position: 'right',
                },
                {
                    href: 'https://github.com/synthql/synthql',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/getting-started',
                        },
                    ],
                },
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/getting-started',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Github issues',
                            href: 'https://github.com/synthql/synthql/issues',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discord.gg/3NfpfJxb',
                        },
                    ],
                },
                {
                    title: 'Contact',
                    items: [
                        {
                            label: 'github',
                            to: 'https://github.com/fhur',
                        },
                        {
                            label: 'X',
                            href: 'https://x.com/fernandohur',
                        },
                    ],
                },
            ],
            //copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
