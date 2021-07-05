import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { DumbNavbar, Navbar } from '../components/Navbar';
import './styles.scss';

class Template extends React.Component {
    constructor() {
        super();
        // default state values
        this.state = {
            theme: 'dark',
        };
    }

    componentDidMount() {
        try {
            const storedState = JSON.parse(localStorage.getItem('state'));
            this.setBodyClass(`${this.state.theme}-bg`);
            if (storedState && storedState.hasOwnProperty('theme')) {
                this.setState(
                    {
                        theme: storedState.theme,
                    },
                    () => {
                        this.setBodyClass(`${storedState.theme}-bg`);
                    }
                );
            } else {
                this.pushState();
            }
        } catch (e) {
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

    render() {
        return (
            <>
                <div id="top-container" className={this.state.theme}>
                    <div className="bg-underlay" />
                    <noscript>
                        <DumbNavbar />
                    </noscript>
                    <Navbar
                        theme={this.state.theme}
                        toggleTheme={this.toggleThemeHandler}
                    />
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
