import { Link } from 'gatsby';
import React from 'react';
import './styles.scss';

const PageNavigation = ({ context, children }) => {
    return (
        <div>
            {context.prevPath ? (
                <div className="previous-page-link">
                    <Link to={context.prevPath} rel="prev">
                        <i
                            className="fa fa-angle-double-left"
                            aria-hidden="true"
                        />
                        &nbsp;&nbsp; Previous Page
                    </Link>
                </div>
            ) : (
                ''
            )}
            {children}
            {context.nextPath ? (
                <div className="next-page-link">
                    <Link to={context.nextPath} rel="next">
                        <i
                            className="fa fa-angle-double-right"
                            aria-hidden="true"
                        />
                        &nbsp;&nbsp; Next Page
                    </Link>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default PageNavigation;
