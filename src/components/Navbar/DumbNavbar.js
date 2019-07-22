import { Link } from 'gatsby';
import React from 'react';

class DumbNavbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <div id="sidebarcontainer">
                    <Link to="/map" className="natural-link">
                        <i
                            className={[
                                'fa',
                                'fa-bars',
                                'togglesidebar',
                                'open',
                            ]
                                .join(' ')
                                .trim()}
                            aria-hidden="true"
                        />
                    </Link>
                </div>
                <div id="fullname">
                    <Link to="/" className="natural-link">
                        <span id="firstname">arvind </span>
                        <span id="lastname">kumar</span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default DumbNavbar;
