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
            dpHover: false,
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
                    <br />
                    <div
                        className="dpcontainer"
                        onMouseEnter={this.toggleShowDp}
                        onMouseLeave={this.toggleShowDp}
                    >
                        <div
                            id="sidebardp"
                            className={this.state.dpHover ? 'fade-out' : ''}
                        >
                            <InlineLogo />
                        </div>
                        <div
                            id="actualdp"
                            className={this.state.dpHover ? 'fade-in' : ''}
                        >
                            <img src="/images/dp.jpg" />
                        </div>
                    </div>
                    <br />
                    <div className="sidebartext">
                        Hi, I'm Arvind Kumar. <br />I am a developer, a musician
                        and an amateur astronomer. <br />
                        If you want to get in touch, <br />
                        <a href="mailto:mail@arvind.io">send me an email</a>.
                    </div>
                    <br />
                    <SidebarLink
                        to="/"
                        external={false}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Home
                    </SidebarLink>
                    <SidebarLink
                        to="/resume.pdf"
                        external={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Resume
                    </SidebarLink>
                    <SidebarLink
                        to="https://keybase.io/enkrypt"
                        external={true}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Keybase
                    </SidebarLink>
                    <SidebarLink
                        to="https://github.com/EnKrypt/arvind.io"
                        external={true}
                        clickHandler={this.toggleSidebar}
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

    toggleShowDp = () => {
        this.setState({
            dpHover: !this.state.dpHover,
        });
    };
}

export default Sidebar;
