import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getWriting } from '../lib/content';
import { profile } from '../data/profile';

export async function GET(context: APIContext) {
  return rss({
    title: `${profile.name} — Writing`,
    description:
      'Notes and essays on bioinformatics, genomics, research, and scientific computing.',
    site: context.site!,
    items: (await getWriting()).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `/writing/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en-gb</language>',
  });
}
