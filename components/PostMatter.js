import styled from 'styled-components';
import theme from '../theme';
import Clock from './icons/Clock';

const PostMatter = ({ matter }) => {
  const postImage = require(`../public/images/previews/${matter.key}.png?resize`);
  return (
    <StyledPostMatter>
      <div>
        <Title>{matter.title}</Title>
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
      </div>
      <img
        alt="Article Preview"
        className="lazy"
        src={postImage.placeholder}
        data-srcset={postImage.srcSet}
        data-sizes="(max-width: 768px) 256px, 192px"
      />
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
    border-radius: 0.2em;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
  }
`;

const Title = styled.div`
  color: ${theme.colors.primary};
  font-size: 2.25em;
  padding: 0.3em 0;
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
