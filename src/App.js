import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import './App.css'
import DrinkList from './DrinkList';
// import DrinkForm from './DrinkForm';


function App() {
  
  return (
      <ApolloProvider client={client}>
        {/* <DrinkForm /> */}
        <div className="container">
          <h3>The<br/>Fitzroy<br/>Cocktails</h3>
          <DrinkList />
        </div>
      </ApolloProvider>
  );
}

export default App;
