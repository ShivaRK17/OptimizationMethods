
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const FibonacciSearchMethod = () => {
  const [func, setfunc] = useState('x^2 - 3x + 2')
  const [a, seta] = useState('')
  const [b, setb] = useState('')
  const [n, setn] = useState(10)
  const [iter, setiter] = useState([])

  function generateFibonacci(argn) {
    let fib = [1, 1];
    for (let i = 2; i <= argn + 1; i++) {
      fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib;
  }

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

  function fibonacciSearch(fa, fb) {
    try {
    setiter([]) 
    fa = parseFloat(fa);
    fb = parseFloat(fb);
    setn(Number.parseInt(n))
    let fib = generateFibonacci(n);
    let k = 2;
    let l = fb - fa;
    
    while (true) {
      const tk = k;
      let lk = l * (fib[n - tk + 1] / fib[n + 1]);
      // console.log(n+1);
      // console.log(`l${k} = l(F(${n - k + 1}/F(${n + 1}))) = ${lk}`);

      const x1 = fa + lk;
      const x2 = fb - lk;
      
      const aa = fa;
      const bb = fb;

      const f1 = evaluate(func,{'x':x1});
      const f2 = evaluate(func,{'x':x2});
      // console.log(a, b);
      // console.log(x1, x2);
      setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>a = {aa} && b = {bb}</p>
            <p className='m-0'>Lk = {lk}</p>
            <p className='m-0'>x1 = {x1} && f(x1) = {(f1)}</p>
            <p className='m-0'>x2 = {x2} && f(x2) = {(f2)}</p>
          </div>
        </div>])

      if (x2 > x1) {

        if (f1 > f2) {
          fa = (x1);
        } else if (f2 > f1) {
          fb = (x2);
        } else {
          fa = (x1);
          fb = (x2);
        }
      } else {
        return `x1 is ${x1} , x2 is ${x2}`
      }
      if(k>100){
        return "morethan100"
      }

      if (k === n) {
        return `Minima lies in (${fa} , ${fb})`
      }

      k++;
    }
  } catch (err) {
    console.log(err);   
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(evalFunc(4)==="success"){
    let ans = fibonacciSearch(a, b);
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
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter a:</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={a} onChange={(e) => { seta(parseFloat(e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter b:</span>
          <input type="number" min={a} required className="form-control" step={0.01} placeholder="" value={b} onChange={(e) => { setb(parseFloat(e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter n:</span>
          <input type="number" required className="form-control" min={0} placeholder="" value={n} onChange={(e) => { setn(Number.parseInt(e.target.value)) }} aria-describedby="nvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">a = {a}</p>
        <p className="m-1">b = {b}</p>
        <p className="m-1">n = {n}</p>
        <p className="m-1">k = 2</p>
      </div>
      {iter}
    </div>
  </>
}

export default FibonacciSearchMethod;
