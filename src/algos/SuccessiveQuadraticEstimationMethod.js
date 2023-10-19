
import { abs, evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SuccessiveQuadraticEstimationMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [x1, setx1] = useState('')
  const [del, setdel] = useState('')
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
  function succQuadratic() {
    try {
    setiter([])
    let k = 1;
    let X1 = x1;
    let x2 = X1 + del;
    
    
    while (true) {
      const tk = k;
      let fX1 = X1
      let fx2 = x2
      
      let f1 = evaluate(func,{'x':X1});
      let f2 = evaluate(func,{'x':x2});
      let x3 = f1>f2?x2+del:X1-del;
      let f3 = evaluate(func,{'x':x3});
      
      let fx3 = x3
      let fmin = Math.min(f1, f2, f3);
      let xmin = [X1, x2, x3][[f1, f2, f3].indexOf(fmin)];

      // console.log(X1, x2, x3);
      // console.log(f1, f2, f3);
      // console.log(`xmin is ${xmin} and fmin is ${fmin}`);

      let a1 = (f2 - f1) / (x2 - X1);
      let a2 = (1 / (x3 - x2)) * (((f3 - f1) / (x3 - X1)) - a1);
      let xbar = (X1 + x2) / 2 - (a1 / (2 * a2));
      let fxbar = evaluate(func,{'x':xbar});
      // console.log(xbar);
      // console.log(f1, a1, a2);

      setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x1 = {fX1} && x2 = {fx2} && x3 = {fx3}</p>
            <p className='m-0'>f(x1) = {f1} && f(x2) = {f2} && f(x3) = {f3}</p>
            <p className='m-0'>xmin = {xmin} && fmin = {(fmin)}</p>
            <p className='m-0'>a1 = {a1} && a2 = {(a2)}</p>
            <p className='m-0'>xbar = {xbar}  && f(xbar) = {fxbar}</p>
          </div>
        </div>])

      if (abs(fmin - fxbar) < acc) {
        return `Minima lies at ${xmin}`
      }

      let sortarr = [X1,x2,x3,xbar].sort(function(a,b){return evaluate(func,{'x':a}) - evaluate(func,{'x':b})});
      // if (fmin === f1) {
        // X1 = sort
      // } else if (fmin === f2) {
        X1 = sortarr[0];
        x2 = sortarr[1];
        x3 = sortarr[2];
      // } else {
        // X1 = (x3);
      // }
      k+=1;
      if(k>100){
        return "morethan100"
      }
    }} catch (err) {
      console.log(err);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (evalFunc(4) === "success") {
      let ans = succQuadratic(x1, del);
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
          <h4 className='m-3'>Minima lies at {ans}</h4>
        </div>])
      }
    }
  }


  return <>
    <form action="" onSubmit={handleSubmit}>

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <p className='m-0 text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x1 (Initial Guess):</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={x1} onChange={(e) => { setx1(parseFloat(e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter Δ:</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={del} onChange={(e) => { setdel(parseFloat(e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="accvalue">Enter accuracy:</span>
          <input type="number" required className="form-control" placeholder="" step={0.001} value={acc} onChange={(e) => { setacc(parseFloat(e.target.value)) }} aria-describedby="accvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x1 = {x1}</p>
        <p className="m-1">Δ = {del}</p>
        <p className="m-1">acc = {acc}</p>
        <p className="m-1">x2 = {x1 + del}</p>
      </div>
      {iter}
    </div>
  </>
}

export default SuccessiveQuadraticEstimationMethod;
