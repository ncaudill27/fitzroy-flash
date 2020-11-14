import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import IngredientsForm from './IngredientsForm';
import GarnishForm from './GarnishForm';
import GlasswareForm from './GlasswareForm';
import BuildForm from './BuildForm';
import CategoryForm from './CategoryForm';

const CREATE_DRINK = gql`
  mutation CreateDrink(
    $name: String!,
    $category: String!,
    $garnish: String!,
    $glassware: String!,
    $ingredients: DrinkIngredientsRelation,
    $build: DrinkBuildRelation
  ) {
    createDrink(data: {
      name: $name
      category: $category
      garnish: $garnish
      glassware: $glassware
      ingredients: $ingredients
      build: $build
    }) {
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
`

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

function DrinkForm() {

  const [showForm, setShowForm] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showGlassware, setShowGlassware] = useState(false);
  const [showGarnish, setShowGarnish] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showBuild, setShowBuild] = useState(false);

  const toggleForm = () => setShowForm( prev => !prev );
  const toggleIngredients = e => {
    e.preventDefault();
    setShowIngredients( prev => !prev );
  }
  const toggleGarnish = e => {
    e.preventDefault();
    setShowGarnish( prev => !prev );
  }
  const toggleGlassware = e => {
    e.preventDefault();
    setShowGlassware( prev => !prev );
  }
  const toggleBuild = e => {
    e.preventDefault();
    setShowBuild( prev => !prev );
  }
  const toggleCategory = e => {
    e.preventDefault();
    setShowCategory( prev => !prev );
  }
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{name: '', amount: '1', unit: ''}]);
  const [garnish, setGarnish] = useState('');
  const [glassware, setGlassware] = useState('');
  const [build, setBuild] = useState([{step: ''}]);

  const handleNameChange = e => setName(e.target.value);
  const handleCategoryChange = e => setCategory(e.target.value);
  const handleIngredientChange = e => {
    if (['name', 'amount', 'unit'].includes(e.target.className) ) {
      const ingredientsCopy = [...ingredients];
      ingredientsCopy[e.target.dataset.id][e.target.className] = e.target.value;
      setIngredients(ingredientsCopy);
    };
  }
  const handleGarnishChange = e => setGarnish(e.target.value);
  const handleGlasswareChange = e => setGlassware(e.target.value);
  const handleBuildChange = e => {
    if (e.target.className === 'step') {
      const buildCopy = [...build];
      buildCopy[e.target.dataset.id][e.target.className] = e.target.value;
      setBuild(buildCopy);
    }
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
        category,
        garnish,
        glassware,
        ingredients: {
          create: ingredients
        },
        build: {
          create: build
        }
    }

    createItem({variables});
    console.log(variables)
    setName('');
    setIngredients([{name: '', amount: '1', unit: ''}]);
  }

  if (showForm) {
    return (
      <form className="header" onChange={handleIngredientChange}>
        <div className="form-group">
          <label htmlFor="drink">Drink Name</label>
          <input type="text" id="drink" name='drink' value={name} disabled={loading} onChange={handleNameChange} />
        </div>
        <CategoryForm
          showCategory={showCategory}
          handleCategoryChange={handleCategoryChange}
          toggleCategory={toggleCategory}
          category={category}
        />
        <IngredientsForm
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          setIngredients={setIngredients}
          showIngredients={showIngredients}
          toggleIngredients={toggleIngredients}
        />
        <GarnishForm 
          showGarnish={showGarnish}
          handleGarnishChange={handleGarnishChange}
          toggleGarnish={toggleGarnish}
          garnish={garnish}
        />
        <GlasswareForm
          showGlassware={showGlassware}
          handleGlasswareChange={handleGlasswareChange}
          toggleGlassware={toggleGlassware}
          glassware={glassware}
        />
        <BuildForm
          build={build}
          handleBuildChange={handleBuildChange}
          showBuild={showBuild}
          toggleBuild={toggleBuild}
          setBuild={setBuild}
        />
        {
          !showIngredients && !showGarnish
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