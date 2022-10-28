// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Photo {
    _id: ID
    photoText: String
    createdAt: String
    username: String
    reactionCount: Int
  }
`;

// export the typeDefs
module.exports = typeDefs;
