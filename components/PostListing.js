import styled from 'styled-components';
import Left from './icons/Left';
import Right from './icons/Right';
import PostMatter from './PostMatter';

const PostListing = ({ posts, prevPage, nextPage }) => (
  <>
    {prevPage ? (
      <Navigation href={prevPage} className="prev-page">
        <Left /> Previous Page
      </Navigation>
    ) : null}
    <StyledPostListing>
      {posts.map((post) => (
        <div key={post.frontmatter.key}>
          <PostMatter matter={post.frontmatter} />
          <Excerpt>{post.excerpt}</Excerpt>
        </div>
      ))}
    </StyledPostListing>
    {nextPage ? (
      <Navigation href={nextPage} className="next-page">
        Next Page <Right />
      </Navigation>
    ) : null}
  </>
);

const StyledPostListing = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4em;
`;

const Navigation = styled.a`
  display: flex;
  align-items: center;
  width: max-content;
  font-size: 1.5em;
  text-decoration: none;
  gap: 0.5em;

  &.prev-page {
    margin: 0 auto 1.5em auto;
  }

  &.next-page {
    margin: 1.5em auto 0 auto;
  }

  & svg {
    height: 1.2em;
  }
`;

const Excerpt = styled.div`
  font-family: 'EB Garamond';
  font-size: 1.5em;
  text-align: justify;
`;

export default PostListing;
