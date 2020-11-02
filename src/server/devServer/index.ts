import webpack, { WebpackOptions } from 'webpack';
import koaWebpack from 'koa-webpack';

import { render } from '../middlewares/render';
import { app } from '../app';
import config from '../../../webpack.config';

const compiler = webpack(config({}, { mode: 'development' })[0] as WebpackOptions);
koaWebpack({ compiler }).then((middleware): void => {
  app.use(middleware);
  app.use(render);
});
