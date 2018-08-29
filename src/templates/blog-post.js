import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { DiscussionEmbed } from 'disqus-react';
import { get, kebabCase } from 'lodash';
import Meta from '../components/Meta';

import './content.scss';

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const { previous, next } = this.props.pathContext;

        return (
            <div id="content">
                <div className="post">
                    <Helmet
                        title={`${post.frontmatter.title} | ${siteTitle}`}
                    />
                    <Meta
                        metadata={{
                            ...this.props.data.site.siteMetadata,
                            title: `${post.frontmatter.title} | ${siteTitle}`,
                            description: post.excerpt,
                            image: `/images/previews/${
                                post.frontmatter.key
                            }.png`,
                        }}
                    />
                    <div className="post-title heading">
                        {post.frontmatter.title}
                    </div>
                    <div className="post-created">
                        <i className="fa fa-clock-o" aria-hidden="true" />
                        &nbsp;&nbsp;
                        {`Published on ${post.frontmatter.date}`}
                    </div>
                    <div className="post-tags">
                        {post.frontmatter.tags.map(tag => (
                            <div key={tag} className="post-tag">
                                <Link to={`/tags/${kebabCase(tag)}`}>
                                    {tag}
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                    <hr />
                    {previous && (
                        <span className="prev-post-link">
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        </span>
                    )}
                    {next && (
                        <span className="next-post-link">
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        </span>
                    )}
                    <hr className="float-clear" />
                    <DiscussionEmbed
                        shortname={this.props.data.site.siteMetadata.disqusId}
                        config={{
                            title: post.frontmatter.title,
                            identifier: post.id,
                            url: `${this.props.data.site.siteMetadata.siteUrl}${
                                post.fields.slug
                            }`,
                        }}
                    />
                </div>
            </div>
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
