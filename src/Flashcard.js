import React, { useState, useEffect, useRef } from 'react'

function DrinkIngredients({ingredients, garnish}) {
  return (
    <div className="flashcard-options">
      {ingredients.data.map( ({name, amount, unit}) => {
        return <p className="flashcard-option" key={name}><b>{name}:</b> {amount} {unit}</p>
      })}
      <Garnish garnish={garnish} />
    </div>
  );
}

function Garnish({garnish}) {

  if (!garnish) return null;
  return (
    <div className="flashcard-option"><b>Garnish:</b> {garnish}</div>
  )
}

function BuildSteps({steps}) {
  return (
    <div className="flashcard-options build">
      {steps.data.map( ({step}, idx) => {
        return <div className="flashcard-option" key={idx}>{step}</div>
      })}
    </div>
  );
}

export default function Flashcard({
  flashcard: {
    name,
    category,
    ingredients,
    build,
    garnish,
    glassware
  }
}) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    // const width = frontEl.current.getBoundingClientRect().width
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [name, ingredients])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {name}
      </div>
      <div className="back" ref={backEl}>
        <DrinkIngredients ingredients={ingredients} garnish={garnish} />
        <BuildSteps steps={build} />
      </div>
    </div>
  )
}
