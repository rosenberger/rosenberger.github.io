module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });

  eleventyConfig.addGlobalData('buildTime', () => new Date());

  // Blog posts strictly from /src/blog (folder-based, not tag-based)
  eleventyConfig.addCollection('blogPosts', (collectionApi) => {
    // NOTE: In Eleventy v3, getFilteredByGlob is most reliable with a single glob string.
    // We only treat markdown files in /src/blog as posts (avoids including blog/index.njk).
    const items = collectionApi.getFilteredByGlob('./src/blog/**/*.md');
    return items.sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addFilter('dateISO', (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter('dateSK', (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return new Intl.DateTimeFormat('sk-SK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(d);
  });

  eleventyConfig.addFilter('year', (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return String(d.getFullYear());
  });

  // Array helper: take first N items (useful in Nunjucks where slice behaves differently)
  eleventyConfig.addFilter('limit', (arr, n) => {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, n);
  });

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['md', 'njk'],
  };
};
