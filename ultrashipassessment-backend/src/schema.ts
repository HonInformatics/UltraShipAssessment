import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
  }

  type Query {
    employees(
      page: Int
      limit: Int
      sortBy: String
      sortOrder: String
      filterName: String
      filterClass: String
    ): [Employee!]!
    
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String!]!
      attendance: Float!
    ): Employee!

    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String!]
      attendance: Float
    ): Employee!
  }
`;
