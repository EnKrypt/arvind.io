import Layout from '../../../../components/Layout';
import {
  blogPostListExtractor,
  commonExtractor,
  uniqueTagPagesExtractor
} from '../../../../extractors';

const TagPage = ({ config, fontFaces, blogPostList, tag, page }) => (
  <Layout
    config={config}
    fontFaces={fontFaces}
    seo={{ title: `Page ${page} | Tag: ${tag}` }}
  >
    <pre>{JSON.stringify(blogPostList, null, 4)}</pre>
  </Layout>
);

export const getStaticPaths = async () => {
  const { uniqueTagPages } = await uniqueTagPagesExtractor();
  const paths = [];
  for (const tagPage of uniqueTagPages) {
    for (let i = 2; i <= tagPage.pages; i++) {
      paths.push({ params: { tag: tagPage.tag, page: `${i}` } });
    }
  }
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const tag = params.tag;
  const page = Number(params.page);
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(page, tag);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      tag,
      page
    }
  };
};

export default TagPage;
