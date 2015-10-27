'use strict';

const React = require('react');
const ReactDOMServer = require('react-dom/server');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>New Post</h1>
                <p>Create a new post.</p>
                <form action="/post" method="post">
                    <p><input type="text" placeholder="Title" name="title"/></p>
                    <p><textarea placeholder="Contents" name="body"></textarea></p>
                    <p><input type="submit" value="Create"/></p>
                </form>
            </div>
        );
    }
}

module.exports = () => ReactDOMServer.renderToString(<New/>);