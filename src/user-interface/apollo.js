import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createUploadLink } from 'apollo-upload-client'


const URL = import.meta.env.VITE_API_BASE_URL
const uploadLink = createUploadLink({
  
  uri: URL + '/api/graphql', // Keystone GraphQL
  credentials: 'include', // optional if you use cookies
  headers: {
    'apollo-require-preflight': 'true',
  },
})

export const apolloClient = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
})