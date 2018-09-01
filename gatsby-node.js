const _ = require('lodash');
const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;

    return new Promise((resolve, reject) => {
        const blogPost = path.resolve('./src/templates/blog-post.js');
        const blogIndex = path.resolve('./src/templates/index.js');
        const blogTag = path.resolve('./src/templates/tags.js');
        const postsInAPage = 5;
        resolve(
            graphql(
                `
                    {
                        allMarkdownRemark(
                            sort: { fields: [frontmatter___date], order: DESC }
                            limit: 1000
                        ) {
                            edges {
                                node {
                                    fields {
                                        slug
                                    }
                                    frontmatter {
                                        title
                                        tags
                                        key
                                    }
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }

                const posts = result.data.allMarkdownRemark.edges;
                const pageCount = Math.ceil(posts.length / postsInAPage);
                _.times(pageCount, index => {
                    createPage({
                        path: paginationPath(index, pageCount, '/'),
                        component: blogIndex,
                        context: {
                            skip: index * postsInAPage,
                            limit: postsInAPage,
                            pageCount,
                            prevPath: paginationPath(index - 1, pageCount, '/'),
                            nextPath: paginationPath(index + 1, pageCount, '/'),
                        },
                    });
                });
                _.each(posts, (post, index) => {
                    const previous =
                        index === posts.length - 1
                            ? null
                            : posts[index + 1].node;
                    const next = index === 0 ? null : posts[index - 1].node;

                    createPage({
                        path: post.node.fields.slug,
                        component: blogPost,
                        context: {
                            slug: post.node.fields.slug,
                            previous,
                            next,
                        },
                    });
                });
                const tagMap = {};
                _.each(posts, edge => {
                    if (_.get(edge, 'node.frontmatter.tags')) {
                        for (tag of edge.node.frontmatter.tags) {
                            if (tagMap[tag]) {
                                tagMap[tag] += 1;
                            } else {
                                tagMap[tag] = 1;
                            }
                        }
                    }
                });
                Object.keys(tagMap).forEach(tag => {
                    const tagPageCount = Math.ceil(tagMap[tag] / postsInAPage);
                    _.times(tagPageCount, index => {
                        createPage({
                            path: paginationPath(index, tagPageCount, `/tags/${_.kebabCase(tag)}/`),
                            component: blogTag,
                            context: {
                                tag: tag,
                                skip: index * postsInAPage,
                                limit: postsInAPage,
                                tagPageCount,
                                prevPath: paginationPath(index - 1, tagPageCount, `/tags/${_.kebabCase(tag)}/`),
                                nextPath: paginationPath(index + 1, tagPageCount, `/tags/${_.kebabCase(tag)}/`),
                            },
                        });
                    });
                });
            })
        );
    });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
    const { createNodeField } = boundActionCreators;

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value,
        });
    }
};

const paginationPath = (page, totalPages, path) => {
    if (page === 0) {
        return `${path}`;
    } else if (page < 0 || page >= totalPages) {
        return '';
    } else {
        return `${path}page/${page + 1}`;
    }
};
