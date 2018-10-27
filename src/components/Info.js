import React from 'react';

const defaultErrorMessage =
    'Something went wrong. If this issue persists, things might have broken.';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type: 'error',
            text: defaultErrorMessage,
        };
        this.timeoutID = undefined;
        this.showInfoDuration = 5000;
    }

    clearExistingTimeout = () => {
        if (this.timeoutID) {
            clearTimeout(this.timeoutID);
            this.timeoutID = undefined;
        }
    };

    hideInfo = () => {
        this.setState({
            visible: false,
        });
    };

    showSuccess = message => {
        this.clearExistingTimeout();
        this.setState({
            visible: true,
            type: 'success',
            text: message,
        });
        this.timeoutID = setTimeout(() => {
            this.hideInfo();
        }, this.showInfoDuration);
    };

    showError = message => {
        this.clearExistingTimeout();
        this.setState({
            visible: true,
            type: 'error',
            text: message || defaultErrorMessage,
        });
    };

    render() {
        return (
            <div
                className={[
                    'info-message',
                    this.state.visible ? 'visible' : '',
                    this.state.type,
                ].join(' ')}
            >
                <div className="info-message-text">{this.state.text}</div>
                <div className="info-message-icon" onClick={this.hideInfo}>
                    <i className="fa fa-times" aria-hidden="true" />
                </div>
            </div>
        );
    }
}

export default Info;
