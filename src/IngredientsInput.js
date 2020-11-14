import React from 'react';

function IngredientsInput({ingredients, handleChange, showIngredients}) {

  if (!showIngredients) return null;
  return ingredients.map( (ingredient, idx) => {
    const nameId = `name-${idx}`;
    const amountId = `amount-${idx}`;
    const unitId = `unit-${idx}`;

    return (
      <div key={idx}>
        <div className='form-group'>
          <label htmlFor={nameId}>Ingredient {idx + 1}</label>
          <input
            type='text'
            name={nameId}
            data-id={idx}
            id={nameId}
            value={ingredient.name}
            className='name'
            onChange={handleChange}
          />
          <label htmlFor={amountId}>Amount</label>
          <input
            type='number'
            name={amountId}
            data-id={idx}
            id={amountId}
            value={ingredient.amount}
            className='amount'
            step='0.25'
            min='0.25'
            onChange={handleChange}
          />
          <label htmlFor={unitId}>Unit</label>
          <input
            type='text'
            name={unitId}
            data-id={idx}
            id={unitId}
            value={ingredient.unit}
            className='unit'
            onChange={handleChange}
          />          
        </div>
      </div>
    );
  });
}

export default IngredientsInput;