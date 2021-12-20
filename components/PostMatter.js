import styled from 'styled-components';
import withHydration from '../client/withHydration';
import theme from '../theme';
import Clock from './icons/Clock';
import PostImage from './PostImage';

const HydratedPostImage = withHydration(PostImage, 'PostImage');

const PostMatter = ({ matter, post }) => {
  const postImage = require(`../public/images/previews/${matter.key}.png?resize`);
  return (
    <StyledPostMatter
      className={post ? 'post zoom' : ''}
      id={`matter-${matter.key}`}
    >
      <PostInfo>
        <Title>
          <a href={`/posts/${matter.key}`}>{matter.title}</a>
        </Title>
        <PublishedOn>
          <Clock /> Published on {matter.formattedDate}
        </PublishedOn>
        <Tags>
          {matter.tags.map((tag) => (
            <Tag key={tag}>
              <a href={`/tags/${tag}`}>{tag}</a>
            </Tag>
          ))}
        </Tags>
      </PostInfo>
      <HydratedPostImage image={postImage} post={post} slug={matter.key} />
    </StyledPostMatter>
  );
};

const StyledPostMatter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;

  & img {
    width: 192px;
    height: 101px;
    border-radius: 0.2em;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
    cursor: zoom-in;
  }

  &.zoom {
    flex-direction: column;
  }

  &.zoom img {
    cursor: zoom-out;
    width: 560px;
    height: 294px;
    margin-bottom: 2em;
  }

  &.post.zoom img {
    width: 720px;
    height: 378px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    & > div {
      width: 100%;
    }

    & img,
    &.zoom img {
      width: 256px;
      height: 134px;
      margin-bottom: 1em;
      cursor: default;
    }

    &&.post img {
      width: calc(100vw - 64px);
      height: unset;
      aspect-ratio: 1200 / 630;
    }
  }
`;

const PostInfo = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 2.25em;
  padding: 0.3em 0;

  && a {
    color: ${theme.colors.primary};
    text-decoration: none;
  }

  .post & a {
    pointer-events: none;
    cursor: default;
  }
`;

const PublishedOn = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${theme.colors.gray};

  & svg {
    height: 0.8em;
  }
`;

const Tags = styled.div`
  font-size: 0.9em;
  padding: 2.4em 0 1.2em 0;
  display: flex;
  gap: 0.3em;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  display: inline-block;
  background-color: ${theme.colors.primary};
  border-radius: 0.2em;
  padding: 0 0.25em;

  & a {
    text-decoration: none;
  }

  .dark & a {
    color: ${theme.colors.darkest};
  }

  .light & a {
    color: ${theme.colors.lightest};
  }
`;

export default PostMatter;
