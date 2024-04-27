export const typeDefs = `#graphql

 type Course {
     id: ID!
     name: String!
     price: Int
     duration: Int
 }

 type Student {
    id: ID!
    name: String!
    age: Int!
    is_deleted: Boolean!
}

 type Batch {
    id: ID!
    name: String!
    students: [Student!]!
}

 type Faculty {
    id: ID!
    name: String!
    age: Int!
 }

 type Query {
    courses: [Course] 
    course(id: ID!) : Course
    batches: [Batch]
    batch(id: ID!): Batch
    faculties: [Faculty]
 }

`;

/**
 * SUPPORTED DATATYPES
 *
 *  int,
 *  float,
 *  string,
 *  boolean,
 *  ID
 */

/**
 * NOTES :
 *  We can make field required adding ! mark end of type.
 */

/**
 *   type Query is something that every graphQL schema needs to have it
 *   its job to define entry points to graph and specify the return type of those entry points
 */
