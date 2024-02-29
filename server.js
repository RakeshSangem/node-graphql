import express from 'express';
import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/http';

const PORT = process.env.PORT || 3000;

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }
    type Product {
      id: ID!
      description: String!
      price: Float
      reviews: [Review]!
    }
    type Review {
      ratin: Int
      comment: String
    }
    type Order {
      date: String!
      subtotal: Float!
      items: [OrderItem]!
    }
    type OrderItem {
      product: Product!
      quantity: Int!
    }
`);

const root = {
  products: [
    {
      id: '1',
      description: 'Product 1',
      price: 100,
      reviews: [
        {
          rating: 5,
          comment: 'Great product!',
        },
      ],
    },
    {
      id: '2',
      description: 'Product 2',
      price: 200,
      reviews: [
        {
          rating: 4,
          comment: 'Good product!',
        },
      ],
    },
  ],
  orders: [
    {
      date: '2020-01-01',
      subtotal: 300,
      items: [
        {
          product: {
            id: 'redshoe',
            description: 'old red shoe',
            price: 100,
          },
          quantity: 2,
        },
      ],
    },
  ],
};

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log('Running GraphQL server...');
});
