const { User, Photo } = require("../models");

const resolvers = {
  Query: {
    photos: async () => {
      return Photo.find().sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
