import Layout from '../../components/Layout';
import {
  blogPostListExtractor,
  commonExtractor,
  uniqueTagPagesExtractor,
  uniqueTagsExtractor
} from '../../extractors';

const Tag = ({ config, fontFaces, blogPostList, tag, prevPage, nextPage }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: `Tag: ${tag}` }}>
    <pre>{JSON.stringify({ prevPage, nextPage })}</pre>
    <pre>{JSON.stringify(blogPostList, null, 4)}</pre>
  </Layout>
);

export const getStaticPaths = async () => {
  const { uniqueTags } = await uniqueTagsExtractor();
  const paths = uniqueTags.map((tag) => ({ params: { tag } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const tag = params.tag;
  const { uniqueTagPages } = await uniqueTagPagesExtractor();
  const tagPage = uniqueTagPages.find((tagPage) => tagPage.tag === tag);
  const numberOfPages = tagPage ? tagPage.pages : 1;
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(1, tag);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      tag,
      prevPage: false,
      nextPage: numberOfPages > 1
    }
  };
};

export default Tag;
