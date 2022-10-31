// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    photos: [Photo]
    friends: [User]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Photo {
    _id: ID
    photoText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    photos(username: String): [Photo]
    photo(_id: ID!): Photo
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPhoto(photoText: String!): Photo
    addReaction(photoId: ID!, reactionBody: String!): Photo
    addFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;