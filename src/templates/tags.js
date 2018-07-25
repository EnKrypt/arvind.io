import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import PostPreview from '../components/PostPreview';

class Tags extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const tag = get(this, 'props.pathContext.tag');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        return (
            <div id="content">
                <Helmet title={`Posts with tag: '${tag}' | ${siteTitle}`} />
                <PostPreview posts={posts} />
            </div>
        );
    }
}

export default Tags;

export const pageQuery = graphql`
    query TagPage($tag: String) {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 10
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
            edges {
                node {
                    excerpt(pruneLength: 300)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        tags
                    }
                }
            }
        }
    }
`;
