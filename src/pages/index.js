import React from 'react';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import PostPreview from '../components/PostPreview';

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        return (
            <div id="content">
                <Helmet title={`Arvind Kumar | ${siteTitle}`} />
                <PostPreview posts={posts} />
            </div>
        );
    }
}

export default BlogIndex;

export const pageQuery = graphql`
    query IndexQuery {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(
            limit: 10
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 300)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        tags
                        date(formatString: "DD MMMM, YYYY")
                    }
                }
            }
        }
    }
`;
