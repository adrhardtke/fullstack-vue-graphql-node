const { ApolloServer } = require("apollo-server")

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        items (type: String): [Item]
    }

    input ItemInput {
        type: String,
        description: String
    }

    type Mutation {
        saveIten(item: ItemInput): Item
    }

`

const items = [
    {
        id: 1,
        type: 'prefix',
        description: 'Air'
    },
    {
        id: 2,
        type: 'sufix',
        description: 'Hub'
    }
]

const resolvers = {
    Query: {
        items(_, args) {
            return items.filter(item => item.type === args.type)
        }
    },
    Mutation: {
      saveItem(_, args) {
          const item = args.item
          item.id = Math.floor(Math.random() * 1000)
          items.push(item)
          return item
      }  
    }
}

const server = new ApolloServer({typeDefs, resolvers})
server.listen()