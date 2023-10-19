
import {  derivative, evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewtonRaphsonMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [x1, setx1] = useState('')
  const [acc, setacc] = useState('')
  const [iter, setiter] = useState([])

  const evalFunc = (x) => {
    try {
      evaluate(func, { 'x': x })
      // setResult('')
      return "success"
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      toast('Error in function.Try expressing in terms of x. Balance the paranthesis')
      // setResult('Error in function.Try expressing in terms of x. Balance the paranthesis')
      return "error"
    }
  }

  // const f = (a) => evaluate(func, { x: a });
  const fprime = (a) => evaluate(derivative(func,'x').toString(), { x: a });
  const f2prime = (a) => evaluate(derivative(derivative(func,'x'),'x').toString(), { x: a });


  function newtonRaphson() {
    setiter([])
    let k = 1;
    let X1 = x1
    while (true) {
      const tk = k;
      const fx1 = X1;
        let fprimeX1 = fprime(X1);
        let f2primeX1 = f2prime(X1);
        // console.log(fprimeX1, f2primeX1);

        let x2 = X1 - (fprimeX1 / f2primeX1);
        // console.log(X1, x2);
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x1 = {fx1}</p>
            <p className='m-0'>f'(x1) = {fprimeX1} && f''(x1) = {f2primeX1}</p>
            <p className='m-0'>x2 = {x2}</p>
          </div>
        </div>])

        if (Math.abs(X1 - x2) < acc) {
            // console.log(fprime(x2), f2prime(x2));
            // console.log(X1, x2);
            // console.log(`Minima lies at ${x2}`);
            // break;
            return `Minima lies at ${x2}`
        }

        k++;
        if (k > 100) {
          return "morethan100"
        }
        X1 = x2;
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (evalFunc(4) === "success") {
      let ans = newtonRaphson();
      if (ans === "nomin") {
        setiter(curr => [...curr, <div className="container">
          <h4 className='m-3'>No Minima Found.Choose other parameters.</h4>
        </div>])
      } else if (ans === "morethan100") {
        setiter(curr => [...curr, <div className="container">
          <h4 className='m-3'>Iterations are more(&gt;100) .Choose other parameters.</h4>
        </div>])
      }
      else {
        setiter(curr => [...curr, <div className="container">
          <h4 className='m-3'>{ans}</h4>
        </div>])
      }
    }
  }

  return <>
    <form action="" onSubmit={handleSubmit}>

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x)(Function should be double differentiable)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <p className='m-0 text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x1 (Initial Guess):</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={x1} onChange={(e) => { setx1(e.target.value) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="accvalue">Enter accuracy:</span>
          <input type="number" required className="form-control" step={0.0001}  placeholder="" value={acc} onChange={(e) => { setacc(parseFloat(e.target.value)) }} aria-describedby="accvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x1 = {x1}</p>
        <p className="m-1">acc = {acc}</p>
        <p className="m-1">k = 1</p>
      </div>
      {iter}
    </div>
  </>
}

export default NewtonRaphsonMethod;
  