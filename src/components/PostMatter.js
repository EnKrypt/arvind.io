import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import React from 'react';

class PostMatter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoomed: this.props.zoomed ? true : false,
        };
    }

    render() {
        return (
            <div
                className={['post-matter', this.state.zoomed ? 'zoomed' : '']
                    .join(' ')
                    .trim()}
            >
                <div className="post-info">
                    <div className="post-title heading">
                        <Link to={this.props.slug}>
                            {this.props.post.title}
                        </Link>
                    </div>
                    <div className="post-created">
                        <i className="fa fa-clock-o" aria-hidden="true" />
                        &nbsp;&nbsp;
                        {`Published on ${this.props.post.date}`}
                    </div>
                    <div className="post-tags">
                        {this.props.post.tags.map(tag => (
                            <div key={tag} className="post-tag">
                                <Link to={`/tags/${kebabCase(tag)}`}>
                                    {tag}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="post-preview">
                    <img
                        onClick={this.zoom}
                        src={`/images/previews/${this.props.post.key}.png`}
                    />
                </div>
            </div>
        );
    }

    zoom = () => {
        this.setState({
            zoomed: !this.state.zoomed,
        });
    };
}

export default PostMatter;
