import Layout from '../../../../components/Layout';
import PostListing from '../../../../components/PostListing';
import {
  blogPostListExtractor,
  commonExtractor,
  uniqueTagPagesExtractor
} from '../../../../extractors';

const TagPage = ({ config, fontFaces, blogPostList, tag, page, nextPage }) => (
  <Layout
    config={config}
    fontFaces={fontFaces}
    seo={{ title: `Page ${page} | Tag: ${tag}` }}
  >
    <PostListing
      posts={blogPostList}
      prevPage={page === 2 ? `/tags/${tag}` : `/tags/${tag}/page/${page - 1}`}
      nextPage={nextPage ? `/tags/${tag}/page/${page + 1}` : undefined}
    />
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
  const { uniqueTagPages } = await uniqueTagPagesExtractor();
  const tagPage = uniqueTagPages.find((tagPage) => tagPage.tag === tag);
  const numberOfPages = tagPage ? tagPage.pages : 1;
  const { config, fontFaces } = await commonExtractor();
  const { blogPostList } = await blogPostListExtractor(page, tag);
  return {
    props: {
      config,
      fontFaces,
      blogPostList,
      tag,
      page,
      nextPage: page < numberOfPages
    }
  };
};

export default TagPage;
