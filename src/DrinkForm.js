import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import IngredientsForm from './IngredientsForm';

const CREATE_DRINK = gql`
  mutation CreateDrink(
    $name: String!,
    $ingredients: DrinkIngredientsRelation
  ) {
    createDrink(data: {
      name: $name
      ingredients: $ingredients
    }) {
      name
      ingredients {
        data {
          name
          amount
        }
      }
    }
  }
`

const DRINKS_QUERY = gql`
    {
      allDrinks {
        data {
          name
          ingredients {
            data {
              name
              amount
            }
          }
        }
      }
    }
  `

function DrinkForm() {

  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm( prev => !prev );

  const [showIngredients, setShowIngredients] = useState(false);
  const toggleIngredients = e => {
    e.preventDefault();
    setShowIngredients( prev => !prev );
  }
  
  const [name, setName] = useState('');

  const [ingredients, setIngredients] = useState([{name: '', amount: '1', unit: ''}]);

  const addIngredient = e => {
    e.preventDefault();
    setIngredients([...ingredients, {name: '', amount: '1', unit: ''}]);
  }

  const [createItem, { loading, data }] = useMutation(CREATE_DRINK, {
    refetchQueries: [{ query: DRINKS_QUERY }],
    onCompleted: () => {
      setName('');
      setShowForm(false);
    }
  });

  const handleSubmit = e => {
    e.preventDefault();
    const variables = {
        name,
        ingredients: {
          create: ingredients
        }
    }

    // createItem({variables});
    console.log(variables)
    setName('');
    setIngredients([{name: '', amount: '1', unit: ''}]);
  }

  const handleChange = e => {
    if (['name', 'amount', 'unit'].includes(e.target.className) ) {
      const ingredientsCopy = [...ingredients];
      ingredientsCopy[e.target.dataset.id][e.target.className] = e.target.value;
      setIngredients(ingredientsCopy);
    };
  }

  const updateDrink = e => setName(e.target.value);

  if (showForm) {
    return (
      <form className="header" onChange={handleChange}>
        <div className="form-group">
          <label htmlFor="drink">Add Drink</label>
          <input type="text" id="drink" name='drink' value={name} disabled={loading} onChange={updateDrink} />
        </div>
        <IngredientsForm
          loading={loading}
          ingredients={ingredients}
          handleChange={handleChange}
          addIngredient={addIngredient}
          showIngredients={showIngredients}
          toggleIngredients={toggleIngredients}
        />
        {
          !showIngredients
          ? <div className="form-group">
              <button className="btn" onClick={handleSubmit} disabled={loading}>Add Drink</button>
            </div>
          : null
        }
      </form>
    );
  }

  return (
    <div className='form-group top-marg'>
      <button className='btn' onClick={toggleForm}>Add Drink</button>
    </div>
  );
}

export default DrinkForm;