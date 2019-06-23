import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Meta from '../components/Meta';
import PageNavigation from '../components/PageNavigation';
import PostPreview from '../components/PostPreview';

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const siteAuthor = get(this, 'props.data.site.siteMetadata.author');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');
        return (
            <div id="content">
                <Helmet title={`${siteAuthor} | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `${siteAuthor} | ${siteTitle}`,
                    }}
                />
                <PageNavigation context={this.props.pageContext}>
                    <PostPreview posts={posts} />
                </PageNavigation>
            </div>
        );
    }
}

export default BlogIndex;

export const pageQuery = graphql`
    query IndexQuery($skip: Int, $limit: Int) {
        site {
            siteMetadata {
                author
                title
                description
            }
        }
        allMarkdownRemark(
            limit: $limit
            skip: $skip
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
                        key
                    }
                }
            }
        }
    }
`;
