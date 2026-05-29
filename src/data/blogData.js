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
        mdFile: {
            tr: '/blog/yapay-zeka-danismanligi.md',
            en: '/blog/en/yapay-zeka-consulting.md'
        }
    },
    {
        id: '2',
        slug: 'is-sureclerini-otomatize-etme',
        mdFile: {
            tr: '/blog/is-sureclerini-otomatize-etme.md',
            en: '/blog/en/business-process-automation.md'
        }
    },
    {
        id: '3',
        slug: 'it-outsource-ve-ekip-genisletme',
        mdFile: {
            tr: '/blog/it-outsource-ve-ekip-genisletme.md',
            en: '/blog/en/it-outsourcing-dedicated-teams.md'
        }
    },
    {
        id: '4',
        slug: 'stratejik-teknoloji-partnerligi',
        mdFile: {
            tr: '/blog/stratejik-teknoloji-partnerligi.md',
            en: '/blog/en/strategic-technology-partnership.md'
        }
    },
    {
        id: '5',
        slug: 'dijital-donusum-ve-modernizasyon',
        mdFile: {
            tr: '/blog/dijital-donusum-ve-modernizasyon.md',
            en: '/blog/en/digital-transformation-modernization.md'
        }
    },
    {
        id: '6',
        slug: 'designops-rehberi-2025',
        mdFile: {
            tr: '/blog/designops-rehberi-2025.md',
            en: '/blog/en/designops-guide-2025.md'
        }
    }
];
