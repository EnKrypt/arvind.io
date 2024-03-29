import { getBlogPostSlugs, getFrontmatter, getPostTree } from './blogPostList';

export const getNumberOfPages = async (postsInAPage) => {
  const folders = await getBlogPostSlugs();
  return Math.ceil(folders.length / postsInAPage);
};

export const getUniqueTags = async () => {
  const folders = await getBlogPostSlugs();
  return [
    ...new Set(
      (
        await Promise.all(
          folders.map(async (folder) => {
            const tree = await getPostTree(folder);
            return getFrontmatter(tree).tags;
          })
        )
      ).flat()
    )
  ];
};

export const getUniqueTagPages = async (postsInAPage) => {
  const folders = await getBlogPostSlugs();
  const tagOccurrences = (
    await Promise.all(
      folders.map(async (folder) => {
        const tree = await getPostTree(folder);
        return getFrontmatter(tree).tags;
      })
    )
  ).flat();
  const uniqueTags = [...new Set(tagOccurrences)];
  const tagPages = [];
  for (const uniqueTag of uniqueTags) {
    const postsWithTag = tagOccurrences.reduce(
      (count, tag) => count + (uniqueTag === tag),
      0
    );
    if (postsWithTag > postsInAPage) {
      tagPages.push({
        tag: uniqueTag,
        pages: Math.ceil(postsWithTag / postsInAPage)
      });
    }
  }
  return tagPages;
};
