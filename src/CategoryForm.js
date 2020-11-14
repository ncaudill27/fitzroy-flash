import React from 'react';

function CategoryForm({showCategory, handleCategoryChange, toggleCategory, category}) {

  if (!showCategory) return (
    <div className='form-group'>
      <button className='btn' onClick={toggleCategory}>Category</button>
    </div>
  );
  return (
    <div className="form-group">
      <label htmlFor='category'>Category</label>
      <input
        type='text'
        id='category'
        name='category'
        value={category}
        onChange={handleCategoryChange}
      />
      <div className='form-group'>
        <button className='btn' onClick={toggleCategory}>Done</button>
      </div>
    </div>
  );
}

export default CategoryForm;