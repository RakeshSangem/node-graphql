import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/http';

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
    type Query {
        description: String
        price: Float
    }
`);

const root = {
  description: 'RedShoe',
  price: 42.12,
};

const app = express();

app.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.listen(PORT, () => {
  console.log('Running GraphQL server...');
});
