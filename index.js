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
        game(parent, args) {
            return db.games.find((game) => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(parent, args) {
            return db.reviews.find((review) => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(parent, args) {
            return db.authors.find((author) => author.id === args.id)
        }
    },
    // For nested query
    Game: {
        reviews(parent) {
            return db.reviews.filter((review) => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((review) => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find((author) => author.id === parent.author_id)
        },
        game(parent) {
            return db.games.find((game) => game.id === parent.game_id)
        }
    },
    Mutation: {
        deleteGame(parent, args) {
            db.games = db.games.filter((game) => game.id !== args.id)
            return db.games
        },
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random() * 10000).toString()
            }

            db.games.push(game)

            return game
        },
        updateGame(_, args) {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits}
                }

                return game
            })

            return db.games.find((game) => game.id === args.id)
        }

    }
}

// ===== Server setup =====
const PORT = 3000
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