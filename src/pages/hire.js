import { graphql } from 'gatsby';
import get from 'lodash/get';
import React from 'react';
import Helmet from 'react-helmet';
import Recaptcha from 'reaptcha';
import Info from '../components/Info';
import Meta from '../components/Meta';
import NoScript from '../components/NoScript';
import Layout from '../layouts';

// A crazy guy made me write this mostly useless component.
const Paragraph = ({ children, className }) => (
    <div className={['hire-para', className].join(' ')}>{children}</div>
);

const Subtext = ({ children, className }) => (
    <div className={['sub-text', className].join(' ')}>{children}</div>
);

class Hire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 'undetermined', // Meaningless value as placeholder that will prevent either section from being rendered
            loading: false,
        };
        this.nameRef = undefined;
        this.emailRef = undefined;
        this.messageRef = undefined;
        this.infoRef = undefined;
        this.captcha = undefined;
    }

    componentDidMount() {
        const statusURL = '/api/available';
        fetch(statusURL)
            .then(res => res.json())
            .then(res => {
                if (!res.error) {
                    if (
                        res.message === 'available' ||
                        res.message === 'unavailable'
                    ) {
                        this.setState({
                            status: res.message,
                        });
                    } else {
                        console.log(
                            `Error on hitting ${statusURL} : Weird message response.`
                        );
                    }
                } else {
                    console.log(
                        `Error on hitting ${statusURL} : Internal error.`
                    );
                }
            })
            .catch(err => {
                console.log(
                    `Error on hitting ${statusURL} : fetch API did not like that.`
                );
            });
        // Don't do anything with the error, just log it in console
    }

    onVerify = token => {
        this.setState({
            loading: true,
        });
        const submitURL = '/api/client-form';
        fetch(submitURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recaptchaToken: token,
                name: this.nameRef ? this.nameRef.value : '',
                email: this.emailRef ? this.emailRef.value : '',
                message: this.messageRef ? this.messageRef.value : '',
            }),
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    this.infoRef && this.infoRef.showError(res.message);
                } else {
                    this.infoRef && this.infoRef.showSuccess(res.message);
                    if (this.nameRef) {
                        this.nameRef.value = '';
                    }
                    if (this.emailRef) {
                        this.emailRef.value = '';
                    }
                    if (this.messageRef) {
                        this.messageRef.value = '';
                    }
                }
                this.setState({
                    loading: false,
                });
            })
            .catch(err => {
                this.infoRef && this.infoRef.showError();
                this.setState({
                    loading: false,
                });
            });
        this.captcha.reset();
    };

    hideInfo = () => {
        this.infoRef && this.infoRef.hideInfo();
    };

    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        return (
            <>
                <Helmet title={`Hire me | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `Hire me | ${siteTitle}`,
                    }}
                />
                <noscript>
                    <style>{`.use-form { display: none; }`}</style>
                </noscript>
                <Layout>
                    <div id="content">
                        <div className="hire-me bigtext">
                            <div className="hire-me-more">
                                <Paragraph>
                                    I am an individual contractor and offer
                                    services for software development and
                                    consulting.
                                    <Subtext>
                                        If you wish to hire me for a different
                                        purpose, consider{' '}
                                        <a href="mailto:mail@arvind.io">
                                            writing me a mail
                                        </a>{' '}
                                        instead.
                                    </Subtext>
                                </Paragraph>
                                {this.state.status === 'available' && (
                                    <div>
                                        <Paragraph className="green-text">
                                            I am currently available!
                                        </Paragraph>
                                        <Paragraph className="green-text">
                                            This means I am not catering to
                                            another client's needs at present
                                            and will be able to pick up new
                                            projects immediately. If you are in
                                            need of my services, we should get
                                            in touch to discuss your
                                            requirements. Use the form below or
                                            &nbsp;
                                            <a href="mailto:mail@arvind.io">
                                                email me
                                            </a>
                                            .
                                        </Paragraph>
                                    </div>
                                )}
                                {this.state.status === 'unavailable' && (
                                    <div>
                                        <Paragraph className="red-text">
                                            I am currently unavailable!
                                        </Paragraph>
                                        <Paragraph className="red-text">
                                            This means I am at present either
                                            involved with another client, or I
                                            am preoccupied / taking time off for
                                            personal reasons. I will still
                                            however respond to queries and offer
                                            technical advice on the side. If you
                                            are in need of my services, we
                                            should get in touch so I can take
                                            you on as my next client as soon as
                                            I am available. Use the form below
                                            or &nbsp;
                                            <a href="mailto:mail@arvind.io">
                                                email me
                                            </a>
                                            .
                                        </Paragraph>
                                    </div>
                                )}
                                <Paragraph>
                                    I have experience architecting and
                                    developing diverse tech solutions at scale
                                    for small to medium sized businesses for the
                                    past five years. For development, my
                                    proficiency includes React, Angular,
                                    Node.js, Typescript, and many other commonly
                                    used frameworks. My rate is 100 USD per
                                    hour.
                                </Paragraph>
                                <Paragraph>
                                    If you're someone who's just not sure where
                                    to get started with all the coding mess, you
                                    can still get in touch to understand and
                                    discuss your situation better. If necessary,
                                    I can provide abstract insights and
                                    pointers, and educate you about healthy
                                    industry standards and common pitfalls. You
                                    will not be charged unless you want
                                    consultation to specifically architect your
                                    business solution.
                                </Paragraph>
                                <div className="use-form">
                                    <Paragraph className="smaller-text">
                                        Use this form to fill out your
                                        requirements or other details, and I'll
                                        get back to you with a quote (or answer)
                                        at no charge. You can also just email me
                                        at{' '}
                                        <a href="mailto:mail@arvind.io">
                                            mail@arvind.io
                                        </a>
                                    </Paragraph>
                                    <br />
                                    <Paragraph>
                                        <div className="form-group">
                                            <label htmlFor="client-form-name">
                                                Name / Company
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="client-form-name"
                                                placeholder="John Doe"
                                                onChange={this.hideInfo}
                                                ref={e => {
                                                    this.nameRef = e;
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="client-form-email">
                                                Email address (I'll use this to
                                                get back to you)
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="client-form-email"
                                                placeholder="someone@example.com"
                                                onChange={this.hideInfo}
                                                ref={e => {
                                                    this.emailRef = e;
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="client-form-message">
                                                Details about your requirements
                                                / question / message
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="client-form-message"
                                                placeholder="Type your message here..."
                                                rows="5"
                                                onChange={this.hideInfo}
                                                ref={e => {
                                                    this.messageRef = e;
                                                }}
                                            />
                                        </div>
                                        <br />
                                        <button
                                            className={[
                                                'btn',
                                                'form-group',
                                                this.state.loading
                                                    ? 'disabled'
                                                    : '',
                                            ].join(' ')}
                                            onClick={() => {
                                                if (!this.state.loading) {
                                                    this.captcha.execute();
                                                }
                                            }}
                                        >
                                            {this.state.loading && (
                                                <img
                                                    className="btn-loading"
                                                    src="/images/loader.svg"
                                                />
                                            )}
                                            {!this.state.loading && 'Submit'}
                                        </button>
                                        <Recaptcha
                                            ref={e => (this.captcha = e)}
                                            sitekey="6LeWOCEUAAAAAPVh4ObNT7avzud3Ifsr2Tsx3HLX"
                                            size="invisible"
                                            onVerify={this.onVerify}
                                        />
                                    </Paragraph>
                                </div>
                                <NoScript>
                                    Looks like you've disabled Javascript on
                                    your browser, so you won't be able to use
                                    the handy contact form I'd written for you
                                    to get in touch with me.
                                    <br />
                                    No matter, you can still email me your
                                    requirements or other details at{' '}
                                    <a href="mailto:mail@arvind.io">
                                        mail@arvind.io
                                    </a>
                                    , and I'll get back to you with a quote (or
                                    answer) at no charge.
                                </NoScript>
                            </div>
                        </div>
                    </div>
                    <Info
                        ref={e => {
                            this.infoRef = e;
                        }}
                    />
                </Layout>
            </>
        );
    }
}

export default Hire;

export const pageQuery = graphql`
    query HireQuery {
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
