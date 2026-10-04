import { getCollection } from 'astro:content';
import { isPublished } from './publication.mjs';
export { readingTime, selectHomepageWriting } from './publication.mjs';
export const getWriting = async () =>
  (await getCollection('writing', isPublished)).sort(
    (a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime(),
  );
export const getResearch = async () =>
  (await getCollection('research', isPublished)).sort(
    (a, b) => a.data.order - b.data.order,
  );
export const getProjects = async () =>
  (await getCollection('projects', isPublished)).sort(
    (a, b) => a.data.order - b.data.order,
  );
export const getNotes = async () => getCollection('notes', isPublished);
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
