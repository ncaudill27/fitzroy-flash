import React from 'react';
import IngredientsInput from './IngredientsInput';

function IngredientsForm({
  ingredients,
  handleIngredientChange,
  showIngredients,
  toggleIngredients,
  setIngredients
}) {

  const addIngredient = e => {
    e.preventDefault();
    setIngredients([...ingredients, {name: '', amount: '1', unit: ''}]);
  }

  return <>
    <IngredientsInput
      ingredients={ingredients}
      handleIngredientChange={handleIngredientChange}
      showIngredients={showIngredients}
      addIngredient={addIngredient}
    />
    <div className="form-group">
      {
        showIngredients
        ? <>
          <button className="btn" onClick={addIngredient}>Add Ingredient</button>
          <div className='form-group'>
            <button className="btn" onClick={toggleIngredients}>
              Done
            </button>
          </div>
        </>
        : <button className="btn" onClick={toggleIngredients}>Ingredients</button>
      }
    </div>
  </>
}

export default IngredientsForm;