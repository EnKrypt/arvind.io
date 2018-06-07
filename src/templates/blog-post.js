import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';

import Bio from '../components/Bio';

class BlogPostTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark;
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const { previous, next } = this.props.pathContext;

        return (
            <div>
                <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
                <h1>{post.frontmatter.title}</h1>
                <p>{post.frontmatter.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr />
                <Bio />

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
                date(formatString: "MMMM DD, YYYY")
            }
        }
    }
`;
