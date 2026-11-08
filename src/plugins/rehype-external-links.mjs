// Links to other sites open in a new tab; links within this site stay in the same tab.
// Adds target="_blank" and rel="noopener noreferrer" (keeping any existing rel, e.g. "me").
// mailto:, tel:, #anchors and relative/absolute-path links are left untouched.
import { visit } from 'unist-util-visit';

const SITE_HOSTS = new Set(['kleinbutsignificant.com', 'www.kleinbutsignificant.com']);

export function isExternal(href) {
  if (typeof href !== 'string' || !/^https?:\/\//i.test(href)) return false;
  try {
    return !SITE_HOSTS.has(new URL(href).hostname);
  } catch {
    return false;
  }
}

export default function rehypeExternalLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !isExternal(node.properties?.href)) return;
      const rel = new Set([].concat(node.properties.rel ?? []).flatMap((r) => String(r).split(/\s+/)).filter(Boolean));
      rel.add('noopener');
      rel.add('noreferrer');
      node.properties.target = '_blank';
      node.properties.rel = [...rel];
    });
  };
}
