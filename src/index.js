const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find(link => link.id === args.id);
    }
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      const index = links.findIndex(link => link.id === args.id);
      if (index === -1) return null;
      links[index].url = args.url || links[index].url;
      links[index].description = args.description || links[index].description;
      return links[index];
    },

    deleteLink: (parent, args) => {
      const index = links.findIndex(link => link.id === args.id);
      if (index === -1) return null;
      return links.splice(index, 1)[0];
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Serveris running on http://localhost:4000`));
