import React from 'react';

function GlasswareForm({showGlassware, glassware, handleGlasswareChange, toggleGlassware}) {
 
  if (!showGlassware) return (
    <div className='form-group'>
      <button className='btn' onClick={toggleGlassware}>Glassware</button>
    </div>
  );
  return(
    <div className='form-group'>
      <label htmlFor='garnish'>Glassware</label>
      <input
        type='text'
        id='glassware'
        name='glassware'
        value={glassware}
        onChange={handleGlasswareChange}
      />
      <div className='form-group'>
        <button className='btn' onClick={toggleGlassware}>Done</button>
      </div>
    </div>
  )
}

export default GlasswareForm;