import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ExhaustiveSearchMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [a, seta] = useState('')
  const [b, setb] = useState('')
  const [n, setn] = useState('')
  const [iter, setIter] = useState([])


  const evalFunc = (x) => {
    try {
      evaluate(func, { 'x': x })
      // setResult('')
      return "success";
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      toast('Error in function.Try expressing in terms of x. Balance the paranthesis')
      // setResult('Error in function.Try expressing in terms of x. Balance the paranthesis')
      return "error";
    }
  }

  function exhaustiveSearch(a, b, n) {
    setIter([])
    let x1 = parseFloat(a);
    const delx = parseFloat((b - a) / n);
    let x2 = parseFloat(x1 + delx);
    let x3 = parseFloat(x2 + delx);
    let k = 1;

    while (true) {
      const f1 = evaluate(func, { x: x1 });
      const f2 = evaluate(func, { x: x2 });
      const f3 = evaluate(func, { x: x3 });
      const tk = k
      const tx1 = x1
      const tx2 = x2
      const tx3 = x3
      setIter(curr => [...curr, <div className="input-group">
        <span className="input-group-text" id="basic-addon1">{tk}</span>
        <div className='d-flex flex-column p-3 justify-content-center'>
          <p className='m-0'>x1 = {tx1}  f(x1) = {f1}</p>
          <p className='m-0'>x2 = {tx2}  f(x2) = {f2}</p>
          <p className='m-0'>x3 = {tx3}  f(x3) = {f3}</p>
        </div>
      </div>])

      if (!isNaN(f1) && !isNaN(f2) && !isNaN(f3)) {
        if (f1 >= f2 && f2 <= f3) {
          return [x1, x2, x3];
        }
      } else {
        return null;
      }

      x1 = x2;
      x2 = x3;
      x3 = x2 + delx;
      k += 1
      if (k > 100) {
        return "morethan100"
      }
      if (x3 > b) {
        return "No Minima";
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (evalFunc(4) === "success") {
      let ans = exhaustiveSearch(a, b, n)
      if (ans === "No Minima") {
        setIter(<div className="input-group">
          <span className="input-group-text" id="basic-addon1">1</span>
          <div className='d-flex flex-column p-2'>
            <p>No Minima Exists in the Given Bounds</p>
          </div>
        </div>)
      }
      else if (ans === "morethan100") {
        setIter(curr => [...curr, <div className="container">
          <h4 className='m-3'>Iterations are more(&gt;100) .Choose other parameters.</h4>
        </div>])
      }
      else if (ans === null) {
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">1</span>
          <div className='d-flex flex-column p-2'>
            <p className='m-0'>The Minima cannot be evaluated</p>
          </div>
        </div>
      }
      else {
        setIter(curr => [...curr, <div className="container">
          <h4 className='m-3'>Minima lies in ({ans[0]},{ans[2]})</h4>
          <h5 className='m-3'>x2 =  {ans[1]}</h5>
        </div>])
      }
    }
    // console.log(iter);
  }


  return <>
    <form action="" onSubmit={handleSubmit}>

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <div className='btn btn-primary' onClick={() => { evalFunc(4) }}>Confirm Function</div> */}
      {/* <p className='text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter a:</span>
          <input type="number" required className="form-control" placeholder="" value={a} onChange={(e) => { seta(e.target.value) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter b:</span>
          <input type="number" step={0.01} min={a} required className="form-control" placeholder="" value={b} onChange={(e) => { setb(e.target.value) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="nvalue">Enter n:</span>
          <input type="number" step={0.01} min={1} required className="form-control" placeholder="" value={n} onChange={(e) => { setn(e.target.value) }} aria-describedby="nvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <br />
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className='m-1'>x1 = a =  {a === null ? '' : a}</p>
        <p className='m-1'>n = {n === null ? '' : n}</p>
        <p className='m-1'>Δ = {((a === null || b === null || n === null)) ? '' : (b - a) / n}</p>
        <p className='m-1'>x2 = x1 + Δ =  {((a === null || b === null || n === null)) ? '' : a + (b - a) / n}</p>
        <p className='m-1'>x3 = x2 + Δ = {((a === null || b === null || n === null)) ? '' : a + 2 * (b - a) / n}</p>
      </div>
    </div>
    {iter}
  </>
}

export default ExhaustiveSearchMethod;
