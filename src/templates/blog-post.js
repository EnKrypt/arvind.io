import { DiscussionEmbed } from 'disqus-react';
import { graphql, Link } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Meta from '../components/Meta';
import PostMatter from '../components/PostMatter';
import Layout from '../layouts';
import './content.scss';

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const { previous, next } = this.props.pageContext;

        return (
            <>
                <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `${post.frontmatter.title} | ${siteTitle}`,
                        description: post.excerpt,
                        image: `/images/previews/${post.frontmatter.key}.png`,
                    }}
                />
                <Layout>
                    <div id="content">
                        <div className="post expanded">
                            <PostMatter
                                zoomed={true}
                                slug={post.fields.slug}
                                post={post.frontmatter}
                            />
                            <div
                                className="post-content"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                            <br />
                            <br />
                            {next && (
                                <div className="next-post">
                                    <Link to={next.fields.slug} rel="next">
                                        <img
                                            className="next-post-image"
                                            src={`/images/previews/${next.frontmatter.key}.png`}
                                        />
                                        <div className="next-post-link">
                                            <div className="post-link-subtext">
                                                Next Post →
                                            </div>
                                            {next.frontmatter.title}
                                        </div>
                                    </Link>
                                </div>
                            )}
                            {previous && (
                                <div className="prev-post">
                                    <Link to={previous.fields.slug} rel="prev">
                                        <img
                                            className="prev-post-image"
                                            src={`/images/previews/${previous.frontmatter.key}.png`}
                                        />
                                        <div className="prev-post-link">
                                            <div className="post-link-subtext">
                                                ← Previous post
                                            </div>
                                            {previous.frontmatter.title}
                                        </div>
                                    </Link>
                                </div>
                            )}
                            <br />
                            <br />
                            <DiscussionEmbed
                                shortname={
                                    this.props.data.site.siteMetadata.disqusId
                                }
                                config={{
                                    title: post.frontmatter.title,
                                    identifier: post.id,
                                    url: `${this.props.data.site.siteMetadata.siteUrl}${post.fields.slug}`,
                                }}
                            />
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                description
                disqusId
                siteUrl
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            excerpt(pruneLength: 200)
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
`;
