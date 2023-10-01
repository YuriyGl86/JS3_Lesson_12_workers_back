const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
var slow = require('koa-slow');

const router = require('./routes');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
}));

app.use(async (ctx, next) => { // eslint-disable-line consistent-return
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

app.use(slow({
  url: /\/api\/news\//i,
  delay: 4000
}))

// TODO: write code here

app.use(router());

const port = 7071;
const server = http.createServer(app.callback());

server.listen(port);
