import Layout from '../components/Layout';
import PostListing from '../components/PostListing';
import {
  blogPostListExtractor,
  commonExtractor,
  feedGenerator,
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
  /*
   * We need to hijack this part of the code to run standalone
   * generators or scripts that are independent from the build
   * process because Next.js does not provide any mechanism or
   * hook to do so. We cannot run these methods as an external
   * script because we need to import things using the webpack
   * config that is available only within our Next.js project.
   *
   * This part of the code runs only once during generation of
   * a production build so it becomes an ideal entry point for
   * running these generators. Any other part of the code that
   * meets the same criteria would have also worked.
   */
  if (process.env.NODE_ENV !== 'development') {
    await feedGenerator();
  }

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
