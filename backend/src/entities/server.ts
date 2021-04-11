import { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';

import routes from '../routes';
import { errorHandleMiddleware } from '../middlewares';

const server = (port: number): Express => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(routes);

  // serve static content
  app.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
  });

  app.use(express.static(path.join(__dirname, '../../../frontend', 'build')));

  app.get('/login', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../frontend', 'build', 'index.html'));
  });

  app.use(errorHandleMiddleware.notFound);

  if (app.get('env') !== 'production') {
    app.use(errorHandleMiddleware.developmentErrors);
  }

  app.use(errorHandleMiddleware.productionErrors);

  app.listen(port, () => console.log(`server is now running on port ${port}`));

  return app;
};

export default server;
