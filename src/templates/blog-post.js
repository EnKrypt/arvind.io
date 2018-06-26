import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import { get, kebabCase } from 'lodash';

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const { previous, next } = this.props.pathContext;

        return (
            <div id="content">
                <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
                <h1>{post.frontmatter.title}</h1>
                <p>{post.frontmatter.date}</p>
                <div id="tags">
                    {post.frontmatter.tags.map(tag => (
                        <div key={tag} id="tag">
                            <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                        </div>
                    ))}
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr />

                <ul>
                    {previous && (
                        <li>
                            <Link to={previous.fields.slug} rel="prev">
                                ← {previous.frontmatter.title}
                            </Link>
                        </li>
                    )}

                    {next && (
                        <li>
                            <Link to={next.fields.slug} rel="next">
                                {next.frontmatter.title} →
                            </Link>
                        </li>
                    )}
                </ul>
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
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                tags
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;
