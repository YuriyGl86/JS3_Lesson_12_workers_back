const Router = require('koa-router');

const router = new Router();

router.get('/api/news/', async (ctx) => {
  console.log('запрос');

  const body = `новости с сервера2 ${Date.now()}`;
  ctx.response.body = body;
});

module.exports = router;
