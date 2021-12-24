import styled from 'styled-components';
import withHydration from '../../client/withHydration';
import Comments from '../../components/Comments';
import Left from '../../components/icons/Left';
import Right from '../../components/icons/Right';
import Layout from '../../components/Layout';
import PostMatter from '../../components/PostMatter';
import {
  blogPostExtractor,
  blogPostSlugsExtractor,
  commonExtractor
} from '../../extractors';
import theme from '../../theme';

const HydratedComments = withHydration(Comments, 'Comments');

const Post = ({ config, fontFaces, post, prevPost, nextPost }) => {
  const previousPostImage = prevPost
    ? require(`../../public/images/previews/${prevPost.key}.png?resize`)
    : undefined;
  const nextPostImage = nextPost
    ? require(`../../public/images/previews/${nextPost.key}.png?resize`)
    : undefined;
  return (
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
      <style>{post.styles}</style>
      <PostContent
        dangerouslySetInnerHTML={{ __html: post.html }}
        className="content"
      />
      <RelatedPosts>
        {prevPost ? (
          <RelatedPost>
            <a href={`/posts/${prevPost.key}`}>
              <img
                alt="Previous Article"
                className="lazy"
                src={previousPostImage.placeholder || previousPostImage.src}
                data-srcset={previousPostImage.srcSet}
                data-sizes="(max-width: 768px) 256px, 320px"
              />
              <RelatedPostText>
                <RelatedPostDirection>
                  <Left /> Previous Article
                </RelatedPostDirection>
                <div>
                  <a href={`/posts/${prevPost.key}`}>{prevPost.title}</a>
                </div>
              </RelatedPostText>
            </a>
          </RelatedPost>
        ) : (
          <div />
        )}
        {nextPost ? (
          <RelatedPost>
            <a href={`/posts/${nextPost.key}`}>
              <img
                alt="Next Article"
                className="lazy"
                src={nextPostImage.placeholder || nextPostImage.src}
                data-srcset={nextPostImage.srcSet}
                data-sizes="(max-width: 768px) 256px, 320px"
              />
              <RelatedPostText className="right">
                <RelatedPostDirection>
                  Next Article <Right />
                </RelatedPostDirection>
                <div>
                  <a href={`/posts/${nextPost.key}`}>{nextPost.title}</a>
                </div>
              </RelatedPostText>
            </a>
          </RelatedPost>
        ) : (
          <div />
        )}
      </RelatedPosts>
      <StyledComments>
        <HydratedComments
          shortname={config.DISQUSSHORTNAME}
          url={`${config.URL}/posts/${post.frontmatter.key}`}
          id={post.frontmatter.disqusID || post.frontmatter.key}
          title={post.frontmatter.title}
        />
      </StyledComments>
    </Layout>
  );
};

const PostContent = styled.div`
  font-family: 'EB Garamond';
  font-size: 1.5em;
  text-align: justify;
`;

const RelatedPosts = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 2.5em 0 1em 0;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 2em;
  }
`;

const RelatedPost = styled.div`
  text-decoration: none;
  width: 20em;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.25);

  .dark & {
    background-color: ${theme.colors.darkest};
  }

  .light & {
    background-color: ${theme.colors.lightest};
  }

  & img {
    width: 20em;
    aspect-ratio: 1200 / 630;
  }

  & a {
    text-decoration: none;
  }

  & svg {
    height: 1.2em;
  }
`;

const RelatedPostText = styled.div`
  font-size: 1.1em;
  padding: 0.5em;

  &.right {
    text-align: right;
  }
`;

const RelatedPostDirection = styled.div`
  color: ${theme.colors.gray};
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 0.4em;

  .right & {
    justify-content: flex-end;
  }
`;

const StyledComments = styled.div`
  & .comments {
    padding: 2em 0;
    font-size: 1.25em;
    text-align: center;
    margin: 0 auto;
  }

  & .nojs {
    color: ${theme.colors.red};
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
