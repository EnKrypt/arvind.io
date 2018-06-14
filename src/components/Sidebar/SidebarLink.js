import React from 'react';
import Link from 'gatsby-link';

class SidebarLink extends React.Component {
    render() {
        return (
            <div
                className={['sidebarlink', this.props.alt ? 'alt' : '']
                    .join(' ')
                    .trim()}
            >
                {this.props.external ? (
                    <a href={this.props.to} target="_blank" rel="noopener noreferrer">{this.props.children}</a>
                ) : (
                    <Link to={this.props.to}>{this.props.children}</Link>
                )}
            </div>
        );
    }
}

export default SidebarLink;
