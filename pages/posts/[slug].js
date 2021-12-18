import styled from 'styled-components';
import Layout from '../../components/Layout';
import PostMatter from '../../components/PostMatter';
import {
  blogPostExtractor,
  blogPostSlugsExtractor,
  commonExtractor
} from '../../extractors';
import theme from '../../theme';

const Post = ({ config, fontFaces, post, prevPost, nextPost }) => (
  <Layout
    config={config}
    fontFaces={fontFaces}
    seo={{
      title: post.frontmatter.title,
      description: post.excerpt,
      image: `/images/previews/${post.frontmatter.key}.png`
    }}
  >
    <PostMatter matter={post.frontmatter} post={true} />
    <PostContent dangerouslySetInnerHTML={{ __html: post.html }} />
  </Layout>
);

const PostContent = styled.div`
  font-family: 'EB Garamond';
  font-size: 1.5em;
  text-align: justify;

  & {
    img {
      display: block;
      margin: 0 auto;
    }

    h2 {
      font-size: 1.4em;
    }

    h5 {
      color: ${theme.colors.gray};
      font-size: 0.7em;
      font-weight: 400;
    }

    .choice-a {
      color: ${theme.colors.orange};
    }

    .choice-b {
      color: ${theme.colors.cyan};
    }

    @media (max-width: 768px) {
      & img {
        max-width: calc(100vw - 64px);
      }
    }
  }
`;

export const getStaticPaths = async () => {
  const { blogPostSlugs } = await blogPostSlugsExtractor();
  const paths = blogPostSlugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.slug;
  const { config, fontFaces } = await commonExtractor();
  const { post, prevPost, nextPost } = await blogPostExtractor(slug);
  return {
    props: {
      config,
      fontFaces,
      post,
      prevPost,
      nextPost
    }
  };
};

export default Post;