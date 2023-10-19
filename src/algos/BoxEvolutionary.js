
import { evaluate, matrix, norm } from 'mathjs';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BoxEvolutionary = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  const [a, seta] = useState(0)
  const [b, setb] = useState(0)
  const [del, setdel] = useState('')
  const [acc, setacc] = useState('')
  const [iter, setiter] = useState([])

  const evalFunc = (x,y) => {
    try {
      evaluate(func, { 'x': x,'y':y })
      return "success"
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      toast('Error in function.Try expressing in terms of x and y. Balance the paranthesis')
      // setResult('Error in function.Try expressing in terms of x and y. Balance the paranthesis')
      return "error"
    }
  }
  const f = (x, y) => evaluate(func, { 'x': x, 'y': y });
  // const fprime = (a) => evaluate(derivative(func, 'x').toString(), { x: a });

  function boxevol(x, y, delx, dely) {
    x = parseFloat(x);
    y = parseFloat(y);
    dely = parseFloat(delx);
    delx = parseFloat(dely);
    try {
      setiter([])
      let xbar = matrix([x, y]);
      let k = 1;
      while (true) {
        let x1, x2, x3, x4;
        const tk = k;
        const xbark = xbar;
        // console.log(xbar._data); // Accessing underlying array of xbar
        // console.log([delx, dely]);

        if (norm([delx, dely]) < acc) {
          // console.log(xbar._data); // Accessing underlying array of xbar
          return `Minima lies at ${xbar}`;
        } else {
          x1 = matrix([xbar.get([0]) - (delx / 2), xbar.get([1]) - (dely / 2)]);
          x2 = matrix([xbar.get([0]) + (delx / 2), xbar.get([1]) - (dely / 2)]);
          x3 = matrix([xbar.get([0]) - (delx / 2), xbar.get([1]) + (dely / 2)]);
          x4 = matrix([xbar.get([0]) + (delx / 2), xbar.get([1]) + (dely / 2)]);

          const fValues = [f(xbar.get([0]), xbar.get([1])), f(x1.get([0]), x1.get([1])), f(x2.get([0]), x2.get([1])), f(x3.get([0]), x3.get([1])), f(x4.get([0]), x4.get([1]))];
          const fmin = Math.min(...fValues);
          const index = fValues.indexOf(fmin);

          if (index === 0) {
            [delx, dely] = [delx / 2, dely / 2];
          } else {
            xbar = [x1, x2, x3, x4][index - 1];
          }
        }
        const delyx = delx;
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x1 = [{x1.get([0])},{x1.get([1])}] & x2 = [{x2.get([0])},{x2.get([1])}] </p>
            <p className='m-0'>x3 = [{x3.get([0])},{x3.get([1])}] & x4 = [{x4.get([0])},{x4.get([1])}]</p>
            <p className='m-0'>f(x1) = {f(x1.get([0]),x1.get([1]))} & f(x2) = {f(x2.get([0]),x2.get([1]))}</p>
            <p className='m-0'>f(x3) = {f(x2.get([0]),x2.get([1]))} & f(x4) = {f(x4.get([0]),x4.get([1]))}</p>
            <p className='m-0'>xbar = [{xbark.get([0])},{xbark.get([1])}]</p>
            <p className='m-0'>Δ = [{delyx},{delyx}]</p>
          </div>
        </div>])

        // console.log(x1._data, x2._data, x3._data, x4._data); // Accessing underlying arrays
        // console.log(f(x1.get([0]), x1.get([1])), f(x2.get([0]), x2.get([1])), f(x3.get([0]), x3.get([1])), f(x4.get([0]), x4.get([1]))); // Accessing underlying values
        // console.log(norm([delx, dely]));
        k += 1;
        if (k > 100) {
          return "morethan100"
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    seta(parseFloat(a));
    setb(parseFloat(b));
    setdel(parseFloat(del));
    setacc(parseFloat(acc));
    if (evalFunc(4,4) === "success") {
      let ans = boxevol(a, b, del, del);
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

      <label htmlFor="basic-addon1"><b>Enter Function: </b> (Express in terms of x and y)</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">Function</span>
        <input type="text" className="form-control" placeholder="" value={func} onChange={(e) => { setfunc(e.target.value) }} aria-describedby="basic-addon1" />
      </div>
      {/* <p className='m-0 text-danger'>{result === '' ? <>✅</> : result}</p> */}

      <div className="container">
        {/* <p>Enter points in form x,y</p> */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x0 (Initial Point):</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={a} onChange={(e) => { seta((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y0 (Initial Point):</span>
          <input type="number" step={0.01} required className="form-control" placeholder="" value={b} onChange={(e) => { setb((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter Δ:</span>
          <input type="number" required className="form-control" placeholder="" step={0.001} value={del} onChange={(e) => { setdel((e.target.value)) }} aria-describedby="nvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter accuracy:</span>
          <input type="number" required className="form-control" placeholder="" step={0.0001} value={acc} onChange={(e) => { setacc((e.target.value)) }} aria-describedby="nvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">a = {a}</p>
        <p className="m-1">b = {b}</p>
        <p className="m-1">Δ = {del}</p>
        <p className="m-1">accuracy = {acc}</p>

      </div>
      {iter}
    </div>
  </>
}

export default BoxEvolutionary;
