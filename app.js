'use strict';

/**
 * Module dependencies.
 */
const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const koa = require('koa');
const app = koa();

// database

const nano = require('nano')('http://172.16.5.104:5984');
const coNano = require('co-nano')(nano);
const horde = coNano.use('horde');

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/post/new', add));
app.use(route.get('/post/:id', show));
app.use(route.post('/post', create));

// route definitions

/**
 * Post listing.
 */

function *list() {
    let res = yield horde.view('list', 'by_date');
    this.body = yield render('list', {
        posts: res[0].rows
    });
}

/**
 * Show creation form.
 */

function *add() {
    this.body = yield render('new');
}

/**
 * Show post :id.
 */

function *show(id) {
    let res = yield horde.get(id);  
    let post = res[0].post;
    if (!post) this.throw(404, 'invalid post id');
    this.body = yield render('show', {
        post: post
    });
}

/**
 * Create a post.
 */

function *create() {
    let post = yield parse(this);
    yield horde.insert({
        post: post,
        createTime: new Date
    });
    this.redirect('/');
}


// listen

app.listen(4000);
console.log('listening on port 4000');