import React from 'react';

function BuildForm({
  build,
  handleBuildChange,
  showBuild,
  toggleBuild,
  setBuild
}) {

  const addStep = e => {
    e.preventDefault();
    setBuild([...build, {step: ''}]);
  }

  const stepInputs = build.map( (({step}, idx) => {
    const stepId = `step-${idx}`;

    return (
        <div className='form-group' key={idx}>
          <label htmlFor={stepId}>Step {idx + 1}</label>
          <input
            type='text'
            name={stepId}
            data-id={idx}
            id={stepId}
            value={step}
            onChange={handleBuildChange}
            className='step'
          />
        </div>
      )
  }))

  if (!showBuild) return (
    <div className='form-group'>
      <button className='btn' onClick={toggleBuild}>Build Steps</button>
    </div>
  );
  return (
    <>
      {stepInputs}
      <div className='form-group'>
        {
          showBuild
          ? <>
            <button className="btn" onClick={addStep}>Add Step</button>
            <div className='form-group'>
              <button className="btn" onClick={toggleBuild}>
                Done
              </button>
            </div>
          </>
          : <button className='btn' onClick={toggleBuild}>Build</button>
        }
      </div>
    </>
  )
}

export default BuildForm;