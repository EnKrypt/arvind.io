import React from 'react';
import { get, kebabCase } from 'lodash';
import Link from 'gatsby-link';

const PostPreview = ({ posts }) => {
    return (
        <div>
            {posts.map(({ node }) => {
                const title =
                    get(node, 'frontmatter.title') || node.fields.slug;
                return (
                    <div key={node.fields.slug}>
                        <h3>
                            <Link
                                style={{ boxShadow: 'none' }}
                                to={node.fields.slug}
                            >
                                {title}
                            </Link>
                        </h3>
                        <small>{node.frontmatter.date}</small>
                        <div id="tags">
                            {node.frontmatter.tags.map(tag => (
                                <div key={tag} id="tag">
                                    <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
                                </div>
                            ))}
                        </div>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: node.excerpt,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PostPreview;
