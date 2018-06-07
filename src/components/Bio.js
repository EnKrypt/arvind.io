import React from 'react';

import profilePic from '../../static/images/logo-icon.png'

class Bio extends React.Component {
    render() {
        return (
            <div>
                <img src={profilePic} alt={`Arvind Kumar`} style={{
                    width: '100px'
                }}/>
                <br />
                <strong>Arvind Kumar</strong>
                <br />
                I write code, make music, and study the skies. You can read
                about what I've been up to here, along with my thoughts and
                discoveries.
                <a href="https://twitter.com/TheEnKrypt">
                    You should follow him on Twitter
                </a>
            </div>
        );
    }
}

export default Bio;
