import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import Meta from '../components/Meta';

const Paragraph = ({ children, className }) => (
    <div className={['hire-para', className].join(' ')}>{children}</div>
);

class Hire extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        return (
            <div id="content">
                <Helmet title={`Hire me | ${siteTitle}`} />
                <Meta
                    metadata={{
                        ...this.props.data.site.siteMetadata,
                        title: `Hire me | ${siteTitle}`,
                    }}
                />
                <div className="hire-me bigtext">
                    <div className="bigtext">Hey there!</div>
                    <br />
                    <div className="hire-me-more">
                        <Paragraph>
                            I am an individual contractor and offer services for
                            development and consulting.
                        </Paragraph>
                        <Paragraph className="green-text">
                            I am currently available!
                        </Paragraph>
                        <Paragraph className="green-text">
                            This means I am not catering to another client's
                            needs at present and will be able to pick up new
                            projects immediately. If you are in need of my
                            services, we should get in touch to discuss your
                            requirements. Use the form below or &nbsp;<a href="mailto:mail@arvind.io">
                                email me
                            </a>.
                        </Paragraph>
                        Uncomment when unavailable
                        <Paragraph className="red-text">
                            I am currently unavailable!
                        </Paragraph>
                        <Paragraph className="red-text">
                            This means I am at present either involved with
                            another client, or I am preoccupied / taking time
                            off for personal reasons. I will still however
                            respond to queries and offer technical advice on the
                            side. If you are in need of my services, we should
                            get in touch so I can take you on as my next client
                            as soon as I am available. Use the form below or
                            &nbsp;<a href="mailto:mail@arvind.io">email me</a>.
                        </Paragraph>
                        <Paragraph>
                            I have experience architecting and developing
                            complex tech solutions at scale for small to medium
                            sized businesses for the past 4 years. My rate is 40
                            USD per hour.
                        </Paragraph>
                        <Paragraph>
                            If you're someone who's just not sure where to get
                            started with all the coding mess, you can still get
                            in touch to understand and discuss your situation
                            better. If necessary, I can provide abstract
                            insights and pointers, and educate you about healthy
                            industry standards and common pitfalls. You will not
                            be charged unless you want consultation to
                            specifically architect your business solution.
                        </Paragraph>
                        <Paragraph className="smaller-text">
                            Use this form to fill out your requirements or other
                            details, and I'll get back to you with a quote (or
                            answer) at no charge. You can also just email me at{' '}
                            <a href="mailto:mail@arvind.io">mail@arvind.io</a>
                        </Paragraph>
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
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="client-form-email">
                                    Email address (I'll use this to get back to
                                    you)
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="client-form-email"
                                    placeholder="someone@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="client-form-message">
                                    Details about your requirements / question /
                                    message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="client-form-message"
                                    placeholder="Type your message here..."
                                    rows="5"
                                />
                            </div>
                            <br />
                            <button className="btn form-group">Submit</button>
                        </Paragraph>
                    </div>
                </div>
            </div>
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
            }
        }
    }
`;
