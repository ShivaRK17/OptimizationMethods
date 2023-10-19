import { add, derivative, det, evaluate, identity, inv, matrix, multiply, norm, sqrt } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MarquardtsMethod = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  // const [result, setResult] = useState('')
  const [a, seta] = useState(0)
  const [b, setb] = useState(0)
  const [acc, setacc] = useState(0.01)
  const [lamb, setlamb] = useState(100)
  const [iter, setiter] = useState([])

  const evalFunc = (x, y) => {
    try {
      evaluate(func, { 'x': x, 'y': y })
      // setResult('')
      return "success"
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      toast('Error in function.Try expressing in terms of x and y. Balance the paranthesis')
      return "error"
    }
  }
  // const gradient = () => {
  //   const grax = derivative(func, 'x').toString();
  //   const gray = derivative(func, 'y').toString();
  //   return [grax, gray]
  // }
  // const gradi = (x, y) => {
  //   return [evaluate(gradient()[0], { 'x': x, 'y': y }), evaluate(gradient()[1], { 'x': x, 'y': y })];
  // }

  const f = ([x,y])=>{
    return evaluate(func,{ 'x': x, 'y': y });
  }

  const evalHess = (fun, poin) => {
    return evaluate(fun, { 'x': poin[0], 'y': poin[1] })
  }

  function marquadts() {
    try {
      setiter([])
      seta(parseFloat(a));
      setb(parseFloat(b));
      setacc(parseFloat(acc));
      let currpoint = [a, b];
      let k = 0;
      const grax = derivative(func, 'x').toString();
      const gray = derivative(func, 'y').toString();
      let lam = lamb;
      while (true) {
        let xk = currpoint
        const currgrad = [evaluate(grax, { 'x': currpoint[0], 'y': currpoint[1] }), evaluate(gray, { 'x': currpoint[0], 'y': currpoint[1] })]
        const grax2 = derivative(grax, 'x').toString();
        const graxy = derivative(grax, 'y').toString();
        const grayx = derivative(gray, 'x').toString();
        const gray2 = derivative(gray, 'y').toString();
        let hessian = matrix([[evalHess(grax2, currpoint), evalHess(graxy, currpoint)], [evalHess(grayx, currpoint), evalHess(gray2, currpoint)]])
        let lami = multiply(lam,identity(2))
        hessian = add(hessian,lami)
        if(det(hessian)===0){
          toast("Determinant of Hessain is zero")
          return;
        } 
        hessian = inv(hessian)
        if (norm(currgrad) <= acc) {
          return `Minima lies at ${currpoint[0]} , ${currpoint[1]}`
        }
        const tk = k;
        const sd = multiply(hessian, currgrad);
        // console.log(sd);
        // alpha = (alpha === "morethan100" || alpha === "error") ? 1 : alpha;
        // let alpha = 1;
        let xk1 = [currpoint[0] - sd.get([0]), currpoint[1] - sd.get([1])];
        // console.log(xk1);
        // console.log(norm(xk1));
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>xk = [{xk[0]},{xk[1]}]</p>
            <p className='m-0'>Hessian:</p>
            {/* <p className='m-0'>xk = {grax} {gray}</p> */}
            {/* <p className='m-0'>[{grax2} {graxy} {grayx} {gray2}]</p> */}
            <p className='m-0'>[{hessian.get([0, 0])} {hessian.get([0, 1])} ]
              <br />[{hessian.get([1, 0])} {hessian.get([1, 1])}]</p>
            <p className='m-0'>grad xk = [{currgrad[0]},{currgrad[1]}]</p>
            <p className='m-0'>xk+1 = [{xk1[0]},{xk1[1]}]</p>
            <p className='m-0'>norm = {sqrt(xk1[0] ** 2 + xk1[1] ** 2)}</p>
          </div>
        </div>])
        // if(norm(xk)<=acc){
        //   return `Minima lies at ${xk[0]}`
        // }
        if (!isFinite(xk[1]) || !isFinite(xk[0]) || isNaN(xk1[0]) || isNaN(xk1[1])) {
          return "nomin";
        }
        if (k > 50) {
          return "morethan100";
        }
        if ((norm((xk1))) <= acc) {
          return `Minima Lies at ${xk1[0]} , ${xk1[1]}`
        }
        if(f(xk1)<f(currpoint)){
          lam = lam/2;
          currpoint = xk1;
        }
        else{
          lam = 2*lam;
        }
        
        k++;

      }

    } catch (error) {
      console.log(error);
      toast("Error in Evaluating Minima")
    }
  }

  const handleSubmit = (e) => {
    setiter([])
    e.preventDefault();
    if (evalFunc(4, 4) === "success") {
      let ans = marquadts();
      if (ans === "nomin") {
        setiter(curr => [...curr, <div className="container">
          <h4 className='m-3'>No Minima Found.Choose other parameters.</h4>
        </div>])
      } else if (ans === "morethan100") {
        setiter(curr => [...curr, <div className="container">
          <h4 className='m-3'>Iterations are more(&gt;50) .Choose other parameters.</h4>
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
          <input type="number" required className="form-control" step={0.01} placeholder="" value={a} onChange={(e) => { seta((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y0 (Initial Point):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={b} onChange={(e) => { setb((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter accuracy:</span>
          <input step={0.0001} type="number" required className="form-control" placeholder="" value={acc} onChange={(e) => { setacc((e.target.value)) }} aria-describedby="nvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter  λ(large number):</span>
          <input step={0.01} type="number" required className="form-control" placeholder="" value={lamb} onChange={(e) => { setlamb((e.target.value)) }} aria-describedby="nvalue" />
        </div>
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x0 = {a}</p>
        <p className="m-1">y0 = {b}</p>
        <p className="m-1">accuracy = {acc}</p>
        <p className='m-1'>λ(large number) = {lamb}</p>

      </div>
      {iter}
    </div>
  </>
}

export default MarquardtsMethod;
  