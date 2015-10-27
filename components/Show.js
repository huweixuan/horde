'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

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

module.exports = (data) => ReactDOMServer.renderToString(<Show title={data.title} body={data.body}/>);