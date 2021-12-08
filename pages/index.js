import Layout from '../components/Layout';
import {
  blogPostListExtractor,
  commonExtractor,
  numberOfPagesExtractor
} from '../extractors';

const Home = ({ config, fontFaces, blogPostList, prevPage, nextPage }) => (
  <Layout config={config} fontFaces={fontFaces}>
    <pre>{JSON.stringify({ prevPage, nextPage })}</pre>
    <pre>{JSON.stringify(blogPostList, null, 4)}</pre>
  </Layout>
);

export const getStaticProps = async () => {
  const { numberOfPages } = await numberOfPagesExtractor();
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(1, '');
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      prevPage: false,
      nextPage: numberOfPages > 1
    }
  };
};

export default Home;
