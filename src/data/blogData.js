import i18n from '../i18n/index.js';

// Frontmatter parser for blog articles
export function parseBlogFrontmatter(mdContent) {
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

// Markdown blog info
export const MD_BLOGS = [
    {
        id: '1',
        slug: 'yapay-zeka-danismanligi',
        mdFile: '/blog/yapay-zeka-danismanligi.md'
    },
    {
        id: '2',
        slug: 'is-sureclerini-otomatize-etme',
        mdFile: '/blog/is-sureclerini-otomatize-etme.md'
    },
    {
        id: '3',
        slug: 'it-outsource-ve-ekip-genisletme',
        mdFile: '/blog/it-outsource-ve-ekip-genisletme.md'
    },
    {
        id: '4',
        slug: 'stratejik-teknoloji-partnerligi',
        mdFile: '/blog/stratejik-teknoloji-partnerligi.md'
    },
    {
        id: '5',
        slug: 'dijital-donusum-ve-modernizasyon',
        mdFile: '/blog/dijital-donusum-ve-modernizasyon.md'
    },
    {
        id: '6',
        slug: 'designops-rehberi-2025',
        mdFile: '/blog/designops-rehberi-2025.md'
    }
];
