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
    };

    unsetFirstLoadHandler = () => {
        this.setState({
            firstLoad: false,
        });
    };
}

export default Template;
