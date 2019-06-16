import Link from 'gatsby-link';
import React from 'react';

class SidebarLink extends React.Component {
    render() {
        return (
            <div
                className={[
                    'sidebarlink',
                    this.props.alt ? 'alt' : '',
                    this.props.emphasize ? 'emphasized' : '',
                    this.props.gold ? 'gold' : '',
                ]
                    .join(' ')
                    .trim()}
            >
                {this.props.external ? (
                    <a
                        href={this.props.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.props.clickHandler}
                    >
                        {this.props.children}
                    </a>
                ) : (
                    <Link to={this.props.to} onClick={this.props.clickHandler}>
                        {this.props.children}
                    </Link>
                )}
            </div>
        );
    }
}

export default SidebarLink;
