import Layout from '../../components/Layout';
import {
  blogPostListExtractor,
  commonExtractor,
  uniqueTagsExtractor
} from '../../extractors';

const Tag = ({ config, fontFaces, blogPostList, tag }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: `Tag: ${tag}` }}>
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
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(1, tag);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      tag
    }
  };
};

export default Tag;
