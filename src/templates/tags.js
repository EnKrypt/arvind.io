import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Meta from '../components/Meta';
import PageNavigation from '../components/PageNavigation';
import PostPreview from '../components/PostPreview';
import Layout from '../layouts';

class Tags extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const tag = get(this, 'props.pageContext.tag');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');

        return (
            <>
                <Helmet title={`Posts with tag: '${tag}' | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `Posts with tag: '${tag}' | ${siteTitle}`,
                    }}
                />
                <Layout>
                    <div id="content">
                        <PageNavigation context={this.props.pageContext}>
                            <PostPreview posts={posts} />
                        </PageNavigation>
                    </div>
                </Layout>
            </>
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
                siteUrl
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
