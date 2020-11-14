import React from 'react';
import IngredientsInput from './IngredientsInput';

function IngredientsForm({
  loading,
  ingredients,
  handleChange,
  addIngredient,
  showIngredients,
  toggleIngredients
}) {
  return <>
    <IngredientsInput ingredients={ingredients} handleChange={handleChange} showIngredients={showIngredients} addIngredient={addIngredient} />
    <div className="form-group">
      {
        showIngredients
        ? <>
          <button className="btn" onClick={addIngredient} disabled={loading}>Add Ingredient</button>
          <div className='form-group'><button className="btn" onClick={toggleIngredients} disabled={loading}>Done</button></div>
        </>
        : <button className="btn" onClick={toggleIngredients} disabled={loading}>Add Ingredients</button>
      }
    </div>
  </>
}

export default IngredientsForm;