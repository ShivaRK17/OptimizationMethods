import { add, derivative, evaluate, multiply, norm, subtract } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const ConjugateGradientMethod = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  const [a, seta] = useState(3)
  const [b, setb] = useState(3)
  const [acc, setacc] = useState(0.01)
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
  const gradient = () => {
    const grax = derivative(func, 'x').toString();
    const gray = derivative(func, 'y').toString();
    return [grax, gray]
  }
  const gradi = (x, y) => {
    return [evaluate(gradient()[0], { 'x': x, 'y': y }), evaluate(gradient()[1], { 'x': x, 'y': y })];
  }

  // const f = ([x, y]) => {
  //   return evaluate(func, { 'x': x, 'y': y });
  // }

  // const evalHess = (fun, poin) => {
  //   return evaluate(fun, { 'x': poin[0], 'y': poin[1] })
  // }

  function goldenSection(a, b, func) {
    try {
      const gr = 0.618
      let aw = 0;
      let bw = 1;
      let lw = 1;
      let k = 1;
      a = parseFloat(a);
      b = parseFloat(b);
      const accuracy = 0.01;

      while (true) {
        let w1 = aw + (gr * lw);
        let w2 = bw - (gr * lw);

        let fw1 = evaluate(func, { 'a': (w1 * (b - a)) + a });
        let fw2 = evaluate(func, { 'a': (w2 * (b - a)) + a });
        if (isNaN(fw1) || isNaN(fw2)) {
          return "error"
        }

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
          let resultarr = [((b - a) * w1) + a, ((b - a) * w2) + a].sort()
          // return `Minima lies in (${resultarr[0]}, ${resultarr[1]})`;
          return `${(resultarr[0] + resultarr[1]) / 2}`;
        }
        k++;
        if (k > 100) {
          return "morethan100"
        }
      }
    } catch (err) {
      console.log(err);
      return "error"
    }
  }

  function conjgrad() {
    try {
      setiter([])
      seta(parseFloat(a));
      setb(parseFloat(b));
      setacc(parseFloat(acc));
      let currpoint = [a,b];
      let scurr = [-gradi(a, b)[0], -gradi(a, b)[1]];
      let k = 0;
      while (true) {
        const newfunc = func.replace(/x/g, `(${currpoint[0]}+(${scurr[0]}a))`).replace(/y/g, `(${currpoint[1]}+(${scurr[1]}a))`)
        let alpha = goldenSection(0,1,newfunc);
        alpha = (alpha === "morethan100" || alpha === "error") ? 1 : alpha;
        let xk1 = add(currpoint, multiply(alpha, scurr));

        const tk = k;
        const sdd = scurr;
        setiter(curr => [...curr, <div key={tk} className="input-group">
        <span className="input-group-text" id="basic-addon1">{tk}</span>
        <div className='d-flex flex-column p-3 justify-content-center'>
          <p className='m-0'>sd = [{sdd[0]},{sdd[1]}]</p>
          <p className='m-0'>xk+1 = [{xk1[0]},{xk1[1]}]</p>
        </div>
      </div>])

        let check1 = norm(subtract(xk1,currpoint))/norm(currpoint);
        let check2= norm(gradi(xk1[0],xk1[1]));
        if(check1<=acc || check2<=acc){
          return `Minima lies at ${xk1[0]} , ${xk1[1]}`;
        }

        k++;
        if (k > 50) {
          return "morethan100";
        }
        if(!isFinite(currpoint[1]) || !isFinite(currpoint[0]) || isNaN(xk1[0]) || isNaN(xk1[1])){
          return "nomin";
        }
        let skfirst = multiply(gradi(xk1[0],xk1[1]),-1);
        let sksecondfirst = (norm(gradi(xk1[0],xk1[1])) ** 2)/(norm(gradi(currpoint[0],currpoint[1])) ** 2)
        let sksecond = multiply(sksecondfirst,scurr);
        scurr = add(skfirst,sksecond);
        currpoint = xk1;
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
      let ans = conjgrad();
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
      </div>
      <button className='btn btn-success' type="submit">Evaluate Minima</button>
    </form>
    <div className="container">
      <h3>Iterations</h3>
      <div className="container">
        <p className="m-1">x0 = {a}</p>
        <p className="m-1">y0 = {b}</p>
        <p className="m-1">accuracy = {acc}</p>
        {/* <p className="m-1">∇f (Initial Point) = {`[${gradi(a, b)[0]} , ${gradi(a, b)[1]}]`}</p> */}
        {/* <p className="m-1">s0 (Initial Search Direction) = {`[${-gradi(a, b)[0]} , ${-gradi(a, b)[1]}]`}</p> */}

      </div>
      {iter}
    </div>
  </>
}


export default ConjugateGradientMethod;
