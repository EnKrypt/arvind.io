import Layout from '../../components/Layout';
import {
  blogPostListExtractor,
  commonExtractor,
  numberOfPagesExtractor
} from '../../extractors';

const Page = ({ config, fontFaces, blogPostList, page }) => (
  <Layout config={config} fontFaces={fontFaces} seo={{ title: `Page ${page}` }}>
    <pre>{JSON.stringify(blogPostList, null, 4)}</pre>
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
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(page);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      page
    }
  };
};

export default Page;
