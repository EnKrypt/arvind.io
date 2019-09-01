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
                    <div className="sidebartext">
                        Hi, I&apos;m Arvind Kumar. <br />I am a software
                        developer, a musician and an amateur astronomer. <br />
                        If you want to get in touch, <br />
                        <a href="mailto:mail@arvind.io">send me an email</a>.
                    </div>
                    <SidebarLink
                        to="/"
                        external={false}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Home
                    </SidebarLink>
                    <SidebarLink
                        to="/hire"
                        external={false}
                        emphasize={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Hire Me
                    </SidebarLink>
                    <SidebarLink
                        to="/resume.pdf"
                        external={true}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        Resume
                    </SidebarLink>
                    <SidebarLink
                        to="https://keybase.io/enkrypt"
                        external={true}
                        clickHandler={this.toggleSidebar}
                    >
                        <i
                            className="fa fa-key sidebar-icon"
                            aria-hidden="true"
                        />{' '}
                        Keybase
                    </SidebarLink>
                    <SidebarLink
                        to="https://www.twitch.tv/enkryptontwitch"
                        external={true}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        <i
                            className="fa fa-twitch sidebar-icon"
                            aria-hidden="true"
                        />{' '}
                        Twitch
                    </SidebarLink>
                    <SidebarLink
                        to="https://twitter.com/TheEnKrypt"
                        external={true}
                        clickHandler={this.toggleSidebar}
                    >
                        <i
                            className="fa fa-twitter sidebar-icon"
                            aria-hidden="true"
                        />{' '}
                        Twitter
                    </SidebarLink>
                    <SidebarLink
                        to="/rss.xml"
                        external={true}
                        alt={true}
                        clickHandler={this.toggleSidebar}
                    >
                        RSS Feed
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
        if (this.state.show) {
            document.documentElement.classList.remove('disableScroll');
        } else {
            document.documentElement.classList.add('disableScroll');
        }
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
