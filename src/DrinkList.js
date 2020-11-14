import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import FlashcardList from './FlashcardList';


const DRINKS_QUERY = gql`
    {
      allDrinks {
        data {
          name
          category
          garnish
          glassware
          ingredients {
            data {
              name
              amount
              unit
            }
          }
          build {
            data {
              step
            }
          }
        }
      }
    }
  `

  function DrinkList() {
    const [drinks, setDrinks] = useState([]);
    const { data, loading, error } = useQuery(DRINKS_QUERY);

    useEffect( () => {
      console.log(data, loading)
      console.log('Err: ', error)
      if ( data && !loading) setDrinks(data.allDrinks.data);
    }, [data, loading]);
    
    if (loading) {
      return 'loading...'
    }
    return (
      <FlashcardList flashcards={drinks} />
    )
  }

  export default DrinkList;