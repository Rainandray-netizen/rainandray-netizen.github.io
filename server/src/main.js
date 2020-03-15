import { ApolloServer, gql } from 'apollo-server'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'

const pool = new Pool

const typeDefs = gql`
  type Query {
    "A test"
    test: String!
  }

  type Mutation {
    signup(input:SignupInput): User!
    login(input:LoginInput): User!
  }

  input SignupInput {
    username: String!
    password: String!
    email: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type User {
    id:ID!
    email:String!
    username: String!
    timestamp: String!
  }
`

const resolvers = {
  Query: {
    test: ()=>'test successful'
  },
  Mutation:{
    signup:async (source,args)=>{
      const { username, email, password } = args.input

      const hashPass = await pool.query(`
        SELECT * FROM users WHERE username = $1
      `,[username])

      if (hashPass == null){
        return {error:'username or password is incorrect'}
      }

      const results = await pool.query(`
        INSERT INTO users (username,password_hash,email)
        VALUES($1,$2,$3)
        RETURNING *
      `,[username,hashPass,email])
  
      return results.rows[0]
    }
  },
  login: async (source, args) => {
    const { username, password } = args.input

    const hashPass = await bcrypt.hash()
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});