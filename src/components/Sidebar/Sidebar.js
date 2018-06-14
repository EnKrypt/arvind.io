import React from 'react';

import InlineLogo from '../InlineLogo';
import SidebarLink from './SidebarLink';

import './styles.scss';

class Sidebar extends React.Component {
    constructor() {
        super();
        // default state values
        this.state = {
            show: false,
        };
    }

    render() {
        return (
            <div id="sidebarcontainer">
                <i
                    className={[
                        'fa',
                        'fa-bars',
                        'togglesidebar',
                        'open',
                        this.state.show ? 'hide' : '',
                    ]
                        .join(' ')
                        .trim()}
                    aria-hidden="true"
                    onClick={this.toggleSidebar}
                />
                <i
                    className={[
                        'fa',
                        'fa-times',
                        'togglesidebar',
                        'close',
                        this.state.show ? '' : 'hide',
                    ]
                        .join(' ')
                        .trim()}
                    aria-hidden="true"
                    onClick={this.toggleSidebar}
                />
                <div
                    id="sidebar"
                    className={this.state.show ? '' : 'hidesidebar'}
                >
                    <div id="sidebardp">
                        <InlineLogo />
                    </div>
                    <br />
                    <SidebarLink to="/" external={false} alt={true}>
                        Home
                    </SidebarLink>
                    <SidebarLink to="/about" external={false}>
                        About
                    </SidebarLink>
                    <SidebarLink to="/resume.pdf" external={true} alt={true}>
                        Resume
                    </SidebarLink>
                    <SidebarLink
                        to="https://keybase.io/enkrypt"
                        external={true}
                    >
                        Contact
                    </SidebarLink>
                    <SidebarLink
                        to="https://github.com/EnKrypt/arvind.io"
                        external={true}
                        alt={true}
                    >
                        Source
                    </SidebarLink>
                </div>
            </div>
        );
    }

    toggleSidebar = () => {
        this.setState({
            show: !this.state.show,
        });
    };
}

export default Sidebar;
