import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

/**
 *  DB CONNECT
 */

import { db } from "./_db.js";

/**
 *  TYPES
 */

import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    courses() {
      return db.courses;
    },
    batches() {
      return db.batches;
    },
    faculties() {
      return db.faculties;
    },
    course(_, args) {
      return db.courses.find((course) => args.id === course.id);
    },
    batch(_, args) {
      return db.batches.find((batch) => args.id === batch.id);
    },
  },
};

/**
 *  CREATE SERVER
 */
const server = new ApolloServer({
  /**
   *   Type definitions and these are descriptions of data types and the relationship
   *   they have with other data types, or schema.
   */

  typeDefs,

  /**
   *  RESOLVER - functions that determine how to respond to queries for different data on graph
   */

  resolvers,
});

/**
 *  INITIALIZE SERVER
 */

startStandaloneServer(server, { port: 8080 }).then(({ url }) => {
  console.log("Server ready at", url);
});
