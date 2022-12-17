const express = require('express')
const app = express()
const port = process.env.PORT | 3000 
const mongoose = require("mongoose");
//const { MongoClient } = require('mongodb');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

require('dotenv').config();

mongoose
  .connect(
    "mongodb+srv://manthanank:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.re3ha3x.mongodb.net/ecommerce-backend-app"
    // "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
};

const path = require('path')
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server app listening on port ${port} and GraphQL server listening on https://localhost:${port}/graphql`);
})