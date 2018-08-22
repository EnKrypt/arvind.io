import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../components/Navbar';
import './styles.scss';
class Template extends React.Component {
    constructor() {
        super();
        // default state values
        this.state = {
            firstLoad: true,
            theme: 'dark',
        };
    }

    componentWillMount() {
        try {
            const storedState = JSON.parse(localStorage.getItem('state'));
            if (storedState) {
                this.unsetFirstLoadHandler();
                if (storedState.hasOwnProperty('theme')) {
                    this.setState({
                        theme: storedState.theme,
                    });
                    this.setBodyClass(`${storedState.theme}-bg`);
                }
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

    componentDidMount() {
        this.pushState();
    }

    componentDidUpdate() {
        this.pushState();
    }

    render() {
        return (
            <div id="top-container" className={this.state.theme}>
                <div className="bg-underlay" />
                <Navbar
                    firstLoad={this.state.firstLoad}
                    theme={this.state.theme}
                    toggleTheme={this.toggleThemeHandler}
                    unsetFirstLoad={this.unsetFirstLoadHandler}
                />
                {this.props.children()}
            </div>
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

    unsetFirstLoadHandler = () => {
        this.setState({
            firstLoad: false,
        });
    };

    // A bit hacky, but only required for browsers in Mac for not looking
    // ugly while scrolling past the visible region, so don't fret
    setBodyClass = name => {
        document.body.className = name;
    };
}

export default Template;
