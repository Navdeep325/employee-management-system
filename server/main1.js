const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
app.use(express.static('public'));

// Sample data to simulate a database
let employees = [
    {
        id: "1",
        firstName: "Demo",
        lastName: "Demo",
        age: 20,
        dateOfJoining: "2000-01-01",
        title: "Manager",
        department: "IT",
        employeeType: "FullTime",
        currentStatus: true,
    },
];

// GraphQL Schema
const typeDefs = gql`
    scalar GraphQLDate

    type Employee {
        id: ID!
        firstName: String!
        lastName: String!
        age: Int!
        dateOfJoining: GraphQLDate!
        title: String!
        department: String!
        employeeType: String!
        currentStatus: Boolean!
    }

    input EmployeeInput {
        firstName: String!
        lastName: String!
        age: Int!
        dateOfJoining: GraphQLDate!
        title: String!
        department: String!
        employeeType: String!
    }

    type Query {
        employeeList: [Employee!]!
    }

    type Mutation {
        addEmployee(employee: EmployeeInput!): Employee
    }
`;

const resolvers = {
    Query: {
        employeeList: () => employees,
    },
    Mutation: {
        addEmployee: (_, { employee }) => {
            const newEmployee = { id: String(employees.length + 1), ...employee, currentStatus: true };
            employees.push(newEmployee);
            return newEmployee;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(3000, () => console.log('App started on port 3000'));
});
