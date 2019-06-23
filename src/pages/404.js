import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Meta from '../components/Meta';
import '../styles/404.scss';

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        // default state values
        this.state = {
            static: true,
            glitch: true,
        };
        // class property (don't trigger a render for changing)
        // Register a 404 gif here
        this.images = [
            'NothingToDoHere.gif',
            'daenerys.gif',
            'friends.gif',
            'house.gif',
            'mario.gif',
            'portal.gif',
            'ron.gif',
            'sherlock.gif',
            'silicon-valley.gif',
            'travolta.gif',
        ];
    }

    render() {
        const siteTitle = get(this.props, 'data.site.siteMetadata.title');
        const email = get(this.props, 'data.site.siteMetadata.email');
        let path = this.props.location.pathname;
        if (typeof window !== 'undefined') {
            path = window.location.pathname;
        }

        return (
            <div id="notfound">
                <Helmet title={`Not Found | ${siteTitle}`} />
                <Meta metadata={this.props.data.site.siteMetadata} />
                <br />
                <img
                    id="notfoundimage"
                    src={'/images/404/' + this.getRandomImage()}
                    className={this.state.static ? 'hide' : ''}
                />
                <div
                    id="notfoundtext"
                    data-text="404"
                    className={['glitch', this.state.static ? '' : 'hide']
                        .join(' ')
                        .trim()}
                >
                    <span
                        className={[
                            'glitchbefore',
                            this.state.glitch ? '' : 'hide',
                        ]
                            .join(' ')
                            .trim()}
                    >
                        <span className="theme">4</span>0
                        <span className="theme">4</span>
                    </span>
                    <span className="theme">4</span>0
                    <span className="theme">4</span>
                    <span
                        className={[
                            'glitchafter',
                            this.state.glitch ? '' : 'hide',
                        ]
                            .join(' ')
                            .trim()}
                    >
                        <span className="theme">4</span>0
                        <span className="theme">4</span>
                    </span>
                </div>
                <br />
                <span
                    className={['effects', this.state.static ? '' : 'hide']
                        .join(' ')
                        .trim()}
                    onClick={this.showNotFoundImage}
                >
                    Miss the 404 gifs?
                </span>
                <span
                    className={['effects', this.state.static ? 'hide' : '']
                        .join(' ')
                        .trim()}
                    onClick={this.backToStaticImage}
                >
                    Back to default
                </span>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <span
                    onClick={this.showNotFoundImage}
                    className={['effects', this.state.static ? 'hide' : '']
                        .join(' ')
                        .trim()}
                >
                    Show another gif
                </span>
                <span
                    onClick={this.stopGlitching}
                    className={[
                        'effects',
                        this.state.static
                            ? this.state.glitch
                                ? ''
                                : 'hide'
                            : 'hide',
                    ]
                        .join(' ')
                        .trim()}
                >
                    Stop glitch effect
                </span>
                <span
                    onClick={this.resumeGlitching}
                    className={[
                        'effects',
                        this.state.static
                            ? this.state.glitch
                                ? 'hide'
                                : ''
                            : 'hide',
                    ]
                        .join(' ')
                        .trim()}
                >
                    Resume glitch effect
                </span>
                <br />
                <br />
                <br />
                {(path && path.length < 50 ? path : 'That') +
                    ' is not a valid location on here'}
                <br />
                You may write to <a href={`mailto:${email}`}>{email}</a> if you
                believe this is unintended
                <br />
                <br />
                <div className="bigtext">HTTP - 404</div>
            </div>
        );
    }

    getRandomImage() {
        return this.state.static
            ? 'default.jpg'
            : this.images[Math.floor(Math.random() * this.images.length)];
    }

    showNotFoundImage = () => {
        if (this.images.length) {
            this.setState({
                static: false,
            });
        }
    };

    backToStaticImage = () => {
        this.setState({
            static: true,
        });
    };

    stopGlitching = () => {
        this.setState({
            glitch: false,
        });
    };

    resumeGlitching = () => {
        this.setState({
            glitch: true,
        });
    };
}

export default NotFound;

export const pageQuery = graphql`
    query NotFoundQuery {
        site {
            siteMetadata {
                title
                email
                description
            }
        }
    }
`;
