// Tufte-style sidenotes from GFM footnotes, without JavaScript.
//
// Each footnote reference gets a copy of its footnote content right after it, as
// <span class="sidenote">. CSS shows these in the margin on wide screens and hides the
// footnotes section there; on narrow screens the sidenotes are hidden and the regular
// footnotes section is used instead (see src/styles/prose.css).
import { visit, SKIP } from 'unist-util-visit';

const isEl = (n, tag) => n && n.type === 'element' && (!tag || n.tagName === tag);

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(textOf).join('');
}

/** Footnote <li> -> inline children (paragraphs joined, back-references removed). */
function inlineContent(li) {
  const out = [];
  for (const child of li.children ?? []) {
    if (!isEl(child)) continue;
    const kids = isEl(child, 'p') ? child.children : [child];
    if (out.length) out.push({ type: 'text', value: ' ' });
    for (const k of kids) {
      if (isEl(k, 'a') && 'dataFootnoteBackref' in (k.properties ?? {})) continue;
      out.push(structuredClone(k));
    }
  }
  // Trim trailing whitespace left by the removed back-reference.
  const last = out.at(-1);
  if (last?.type === 'text') last.value = last.value.replace(/\s+$/, '');
  return out;
}

export default function rehypeSidenotes() {
  return (tree) => {
    const notes = new Map();
    visit(tree, 'element', (node) => {
      if (isEl(node, 'section') && 'dataFootnotes' in (node.properties ?? {})) {
        visit(node, 'element', (li) => {
          if (isEl(li, 'li') && li.properties?.id) notes.set(String(li.properties.id), li);
        });
        return SKIP;
      }
    });
    if (!notes.size) return;

    visit(tree, 'element', (node, index, parent) => {
      if (!isEl(node, 'sup') || !parent || index === undefined) return;
      const a = node.children.find((c) => isEl(c, 'a') && 'dataFootnoteRef' in (c.properties ?? {}));
      if (!a) return;
      const id = String(a.properties.href ?? '').replace(/^#/, '');
      const li = notes.get(id);
      if (!li) return;
      const sidenote = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sidenote'], role: 'note' },
        children: [
          { type: 'element', tagName: 'span', properties: { className: ['sidenote-num'] }, children: [{ type: 'text', value: textOf(a) }] },
          { type: 'text', value: ' ' },
          ...inlineContent(li),
        ],
      };
      parent.children.splice(index + 1, 0, sidenote);
      return [SKIP, index + 2];
    });
  };
}
