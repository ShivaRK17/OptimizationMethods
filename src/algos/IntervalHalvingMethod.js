
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const IntervalHalvingMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [a, seta] = useState('')
  const [b, setb] = useState('')
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

  function intervalHalving(fa, fb) {
    setiter([])
    try {
      fa = parseFloat(fa);
      fb = parseFloat(fb);
      let l = fb - fa;
      let k = 1;
      while (true) {
        const tk = k;
        let x1 = fa + l / 4;
        let x2 = fb - l / 4;
        
        let xm = (fa + fb) / 2;
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>xm = {xm} && f(xm) = {(evaluate(func, { 'x': xm }))}</p>
            <p className='m-0'>x1 = {x1} && f(x1) = {(evaluate(func, { 'x': x1 }))}</p>
            <p className='m-0'>x1 = {x2} && f(x2) = {(evaluate(func, { 'x': x2 }))}</p>
          </div>
        </div>])
        // console.log(xm, x1, x2);
        // console.log(evaluate(func, { x: xm }), evaluate(func, { x: x1 }), evaluate(func, { x: x2 }));

        if (evaluate(func, { x: x1 }) < evaluate(func, { x: xm })) {
          fb = (xm);
          xm = x1;
        } else if (evaluate(func, { x: x2 }) < evaluate(func, { x: xm })) {
          fa = (xm);
          xm = x2;
        } else {
          fa = (x1);
          fb = (x2);
        }

        l = Math.abs(fb - fa);

        // console.log(l);
        k+=1;
        if(k>100){
          return "morethan100";
        }
        if (Math.abs(l) < acc) {
          return `Minima Lies in Interval (${fa},${fb})`;
        }
      }
            
    } catch (error) {
      console.log(error); 
    }
    }

  const handleSubmit = (e) => {
      e.preventDefault();
      if(evalFunc(4)==="success"){
      let ans = intervalHalving(a, b);
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
        {/* <div className='btn btn-primary' onClick={() => { evalFunc(4) }}>Confirm Function</div>
        <p className='text-danger'>{result === '' ? <>✅</> : result}</p> */}

        <div className="container">
          <div className="input-group mb-3">
            <span className="input-group-text" id="avalue">Enter a:</span>
            <input type="number" required step={0.01} className="form-control" placeholder="" value={a} onChange={(e) => { seta(e.target.value) }} aria-describedby="avalue" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="bvalue">Enter b:</span>
            <input type="number" min={a} step={0.01} required className="form-control" placeholder="" value={b} onChange={(e) => { setb(e.target.value) }} aria-describedby="bvalue" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="bvalue">Enter accuracy:</span>
            <input type="number" required className="form-control" step={0.0001} placeholder="" value={acc} onChange={(e) => { setacc(e.target.value) }} aria-describedby="bvalue" />
          </div>
        </div>
        <button className='btn btn-success' type="submit">Evaluate Minima</button>
      </form>
      <div className="container">
        <h3>Iterations</h3>
        <div className="container">
          <p className="m-1">a = {a}</p>
          <p className="m-1">b = {b}</p>
          <p className="m-1">ϵ = {acc}</p>
        </div>
        {iter}
      </div>
    </>
  }

  export default IntervalHalvingMethod;
