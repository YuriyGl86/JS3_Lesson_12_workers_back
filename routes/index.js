const combineRouters = require('koa-combine-routers');

const news = require('./news/index');

const router = combineRouters(
  news,
);

module.exports = router;
