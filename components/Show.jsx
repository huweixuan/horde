'use strict';

const React = require('react');

class Show extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.body}</p>
            </div>
        );
    }
}

module.exports = Show;