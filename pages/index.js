import Layout from '../components/Layout';
import { blogPostListExtractor, commonExtractor } from '../extractors';

const Home = ({ config, fontFaces, blogPostList }) => (
  <Layout config={config} fontFaces={fontFaces}>
    <pre>{JSON.stringify(blogPostList, null, 4)}</pre>
  </Layout>
);

export const getStaticProps = async (context) => {
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(1, '');
  return {
    props: {
      config,
      fontFaces,
      blogPostList
    }
  };
};

export default Home;
