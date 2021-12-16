import Layout from '../components/Layout';
import PostListing from '../components/PostListing';
import {
  blogPostListExtractor,
  commonExtractor,
  numberOfPagesExtractor
} from '../extractors';

const Home = ({ config, fontFaces, blogPostList, nextPage }) => (
  <Layout config={config} fontFaces={fontFaces}>
    <PostListing
      posts={blogPostList}
      nextPage={nextPage ? '/page/2' : undefined}
    />
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
      nextPage: numberOfPages > 1
    }
  };
};

export default Home;
