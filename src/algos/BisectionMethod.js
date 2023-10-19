
import { derivative, evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BisectionMethod = () => {
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

  const fprime = (a) => evaluate(derivative(func, 'x').toString(), { x: a });

  function bisection(a,b){
    try {
    setiter([])
    let fprimeA = fprime(a)
    let fprimeB = fprime(b)
    let k = 1;

    if (fprimeA >= 0 || fprimeB <= 0) {
        console.log("Choose other 'a' or 'b'");
        return;
    }

    let x1 = a;
    let x2 = b;

    while (true) {
      const tk = k;
        let z = (x1 + x2) / 2;

        // console.log(x1, x2, z);
        // console.log(fprime(x1), fprime(x2), fprime(z));

        let fprimeZ = fprime(z)
        let X1 = x1;
        let X2 = x2;

        setiter(curr => [...curr, <div key={tk} className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>x1 = {X1} & x2 = {X2}</p>
            <p className='m-0'>f'(x1) = {fprime(X1)} & f'(x2) = {fprime(X2)}</p>
            <p className='m-0'>z = {z} & f'(z) = {fprime(z)}</p>
          </div>
        </div>])

        if (Math.abs(fprimeZ) < acc) {
            // console.log(z);
            return `Minima lies at ${z}`;
        } else if (fprimeZ < 0) {
            x1 = z;
        } else {
            x2 = z;
        }
        k++;
        if(k>100){
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
    setacc(parseFloat(acc));
    if (evalFunc(4) === "success") {
      let ans = bisection(a,b);
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
      <p>Choose two points a and b such that f'(a) &lt; 0 and f'(b) &gt; 0</p>
      <div className="input-group mb-3">
        <span className="input-group-text" id="avalue">Enter a:</span>
        <input type="number" required className="form-control" step={0.01} placeholder="" value={a} onChange={(e) => { seta((e.target.value)) }} aria-describedby="avalue" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="bvalue">Enter b:</span>
        <input type="number" min={a} required className="form-control" step={0.01} placeholder="" value={b} onChange={(e) => { setb((e.target.value)) }} aria-describedby="bvalue" />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="bvalue">Enter accuracy:</span>
        <input type="number" required className="form-control" step={0.0001} placeholder="" value={acc} onChange={(e) => { setacc((e.target.value)) }} aria-describedby="nvalue" />
      </div>
    </div>
    <button className='btn btn-success' type="submit">Evaluate Minima</button>
  </form>
  <div className="container">
    <h3>Iterations</h3>
    <div className="container">
      <p className="m-1">a = {a}</p>
      <p className="m-1">b = {b}</p>
      <p className="m-1">accuracy = {acc}</p>
    </div>
    {iter}
  </div>
</>
}
export default BisectionMethod;
