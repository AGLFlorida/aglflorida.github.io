module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      urls: [
        '/',
        '/about',
        '/blog/page/1',
        '/contact',
        '/people',
        '/policies',
        '/products',
        '/projects',
      ],
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:performance': ['warn', { minScore: 0.7 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lighthouse',
    },
  },
};
