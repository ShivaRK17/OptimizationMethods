
import { abs, evaluate, pow } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const BoundingPhaseMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [x0, setx0] = useState('')
  const [del, setdel] = useState('')
  const [iter, setiter] = useState([])


  const evalFunc = (x) => {
    try {
      evaluate(func, { 'x': x })
      // setResult('')
      return "success"
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      // setResult('Error in function.Try expressing in terms of x. Balance the paranthesis')
      toast('Error in function.Try expressing in terms of x. Balance the paranthesis')
      return "error"
    }
  }

  function boundingPhase(fx0, delx) {
    try {
      fx0 = parseFloat(fx0)
      delx = parseFloat(delx)
      let k = 0;
      setiter([])
      let fmin = evaluate(func, { 'x': fx0 - abs(delx) })
      let f = evaluate(func, { 'x': fx0 })
      let fplu = evaluate(func, { 'x': fx0 + abs(delx) });
      if(isNaN(fmin) || isNaN(f) || isNaN(fplu)){
        return "NoMin"
      }
      // console.log(fmin, f, fplu);
      if (fmin >= f && f >= fplu) {
        delx = Math.abs(delx);
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{0}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>f(x(0) - |∆|) ≥ f(x(0)) ≥ f(x(0) + |∆|)</p>
            <p className='m-0'>del = +{delx}</p>
          </div>
        </div>])
      }
      else if (fmin <= f && f <= fplu) {
        delx = -Math.abs(delx);
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{0}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>f(x(0) - |∆|) ≤ f(x(0)) ≤ f(x(0) + |∆|)</p>
            <p className='m-0'>del = {delx}</p>
          </div>
        </div>])
      }
      else {
        return "NoMin";
      }

      while (true) {
        const tk = k;
        const tx0 = fx0
        const x1 = fx0 + delx * pow(2, k);
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk+1}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x0 = {tx0} && f(x0) = {(evaluate(func, { 'x': tx0 }))}</p>
            <p className='m-0'>x1 = {x1} && f(x1) = {(evaluate(func, { 'x': x1 }))}</p>
            <p className='m-0'>del = {delx}</p>
          </div>
        </div>])
        // console.log(x0, x1);
        // console.log(evaluate(func, { 'x': x0 }), evaluate(func, { 'x': x1 }));


        if (evaluate(func, { 'x': x1 }) < evaluate(func, { 'x': tx0 })) {
          k++;
          if (k > 100) {
            return "morethan100";
          }
          fx0 = x1;
        } else {
          return (`Minima lies in interval (${Math.min(tx0-delx*pow(2,k-1),x1)}, ${Math.max(x1,tx0-delx*pow(2,k-1))})`);
        }
      }

    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(evalFunc(4)==="success"){
    let ans = boundingPhase(x0, del);
    if(ans==="NoMin"){
      setiter(curr => [...curr,<div className="container">
        <h4 className='m-3'>No Minima Found.Choose other parameters.</h4>
      </div>])
    }else if(ans==="morethan100"){
      setiter(curr => [...curr,<div className="container">
        <h4 className='m-3'>Iterations are more(&gt;100) .Choose other parameters.</h4>
      </div>])
    }
    else{
      setiter(curr => [...curr,<div className="container">
        <h4 className='m-3'>{ans}</h4>
      </div>])
    }}
  }

  return <>
    <form action="" onSubmit={handleSubmit}>

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <div className='btn btn-primary' onClick={() => { evalFunc(4) }}>Confirm Function</div>
      <p className='text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x0 (Inital Guess):</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={x0} onChange={(e) => { setx0(e.target.value) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter Δ:</span>
          <input type="number" required className="form-control" step={0.0001} placeholder="" value={del} onChange={(e) => { setdel(e.target.value) }} aria-describedby="bvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x0 = {x0}</p>
        <p className="m-1">Δ = {del}</p>
      </div>
      {iter}
    </div>
  </>
}

export default BoundingPhaseMethod;
