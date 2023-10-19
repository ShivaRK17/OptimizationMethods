
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const GoldenSectionSearchMethod = () => {
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

  function goldenSection(a, b) {
    try {
    setiter([])
    const gr = 0.618
    let aw = 0;
    let bw = 1;
    let lw = 1;
    let k = 1;
    a = parseFloat(a);
    b = parseFloat(b);
    const accuracy = parseFloat(acc);

    while (true) {
      let w1 = aw + (gr * lw);
      let w2 = bw - (gr * lw);

      const tk = k;
      // console.log(w1, w2);

      let fw1 = evaluate(func,{'x':(w1*(b-a)) + a});
      let fw2 = evaluate(func,{'x':(w2*(b-a)) + a});

      const faw = aw;
      const fbw = bw;
      const lab = lw;

      // console.log(fw1, fw2);
      setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>aw = {faw} && bw = {fbw}</p>
            <p className='m-0'>Lw = {lab}</p>
            <p className='m-0'>w1 = {w1} && f(w1) = {(fw1)}</p>
            <p className='m-0'>w2 = {w2} && f(w2) = {(fw2)}</p>
          </div>
        </div>])

      if (w2 > w1) {
        if (fw1 > fw2) {
          aw = w1;
        } else if (fw2 > fw1) {
          bw = w2;
        } else {
          aw = w1;
          bw = w2;
        }
      } else {
        if (fw1 > fw2) {
          bw = w1;
        } else if (fw2 > fw1) {
          aw = w2;
        } else {
          bw = w1;
          aw = w2;
        }
      }

      lw = Math.abs(bw - aw);
      // console.log(aw, bw, lw);
      // console.log(lw,accuracy);
      if (lw < accuracy) {
        let resultarr = [((b - a) * w1) + a,((b - a) * w2) + a].sort()
        return `Minima lies in (${resultarr[0]}, ${resultarr[1]})`;
      }
      k++;
      if(k>100){
        return "morethan100"
      }
    }
  } catch (err) {
      console.log(err);
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (evalFunc(4) === "success") {
      let ans = goldenSection(a, b);
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
          <input type="number" required className="form-control" step={0.01} placeholder="" value={a} onChange={(e) => { seta(e.target.value) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter b:</span>
          <input type="number" min={a} required className="form-control" step={0.01} placeholder="" value={b} onChange={(e) => { setb(e.target.value) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="accvalue">Enter accuracy:</span>
          <input type="number" required className="form-control" step={0.001}  placeholder="" value={acc} onChange={(e) => { setacc(parseFloat(e.target.value)) }} aria-describedby="accvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">a = {a}</p>
        <p className="m-1">b = {b}</p>
        <p className="m-1">acc = {acc}</p>
        <p className="m-1">k = 2</p>
      </div>
      {iter}
    </div>
  </>
}

export default GoldenSectionSearchMethod;
