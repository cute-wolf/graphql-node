const info = () => `This is the API of a Hackernews Clone`;

const feed = async (parent, args, context, info) => {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter }
    ]
  } : {};

  const links = await context.prisma.links({
    where
  });

  return links;
};

module.exports = {
  info,
  feed
};
