import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { DumbNavbar, Navbar } from '../components/Navbar';
import './styles.scss';

class Template extends React.Component {
    constructor() {
        super();
        // default state values
        this.state = {
            firstLoad: true,
            theme: 'dark',
            loading: true,
        };
    }

    componentDidMount() {
        try {
            const storedState = JSON.parse(localStorage.getItem('state'));
            this.setBodyClass(`${this.state.theme}-bg`);
            if (storedState) {
                this.unsetFirstLoadHandler(() => {
                    if (storedState.hasOwnProperty('theme')) {
                        this.setState(
                            {
                                theme: storedState.theme,
                            },
                            () => {
                                this.setBodyClass(`${storedState.theme}-bg`);
                                this.doneLoading();
                            }
                        );
                    } else {
                        this.doneLoading();
                    }
                });
            } else {
                this.pushState();
                this.doneLoading();
            }
        } catch (e) {
            this.doneLoading();
            if (e instanceof SyntaxError) {
                // Something went wrong
                console.warn(
                    'Values in localStorage is not valid JSON. Clearing for next use, using defaults for now'
                );
                localStorage.removeItem('state');
            }
        }
    }

    componentDidUpdate() {
        this.pushState();
    }

    /*
     * There are a few unconventional lines of code here
     * which are needed to make this website load even
     * without Javascript. These include noscript tags
     * and some conditional styling.
     */
    render() {
        return (
            <>
                <noscript>
                    <style>{`#top-container { display: block !important; }`}</style>
                </noscript>
                <div
                    id="top-container"
                    className={this.state.theme}
                    style={{ display: this.state.loading ? 'none' : 'block' }}
                >
                    <div className="bg-underlay" />
                    <noscript>
                        <DumbNavbar />
                    </noscript>
                    {!this.state.loading && (
                        <Navbar
                            firstLoad={this.state.firstLoad}
                            theme={this.state.theme}
                            toggleTheme={this.toggleThemeHandler}
                            unsetFirstLoad={this.unsetFirstLoadHandler}
                        />
                    )}
                    {this.props.children}
                </div>
            </>
        );
    }

    pushState() {
        localStorage.setItem('state', JSON.stringify(this.state));
    }

    toggleThemeHandler = newtheme => {
        this.setState({
            theme: newtheme,
        });
        this.setBodyClass(`${newtheme}-bg`);
        // Refresh the Disqus plugin so that it matches the new theme
        if (window.DISQUS) {
            window.DISQUS.reset({
                reload: true,
            });
        }
    };

    unsetFirstLoadHandler = callback => {
        this.setState(
            {
                firstLoad: false,
            },
            callback
        );
    };

    doneLoading = () => {
        this.setState({
            loading: false,
        });
    };

    // A bit hacky, but only required for browsers in Mac for not looking
    // ugly while scrolling past the visible region, so don't fret
    setBodyClass = name => {
        document.body.className = name;
    };
}

// Easter egg clue
console.log(
    `%cNo deaths were planned. You don't remember, I see.\nAt zero I stand, but I'm not sure of thee.`,
    `color: #0094ff;`
);
/*
 *  https://i.imgur.com/6vbAVMf.png
 */

export default Template;
