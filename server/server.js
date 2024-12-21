const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const sheetsRoutes = require('./routes/api/sheets');

const PORT = process.env.PORT || 3002;
const app = express();

// Enable CORS for all routes
app.use(cors());

// Your routes here
app.use('/api/sheets', (req, res) => {
    res.json({ message: "Test response" }); // Test endpoint
});

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // any other Apollo Server options
});

// Wrap the server startup in an async function
const startApolloServer = async () => {
  await server.start();
  
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function
startApolloServer().catch(error => {
  console.error('Failed to start server:', error);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

app.use('/api', sheetsRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
