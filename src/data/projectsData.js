// Frontmatter parser
export function parseFrontmatter(mdContent) {
    const cleanContent = mdContent.replace(/^\uFEFF/, '').trimStart();
    const match = cleanContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) return { data: {}, content: cleanContent };

    const frontmatter = match[1];
    const content = match[2];
    const data = {};

    frontmatter.split('\n').forEach(line => {
        const splitIndex = line.indexOf(':');
        if (splitIndex !== -1) {
            const key = line.slice(0, splitIndex).trim();
            let value = line.slice(splitIndex + 1).trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            } else if (value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1);
            }
            data[key] = value;
        }
    });

    return { data, content };
}

export const FIXED_PROJECTS = [
    {
        id: 'olric',
        slug: 'olric',
        name: 'Olric',
        nameDisplay: 'Olric',
        i18nKey: 'olric',
        link: 'https://olric.app',
        logo: '/olric-geo-tracker-logo.png',
        image: '/olric-geo-ss.png',
        isFixed: true
    },
    {
        id: 'domizan',
        slug: 'domizan',
        name: 'Domizan',
        nameDisplay: 'Domizan',
        i18nKey: 'domizan',
        link: 'https://www.domizan.com/',
        logo: '/domizan-logo.png',
        image: '/domizan-preview.webp',
        isFixed: true
    },
    {
        id: 'brainmap',
        slug: 'brainmap',
        name: 'Brainmap',
        nameDisplay: 'brainmap.',
        i18nKey: 'brainmap',
        link: 'https://olric.app',
        logo: '/brainmap-logo.png',
        image: '/brainmap-preview.webp',
        isFixed: true
    }
];

// Markdown projects info
export const MD_PROJECTS = [
    {
        id: '1',
        slug: '2-el-bilet-alim-satim',
        mdFile: {
            tr: '/content/context/2.el-bilet-alim-satim.md',
            en: '/content/context/en/2.el-bilet-alim-satim.md'
        },
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (2).jpeg'
    },
    {
        id: '2',
        slug: 'b2c-online-egitim',
        mdFile: {
            tr: '/content/context/b2c-online-egitim.md',
            en: '/content/context/en/b2c-online-egitim.md'
        },
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24.jpeg'
    },
    {
        id: '3',
        slug: 'dell-cloud-service',
        mdFile: {
            tr: '/content/context/dell-cloud-service.md',
            en: '/content/context/en/dell-cloud-service.md'
        },
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (1).jpeg'
    },
    {
        id: '4',
        slug: 'fidanys',
        mdFile: {
            tr: '/content/context/fidanys.md',
            en: '/content/context/en/fidanys.md'
        },
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (4).jpeg'
    },
    {
        id: '5',
        slug: 'tekstil-geri-donusum',
        mdFile: {
            tr: '/content/context/tekstil-geri-donusum.md',
            en: '/content/context/en/tekstil-geri-donusum.md'
        },
        image: '/content/img/WhatsApp Image 2026-02-26 at 11.31.24 (3).jpeg'
    }
];
