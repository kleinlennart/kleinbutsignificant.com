// For text shown in CSS-uppercased labels: keeps names whose casing matters (e.g. CRAF'd,
// whose "d" is lowercase) intact, and uses the typographic apostrophe. Returns HTML.
const KEEP_CASE: Array<[RegExp, string]> = [
  [/CRAF['’]d/g, 'CRAF’<span style="text-transform:none">d</span>'],
];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function capsSafe(text: string) {
  return KEEP_CASE.reduce((html, [re, out]) => html.replace(re, out), escape(text));
}
