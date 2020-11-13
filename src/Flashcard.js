import React, { useState, useEffect, useRef } from 'react'

function DrinkIngredients({ingredients}) {
  return (
    <div className="flashcard-options">
      {ingredients.data.map( ({name, amount, unit, base}) => {
        return <div className="flashcard-option" key={name}>{name}: {amount} {unit}</div>
      })}
    </div>
  );
}

function BuildSteps({steps}) {
  return (
    <div className="flashcard-options">
      {steps.data.map( ({step}, idx) => {
        return <div className="flashcard-option" key={idx}>{step}</div>
      })}
    </div>
  );
}

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.name, flashcard.ingredients])
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
        {flashcard.name}
      </div>
      <div className="back" ref={backEl}>
        <DrinkIngredients ingredients={flashcard.ingredients} />
        <BuildSteps steps={flashcard.build} />
      </div>
    </div>
  )
}
