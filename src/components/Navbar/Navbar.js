import { Link } from 'gatsby';
import React from 'react';
import Sidebar from '../Sidebar';
import './styles.scss';

class Navbar extends React.Component {
    render() {
        return (
            <div id="navbar">
                <Sidebar />
                <div id="fullname">
                    <Link to="/" className="natural-link">
                        <span id="firstname">arvind </span>
                        <span id="lastname">kumar</span>
                    </Link>
                </div>
                <div
                    id="toggleTheme"
                    onClick={() =>
                        this.props.toggleTheme(
                            this.reverseThemeName(this.props.theme)
                        )
                    }
                >
                    <i
                        className={[
                            'fa fa-moon-o',
                            this.props.theme == 'dark' ? 'hide' : '',
                        ]
                            .join(' ')
                            .trim()}
                        aria-hidden="true"
                    />
                    <i
                        className={[
                            'fa fa-sun-o',
                            this.props.theme == 'light' ? 'hide' : '',
                        ]
                            .join(' ')
                            .trim()}
                        aria-hidden="true"
                    />
                </div>
            </div>
        );
    }

    reverseThemeName(theme) {
        if (theme == 'dark') {
            return 'light';
        } else {
            return 'dark';
        }
    }
}

export default Navbar;
