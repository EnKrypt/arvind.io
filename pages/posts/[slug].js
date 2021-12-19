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

    .embed {
      width: 100%;
      border: none;
      aspect-ratio: 16 / 9;
    }

    .index {
      width: 30em;
      font-family: 'Signika';
      font-size: 0.8em;
      padding: 0.5em;
      margin: 2.5em auto;
      border-radius: 0.5em;
      text-align: left;
    }

    .index-title {
      text-align: center;
      padding-bottom: 0.25em;
      border-bottom: solid 1px ${theme.colors.gray};
    }

    .index a {
      text-decoration: none;
      color: ${theme.colors.primary};
    }

    .dark & .index {
      background-color: ${theme.colors.darkgray};
    }

    .light & .index {
      background-color: ${theme.colors.lightgray};
    }

    sup a[id^='user-content-fnref-'] {
      padding: 3.6em 0.1em 0.1em 0.1em;
      margin-top: -3.5em;
      font-size: 0.9em;
    }
    sup a[id^='user-content-fnref-']:before {
      content: '[';
    }

    sup a[id^='user-content-fnref-']:after {
      content: ']';
    }

    .footnotes {
      font-size: 0.8em;
    }

    .footnotes h2 {
      font-size: 0;
      border-bottom: solid 1px ${theme.colors.gray};
    }

    .footnotes ol {
      padding: 0;
    }

    .footnotes li {
      padding-top: 3.5em;
      margin-top: -3.5em;
      list-style-type: none;
    }

    .footnotes li p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1em;
      margin-block-start: 0.5em;
      margin-block-end: 0.5em;
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

      .index {
        width: 100%;
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
