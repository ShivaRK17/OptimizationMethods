
import { derivative, evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CubicSearchMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [x0, setx0] = useState('')
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

  const f = (a) => evaluate(func, { 'x': a })
  const fprime = (a) => evaluate(derivative(func, 'x').toString(), { x: a });

  function z(x1, x2) {
    return (3 * (f(x1) - f(x2)) / (x2 - x1)) + fprime(x1) + fprime(x2);
  }

  function w(x1, x2) {
    return ((x2 - x1) / Math.abs(x2 - x1)) * Math.sqrt((z(x1, x2) ** 2) - (fprime(x1) * fprime(x2)));
  }

  function mu(x1, x2) {
    return (fprime(x2) + w(x1, x2) - z(x1, x2)) / (fprime(x2) - fprime(x1) + (2 * w(x1, x2)));
  }

  function fxbar(x1, x2) {
    const myu = mu(x1, x2);
    if (myu === 0) {
      return x2;
    } else if (myu > 1) {
      return x1;
    }
    return x2 - (myu * (x2 - x1));
  }

  function cubicMethod(x0,delx) {
    try {
    setiter([])
    x0 = (parseFloat(x0));
    setacc(parseFloat(acc));
    delx = parseFloat(delx)
    if (fprime(x0) > 0) {
      delx = -Math.abs(delx);
    }
    let k = 1;
    let xtarr;
    while (true) {
      const x1 = x0 + delx * (2 ** k);
      if (fprime(x1) * fprime(x0) <= 0) {
        xtarr = [x0, x1];
        break;
      }
      else {
        k++;
        if(k>100){
          return "morethan100";
        }
        x0 = x1;
      }
    }
    let xt1 = xtarr[0];
    let xt2 = xtarr[1];
    k = 1;
    while (true) {
      let xbar = fxbar(xt1, xt2);
      let l = 0;
      while (f(xbar) > f(xt1)) {
        if(l>25){
          return "morethan100";
        }
        xbar = xbar - (xbar - xt1) / 2;
      }
      const tk = k;
      const fxt1 = xt1;
      const fxt2 = xt2;
      setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x1 = {fxt1} & x2 = {fxt2}</p>
            <p className='m-0'>z = {z(fxt1,fxt2)} & w = {w(fxt1,fxt2)} & mu = {mu(fxt1,fxt2)}</p>
            <p className='m-0'>xbar = {xbar} & w = {w(fxt1,fxt2)} & mu = {mu(fxt1,fxt2)}</p>
          </div>
        </div>])

      if (Math.abs(fprime(xbar)) <= acc && Math.abs((xbar - xt1) / xbar) <= acc) {
        return `Minima is at ${xbar}`;
      } else if (fprime(xbar) * fprime(xt1) < 0) {
        xt2 = xbar;
      } else {
        xt1 = xbar;
      }
      k++;
      if(k>100){
        return "morethan100";
      }
    }
          
  } catch (error) {
    console.log(error);   
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setx0(parseFloat(x0));
    setdel(parseFloat(del));
    setacc(parseFloat(acc));
    if (evalFunc(4) === "success") {
      let ans = cubicMethod(x0,del);
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

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <p className='m-0 text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        {/* <p>Choose two points a and b such that f'(a) &lt; 0 and f'(b) &gt; 0</p> */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x0 (Initial Guess):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={x0} onChange={(e) => { setx0((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter Δ:</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={del} onChange={(e) => { setdel((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="nvalue">Enter accuracy:</span>
          <input type="number" required className="form-control" step={0.0001} placeholder="" value={acc} onChange={(e) => { setacc((e.target.value)) }} aria-describedby="nvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x0 = {x0}</p>
        <p className="m-1">Δ = {del}</p>
        <p className="m-1">accuracy = {acc}</p>
      </div>
      {iter}
    </div>
  </>
}

export default CubicSearchMethod;
