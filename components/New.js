'use strict';

const React = require('react');
const Button = require('./Button');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>New Post</h1>
                <p>Create a new post.</p>
                <form action="/post" method="post">
                    <p><input type="text" placeholder="Title" name="title"/></p>
                    <p><textarea placeholder="Contents" name="body"></textarea></p>
                    <p><Button type="submit">Create</Button></p>
                </form>
            </div>
        );
    }
}

module.exports = New;