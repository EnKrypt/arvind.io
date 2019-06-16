import React from 'react';
import PostMatter from '../components/PostMatter';

const PostPreview = ({ posts }) => {
    return (
        <div>
            {posts.map(({ node }) => {
                return (
                    <div key={node.fields.slug} className="post">
                        <PostMatter
                            slug={node.fields.slug}
                            post={node.frontmatter}
                        />
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
