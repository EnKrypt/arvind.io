import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Meta from '../components/Meta';
import PageNavigation from '../components/PageNavigation';
import PostPreview from '../components/PostPreview';

class Tags extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const tag = get(this, 'props.pathContext.tag');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        return (
            <div id="content">
                <Helmet title={`Posts with tag: '${tag}' | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `Posts with tag: '${tag}' | ${siteTitle}`,
                    }}
                />
                <PageNavigation context={this.props.pathContext}>
                    <PostPreview posts={posts} />
                </PageNavigation>
            </div>
        );
    }
}

export default Tags;

export const pageQuery = graphql`
    query TagPage($tag: String, $skip: Int, $limit: Int) {
        site {
            siteMetadata {
                title
                description
            }
        }
        allMarkdownRemark(
            filter: { frontmatter: { tags: { in: [$tag] } } }
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
