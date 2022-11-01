const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Photo } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('photos')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        photos: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Photo.find(params).sort({ createdAt: -1 });
        },
        // place this inside of the `Query` nested object right after `photos`
        photo: async (parent, { _id }) => {
            return Photo.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('photos');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('photos');
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addPhoto: async (parent, args, context) => {
            if (context.user) {
                const photo = await Photo.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { photos: photo._id } },
                    { new: true }
                );

                return photo;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { photoId, reactionBody }, context) => {
            if (context.user) {
                const updatedPhoto = await Photo.findOneAndUpdate(
                    { _id: photoId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedPhoto;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        deleteFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // { $addToSet: { friends: friendId } },
                    { $pull: { friends: { $in: friendId } } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        
        

    }
};

module.exports = resolvers;