// Make DOIs and URLs in the reference list clickable. rehype-citation (APSA) prints them as plain
// text, e.g. "… 441–441. doi:10.1038/nmeth.1618." Runs after rehype-citation and before
// rehype-external-links, which then adds target="_blank" like on every other outbound link.
import { visit, SKIP } from 'unist-util-visit';

// "doi:10.1038/x" or a bare URL; a trailing ".", ",", ";" or ")" ends the sentence, not the link.
const PATTERN =
  /\bdoi:\s?(10\.\d{4,9}\/[^\s]+?)(?=[.,;)]?(?:\s|$))|\bhttps?:\/\/[^\s<]+?(?=[.,;)]?(?:\s|$))/gi;

const hasClass = (node, name) => [].concat(node.properties?.className ?? []).includes(name);

function linkify(value) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(PATTERN)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    const href = m[1] ? `https://doi.org/${m[1]}` : m[0];
    out.push({
      type: 'element',
      tagName: 'a',
      properties: { href },
      children: [{ type: 'text', value: m[0] }],
    });
    last = m.index + m[0].length;
  }
  if (last === 0) return null;
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

export default function rehypeCiteLinks() {
  return (tree) => {
    visit(tree, 'element', (entry) => {
      if (!hasClass(entry, 'csl-entry')) return;
      visit(entry, 'text', (node, index, parent) => {
        if (!parent || index === undefined || parent.tagName === 'a') return;
        const parts = linkify(node.value);
        if (!parts) return;
        parent.children.splice(index, 1, ...parts);
        return [SKIP, index + parts.length];
      });
      return SKIP;
    });
  };
}
