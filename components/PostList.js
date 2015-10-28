'use strict';

const React = require('react');

class PostList extends React.Component {
    render() {
        return (
            <div>
                <h1>Posts</h1>
                <p>You have <strong>{this.props.data.length}</strong> posts!</p>
                <p><a href="/post/new">Create a Post</a></p>
                <ul>
                {
                    this.props.data.map(function (post) {
                        return <li>
                            <h2>{post.value}</h2>
                            <p><a href={"/post/"+post.id}>Read post</a></p>
                        </li>
                    })
                }
                </ul>
            </div>
        );
    }
}

module.exports = PostList;