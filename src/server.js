import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import movieRouter from './routes/movieRoutes.js';
import watchlistRouter from './routes/watchlistRoutes.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

let specs;
try {
  specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf-8'));
} catch (error) {
  console.log('Failed to load OpenAPI specification', error);
  process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/movies', movieRouter);
app.use('/api/watchlists', watchlistRouter);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
