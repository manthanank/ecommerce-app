const express = require('express')
const app = express()
const port = process.env.PORT | 3000 
const mongoose = require("mongoose");
//const { MongoClient } = require('mongodb');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

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

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(port, () => {
  console.log(`Server app listening on port ${port} and GraphQL server listening on https://localhost:${port}/graphql`);
})