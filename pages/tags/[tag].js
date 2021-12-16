import Layout from '../../components/Layout';
import PostListing from '../../components/PostListing';
import {
  blogPostListExtractor,
  commonExtractor,
  uniqueTagPagesExtractor,
  uniqueTagsExtractor
} from '../../extractors';

const Tag = ({ config, fontFaces, blogPostList, tag, nextPage }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: `Tag: ${tag}` }}>
    <PostListing
      posts={blogPostList}
      nextPage={nextPage ? `/tags/${tag}/page/2` : undefined}
    />
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
      nextPage: numberOfPages > 1
    }
  };
};

export default Tag;
