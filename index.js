import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { typeDefs } from "./schema.js";
import db from "./_db.js"

// ===== Resolvers =====
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        }
    }
}

// ===== Server setup =====
const PORT = 4000
const server = new ApolloServer({
    // typeDefs
    typeDefs,
    // Resolvers
    resolvers,
})

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server is running at port ${PORT}`)