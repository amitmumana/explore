```javascript
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import pg from "pg";

// const { Client } = pg;

/**
 *  DB CONNECT
 */

// const client = new Client({
//   user: "postgres",
//   host: "localhost",
//   database: "demo",
//   password: "macwell",
//   port: 27018,
// });

// client
//   .connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch((error) => console.error("Error connecting to PostgreSQL", error));

import { db } from "./_db.js";

// const getCourse = async () => {
//   try {
//     const res = await client.query(`SELECT * FROM courses`);
//   } catch (err) {
//     console.log("this is error occurrence while fetching course", err);
//   } finally {
//     await client.end(); // Close the client connection
//   }
// };

// const addCourse = async (name, price, duration) => {
//   try {
//     // Execute the SQL query to insert a new course
//     const result = await client.query("INSERT INTO courses (name, price, duration) VALUES ($1, $2, $3) RETURNING *", [
//       name,
//       price,
//       duration,
//     ]);

//     // Release the client back to the pool
//     client.release();

//     // Return the newly created course
//     return result.rows[0];
//   } catch (err) {
//     console.log("this is error occurrence while adding course", err);
//   }
// };

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
    faculty() {
      return db.faculty;
    },
    course(_, args) {
      return db.courses.find((course) => args.id === course.id);
    },
  },

  Mutation: {
    createCourse: async (_, { input }) => {
      const { name, price, duration } = input;
      try {
        return await addCourse(name, price, duration);
      } catch (error) {
        console.error("Error creating course:", error);
        throw new Error("Failed to create course");
      }
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
```
