/**
 /**
 * @format
 */

import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

const Client = () => {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://10.0.2.2:5000/graphql'
    }),
	cache: new InMemoryCache(),
    connectToDevTools: true
  })
  const MmApp = new App(client).render;
  return (
    <ApolloProvider client={client}>
      <MmApp   />
    </ApolloProvider>)
}


AppRegistry.registerComponent(appName, () => Client);

