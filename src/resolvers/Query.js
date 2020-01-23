const info = () => `This is the API of a Hackernews Clone`;

const feed = (parent, args, context, info) => {
  return context.prisma.links();
};

module.exports = {
  info,
  feed
};
