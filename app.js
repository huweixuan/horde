'use strict';

/**
 * Module dependencies.
 */
require('node-jsx').install({extension: '.jsx'});

const render = require('./lib/render');
const logger = require('koa-logger');
const route = require('koa-route');
const parse = require('co-body');
const ejs = require('ejs');
const koa = require('koa');
const app = koa();

const Middleware = require('browserify-middleware');
const reactify = require('reactify');
Middleware.settings('transform', ['reactify']);

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

app.use(route.get('/bundles/:name', js));
app.use(route.get('/test', test));

// route definitions

/**
 * Post listing.
 */

function *list() {
    let res = yield horde.view('list', 'by_date');
    this.body = yield render('PostList', {'data': res[0].rows});
}

/**
 * Show creation form.
 */

function *add() {
    this.body = yield render('New');
}

/**
 * Show post :id.
 */

function *show(id) {
    let res = yield horde.get(id);  
    let post = res[0].post;
    if (!post) this.throw(404, 'invalid post id');
    this.body = yield render('Show', {'title': post.title, 'body': post.body});
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

function *js(name) {   
    let middleware = Middleware('./components/' + name + '.jsx');
    let req = this.req;
    let res = this.res;
    let end = res.end;

    this.body = yield function(next) {
        res.end = function(data) {
            res.end = end;
            next(null, data);
        }
        middleware(req, res, next);
    }
}

function *test() {   
    this.body = yield render('Button');
}

// listen

app.listen(4000);
console.log('listening on port 4000');