import { Link } from 'gatsby';
import React from 'react';

class NoScript extends React.Component {
    render() {
        return (
            <noscript>
                <div className="noscript-warning">
                    {this.props.children || (
                        <>
                            {`Enable Javascript to switch between light and dark themes, comment on blog posts and use the contact form to `}
                            <Link to="/hire">hire me</Link>
                        </>
                    )}
                </div>
            </noscript>
        );
    }
}

export default NoScript;
