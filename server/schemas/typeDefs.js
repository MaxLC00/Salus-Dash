const typeDefs = `
  # Define the Date scalar type
  scalar Date

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Package {
    _id: ID
    name: String
    description: String
    createdAt: Date
    updatedAt: Date
    items: [String]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users: [User]
    packages: [Package]
    package(id: ID!): Package
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
    addPackage(name: String!, description: String!): Package
    updatePackage(id: ID!, name: String, description: String): Package
    deletePackage(id: ID!): Package
  }
`;

module.exports = typeDefs;
