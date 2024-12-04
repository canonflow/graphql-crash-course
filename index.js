import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"

// Server setup
const PORT = 4000
const server = new ApolloServer({
    // typeDefs
    // Resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server is running at port ${PORT}`)