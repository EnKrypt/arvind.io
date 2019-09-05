import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import InlineLogo from '../components/InlineLogo';
import Meta from '../components/Meta';
import NoScript from '../components/NoScript';
import SidebarLink from '../components/Sidebar/SidebarLink';
import Layout from '../layouts';
import '../styles/map.scss';

class Map extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        return (
            <>
                <Helmet title={`Site map | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `Site map | ${siteTitle}`,
                    }}
                />
                <Layout>
                    <div id="content">
                        <div className="map">
                            <div className="map-para">
                                <div className="map-image">
                                    <InlineLogo />
                                </div>
                            </div>
                            <div className="map-para">
                                Hi, I&apos;m Arvind Kumar. <br />I am a software
                                developer, a musician and an amateur astronomer.{' '}
                                <br />
                                If you want to get in touch, <br />
                                <a href="mailto:mail@arvind.io">
                                    send me an email
                                </a>
                                .
                            </div>
                            <div className="sidebarsocial">
                                <a
                                    href="https://keybase.io/enkrypt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.toggleSidebar}
                                >
                                    <i
                                        className="fa fa-key sidebar-icon"
                                        aria-hidden="true"
                                    />
                                </a>
                                <a
                                    href="https://open.spotify.com/user/theenkrypt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.toggleSidebar}
                                >
                                    <i
                                        className="fa fa-spotify sidebar-icon"
                                        aria-hidden="true"
                                    />
                                </a>
                                <a
                                    href="https://www.twitch.tv/enkryptontwitch"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.toggleSidebar}
                                >
                                    <i
                                        className="fa fa-twitch sidebar-icon"
                                        aria-hidden="true"
                                    />
                                </a>
                                <a
                                    href="https://twitter.com/TheEnKrypt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.toggleSidebar}
                                >
                                    <i
                                        className="fa fa-twitter sidebar-icon"
                                        aria-hidden="true"
                                    />
                                </a>
                            </div>
                            <SidebarLink to="/" external={false} alt={true}>
                                Home
                            </SidebarLink>
                            <SidebarLink
                                to="/hire"
                                external={false}
                                emphasize={true}
                            >
                                Hire Me
                            </SidebarLink>
                            <SidebarLink
                                to="/resume.pdf"
                                external={true}
                                alt={true}
                            >
                                Resume
                            </SidebarLink>
                            <SidebarLink to="/rss.xml" external={true}>
                                RSS Feed
                            </SidebarLink>
                            <SidebarLink
                                to="https://github.com/EnKrypt/arvind.io"
                                external={true}
                                alt={true}
                            >
                                Source
                            </SidebarLink>
                            <NoScript />
                        </div>
                    </div>
                </Layout>
            </>
        );
    }
}

export default Map;

export const pageQuery = graphql`
    query MapQuery {
        site {
            siteMetadata {
                author
                title
                description
                siteUrl
            }
        }
    }
`;
