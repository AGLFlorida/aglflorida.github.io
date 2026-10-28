import { jsonLdScript } from '../jsonLd';

describe('jsonLdScript', () => {
  it('serializes a plain object as JSON', () => {
    const result = jsonLdScript({ '@type': 'Thing', name: 'Example' });
    expect(JSON.parse(result)).toEqual({ '@type': 'Thing', name: 'Example' });
  });

  it('escapes "<" so a closing script tag cannot appear in the output', () => {
    const result = jsonLdScript({ name: '</script><script>alert(1)</script>' });
    expect(result).not.toContain('</script>');
    expect(result).not.toContain('<script>');
  });

  it('produces output that still parses back to the original value after escaping', () => {
    const payload = { name: '</script><script>alert(1)</script>' };
    const result = jsonLdScript(payload);
    expect(JSON.parse(result)).toEqual(payload);
  });
});
