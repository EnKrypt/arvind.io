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
                    <div key={node.fields.slug} className="post">
                        <div className="post-title heading">
                            <Link to={node.fields.slug}>{title}</Link>
                        </div>
                        <div className="post-created">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            &nbsp;&nbsp;
                            {`Published on ${node.frontmatter.date}`}
                        </div>
                        <div className="post-tags">
                            {node.frontmatter.tags.map(tag => (
                                <div key={tag} className="post-tag">
                                    <Link to={`/tags/${kebabCase(tag)}`}>
                                        {tag}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div
                            className="post-content"
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
