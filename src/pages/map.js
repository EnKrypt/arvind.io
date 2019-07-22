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
                            <SidebarLink
                                to="https://keybase.io/enkrypt"
                                external={true}
                            >
                                Keybase
                            </SidebarLink>
                            <SidebarLink
                                to="https://twitter.com/TheEnKrypt"
                                external={true}
                                alt={true}
                            >
                                Twitter
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
            }
        }
    }
`;
