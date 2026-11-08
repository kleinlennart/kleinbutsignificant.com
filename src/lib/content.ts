import fs from 'node:fs';
import path from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../consts';

/** Drafts are visible in `astro dev`, hidden in production builds. */
const visible = (draft: boolean) => !(import.meta.env.PROD && draft);

export async function getWriting() {
  const posts = await getCollection('writing', ({ data }) => visible(data.draft));
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects() {
  const items = await getCollection('projects', ({ data }) => visible(data.draft));
  return items.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getArt() {
  const items = await getCollection('art');
  return items.sort((a, b) => a.data.order - b.data.order);
}

/** GitHub file URL for an entry (used by the footer "Source" link); prefers the .qmd/.Rmd source next to the .md. */
export function sourceUrl(entry: { filePath?: string }) {
  if (!entry.filePath) return undefined;
  const rel = path.relative('content', entry.filePath);
  const stem = entry.filePath.replace(/\.(md|mdx)$/, '');
  const source = ['.qmd', '.Rmd'].find((ext) => fs.existsSync(stem + ext));
  return `${SITE.sourceBase}/${source ? rel.replace(/\.(md|mdx)$/, source) : rel}`;
}

export function hasSource(entry: { filePath?: string }) {
  if (!entry.filePath) return undefined;
  const stem = entry.filePath.replace(/\.(md|mdx)$/, '');
  return ['.qmd', '.Rmd'].find((ext) => fs.existsSync(stem + ext));
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export type Post = CollectionEntry<'writing'>;
