import Layout from '../../components/Layout';
import PostListing from '../../components/PostListing';
import {
  blogPostListExtractor,
  commonExtractor,
  numberOfPagesExtractor
} from '../../extractors';

const Page = ({ config, fontFaces, blogPostList, page, nextPage }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: `Page ${page}` }}>
    <PostListing
      posts={blogPostList}
      prevPage={page === 2 ? '/' : `/page/${page - 1}`}
      nextPage={nextPage ? `/page/${page + 1}` : undefined}
    />
  </Layout>
);

export const getStaticPaths = async () => {
  const { numberOfPages } = await numberOfPagesExtractor();
  const paths = [];
  for (let i = 2; i <= numberOfPages; i++) {
    paths.push({ params: { page: `${i}` } });
  }
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const page = Number(params.page);
  const { numberOfPages } = await numberOfPagesExtractor();
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(page);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      page,
      nextPage: page < numberOfPages
    }
  };
};

export default Page;
