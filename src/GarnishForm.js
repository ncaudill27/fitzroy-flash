import React from 'react';

function GarnishForm({showGarnish, handleGarnishChange, toggleGarnish, garnish}) {

  if (!showGarnish) return (
    <div className='form-group'>
      <button className='btn' onClick={toggleGarnish}>Garnish</button>
    </div>
  );
  return (
    <div className="form-group">
      <label htmlFor='garnish'>Garnish</label>
      <input
        type='text'
        id='garnish'
        name='garnish'
        value={garnish}
        onChange={handleGarnishChange}
      />
      <div className='form-group'>
        <button className='btn' onClick={toggleGarnish}>Done</button>
      </div>
    </div>
  );
}

export default GarnishForm;