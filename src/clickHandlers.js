const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, '')

/** CLICK FUNCTION HANDLERS **/
/**
 * @param {object} e
 * @param {object} calc
 * @param {function} setCalc
 * @returns {num, res} sets & displays the value of the button pressed between 0 - 9
 */
const numClickHandler = (e, calc, setCalc) => {
  e.preventDefault()
  const value = e.target.innerHTML

  if (removeSpaces(calc.num).length < 16) {
    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === '0'
          ? '0'
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res
    })
  }
}

/**
 * @param {*} e
 * @param {*} calc
 * @param {*} setCalc
 * @returns {num} adds a decimal to the current number
 */
const decimalClickHandler = (e, calc, setCalc) => {
  e.preventDefault()
  const value = e.target.innerHTML

  setCalc({
    ...calc,
    num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
  })
}

/**
 * @param {*} e
 * @param {*} calc
 * @param {*} setCalc
 * @returns {sign} sets the state value for the selected math operator
 */
const signClickHandler = (e, calc, setCalc) => {
  e.preventDefault()
  const value = e.target.innerHTML

  setCalc({
    ...calc,
    sign: value,
    num: 0,
    res: !calc.res && calc.num ? calc.num : calc.res
  })
}

/**
 * @param {*} e
 * @param {*} calc
 * @param {*} setCalc
 * @returns {res} performs the selected math operation and updates the result state
 */
const equalsClickHandler = (e, calc, setCalc) => {
  if (calc.sign && calc.num) {
    const math = (a, b, sign) =>
      sign === '+'
        ? a + b
        : sign === '-'
        ? a - b
        : sign === '*'
        ? a * b
        : a / b

    setCalc({
      ...calc,
      sign: '',
      num: 0,
      res:
        calc.num === '0' && calc.sign === '/'
          ? 'Cant divide with 0'
          : toLocaleString(
            math(
              Number(removeSpaces(calc.res)),
              Number(removeSpaces(calc.num)), calc.sign)
          )
    })
  }
}

const invertClickHandler = (e, calc, setCalc) => {
  setCalc({
    ...calc,
    sign: '',
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0
  })
}

const percentClickHandler = (e, calc, setCalc) => {
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
  let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0

  setCalc({
    ...calc,
    sign: '0',
    res:(res /= Math.pow(100, 1)),
    num: (num /= Math.pow(100, 1))
  })
}

const resetClickHandler = (e, calc, setCalc) => {
  setCalc({
    ...calc,
    sign: '',
    num: 0,
    res: 0
  })
}

module.exports = {
  numClickHandler,
  decimalClickHandler,
  signClickHandler,
  equalsClickHandler,
  invertClickHandler,
  percentClickHandler,
  resetClickHandler
}