'use strict';

const React = require('react');
const ReactList = require('react-list');
const ReactDOMServer = require('react-dom/server');

class PostList extends React.Component {
    render() {
        return (
            <div>
            {
                this.props.data.map(function(post) {
                    return <div>{post.value}</div>
                })
            }
            </div>
        );
    }
}

module.exports = (data) => ReactDOMServer.renderToString(<PostList data={data.posts}/>);