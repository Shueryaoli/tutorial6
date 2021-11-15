const express = require('express');
const { ApolloServer, gql, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/waitlistDB'; 
const collectionName = 'waitlist';


let db;
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}


const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	scalar GraphQLDate
    type Wait {
		_id: ID
		id: Int!
		name: String!
		number: String!
		created: GraphQLDate
	}
	input WaitInputs {
	  name: String!
	  number: String!
	}
	type Query {
	  waitList: [Wait!]!
	}
	type Mutation {
		waitAdd(wait: WaitInputs!): Wait!
		waitDelete(id:Int!):  Boolean!
	}
`;


function waitValidate(wait) {
  const errors = [];
  if (wait.name.length < 3) {
    errors.push('Please enter your name.');
  }
  if (wait.number.length <= 0) {
    errors.push('Please enter the phone number');
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function getNextSequence(name) {
  const result = await db.collection("counters").findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    waitList: async () =>  {
	    const waits = await db.collection(collectionName).find({}).toArray();
	    return waits;
	}
   },
   Mutation: {
       waitAdd :async  (_, { wait }) =>{
				  waitValidate(wait);
				  wait.created = new Date();
				  wait.id = await getNextSequence('wait');

				  const result = await db.collection(collectionName).insertOne(wait);
				  const savedWait = await db.collection(collectionName)
					.findOne({ _id: result.insertedId });
				  return savedWait;
			},
		waitDelete:async(_, { id }) =>{
			var query = { id: 1 };
			const result = await db.collection(collectionName).deleteOne(query);
			return true;
		}
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });



(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('API server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
