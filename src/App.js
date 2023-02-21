import React, { useState } from 'react'
import Wrapper from './components/Wrapper'
import Screen from './components/Screen'
import ButtonBox from './components/ButtonBox'
import Button from './components/Button'
import {
  numClickHandler,
  decimalClickHandler,
  signClickHandler,
  equalsClickHandler,
  invertClickHandler,
  percentClickHandler,
  resetClickHandler
} from './clickHandlers'

function App() {
  let [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0
  })
  const btnValues = [
    ['C', '+-', '%', '/'],
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '=']
  ]

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res}/>
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === '=' ? 'equals' : ''}
                value={btn}
                onClick={ (e) => {
                  btn === 'C'
                    ? resetClickHandler(e, calc, setCalc)
                    : btn === '+-'
                    ? invertClickHandler(e, calc, setCalc)
                    : btn === '%'
                    ? percentClickHandler(e, calc, setCalc)
                    : btn === '='
                    ? equalsClickHandler(e, calc, setCalc)
                    : btn === '/' || btn === '*' || btn === '-' || btn === '+'
                    ? signClickHandler(e, calc, setCalc)
                    : btn === '.'
                    ? decimalClickHandler(e, calc, setCalc)
                    : numClickHandler(e, calc, setCalc)
                  }
                }
              />
            )
          })
        }
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
