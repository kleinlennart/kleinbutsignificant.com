import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { getWriting } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getWriting();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/writing/${p.id}/`,
      categories: p.data.tags,
    })),
  });
}
