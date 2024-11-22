const { User, Package } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw AuthenticationError;
    },
    users: async () => {
        return User.find({});
    },
    packages: async () => {
        return Package.find({});
    },
    package: async (parent, args) => {
      return await Package.findById(args.id);
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addPackage: async (parent, args) => {
      return await Package.create(args);
    },
    updatePackage: async (parent, args) => {
      return await Package.findByIdAndUpdate(args.id, args, { new: true });
    },
    deletePackage: async (parent, args) => {
      return await Package.findByIdAndDelete(args.id);
    },
  },
};

module.exports = resolvers;
