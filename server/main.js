const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.static('public'));

const DB_URL = "mongodb+srv://admin:admin@cluster0.rvhfzw8.mongodb.net/EmployeeDB"; // Replace with your MongoDB connection string
let db;

// Connect to MongoDB
async function connect2Db() {
    const client = new MongoClient(DB_URL);
    await client.connect();
    db = client.db();
    console.log("Database Started");
    await dbInitialInsert();
}

// Initial data insertion
async function dbInitialInsert() {
    await db.collection('employees').drop().catch(err => console.log("No existing collection to drop")); // Drop the collection if it exists
    const initialEmployees = [{
        id: "1",
        firstName: "Demo",
        lastName: "Demo",
        age: 20,
        dateOfJoining: "2000-01-01",
        title: "Manager",
        department: "IT",
        employeeType: "FullTime",
        currentStatus: true,
    }];
    await db.collection('employees').insertMany(initialEmployees);
}

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
        employeeList: async () => await getEmployees(),
    },
    Mutation: {
        addEmployee: async (_, { employee }) => await addEmployeeToDB(employee),
    },
};

// Fetch employees from the database
async function getEmployees() {
    return await db.collection('employees').find({}).toArray();
}

// Add an employee to the database
async function addEmployeeToDB(employee) {
    const newEmployee = {
        id: String((await db.collection('employees').countDocuments()) + 1),
        ...employee,
        currentStatus: true,
    };
    await db.collection('employees').insertOne(newEmployee);
    return newEmployee;
}

// Start the server
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    connect2Db().then(() => {
        app.listen(3000, () => {
            console.log('App started on port 3000');
            console.log('API server has started');
        });
    });
});
