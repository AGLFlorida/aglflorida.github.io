// Serializes a JSON-LD payload for use in dangerouslySetInnerHTML.
// JSON.stringify alone does not escape '<', so a value containing
// '</script>' could break out of the script tag. Escaping '<' keeps the
// payload inert as a script body while remaining valid JSON-LD.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
