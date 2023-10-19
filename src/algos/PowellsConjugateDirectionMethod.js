
import { add, evaluate, multiply, norm, subtract } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PowellsConjugateDirectionMethod = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  const [a, seta] = useState(2)
  const [b, setb] = useState(4)
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

  // const f = ([x, y]) => {
  //   return evaluate(func, { 'x': x, 'y': y });
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

  function powellconj() {
    try {
      setiter([])
      seta(parseFloat(a));
      setb(parseFloat(b));
      setacc(parseFloat(acc));
      let currpoint = [a, b];
      let s1 = [1, 0];
      let s2 = [0, 1];
      let k = 0;

      while (true) {
        const newfunc = func.replace(/x/g, `(${currpoint[0]}+(${s1[0]}a))`).replace(/y/g, `(${currpoint[1]}+(${s1[1]}a))`);
        let alpha = goldenSection(0, 5, newfunc);
        alpha = (alpha === "morethan100" || alpha === "error") ? 1 : alpha;
        let xk1 = add(currpoint, multiply(alpha, s1));
        
        const newfunc2 = func.replace(/x/g, `(${xk1[0]}+(${s2[0]}a))`).replace(/y/g, `(${xk1[1]}+(${s2[1]}a))`);
        let alpha2 = goldenSection(-5, 5, newfunc2);
        alpha2 = (alpha2 === "morethan100" || alpha2 === "error") ? 1 : alpha2;
        let xk2 = add(xk1, multiply(alpha2, s2));

        const newfunc3 = func.replace(/x/g, `(${xk2[0]}+(${s1[0]}a))`).replace(/y/g, `(${xk2[1]}+(${s1[1]}a))`);
        let alpha3 = goldenSection(-5, 5, newfunc3);
        alpha3 = (alpha3 === "morethan100" || alpha3 === "error") ? 1 : alpha3;
        let xk3 = add(xk2, multiply(alpha3, s1));

        // console.log(xk1,xk2,xk3);
        let d = subtract(xk3,xk1);
        const tk = k;
        setiter(curr => [...curr, <div className="input-group">
        <span className="input-group-text" id="basic-addon1">{tk}</span>
        <div className='d-flex flex-column p-3 justify-content-center'>
          <p className='m-0'>xk1 = [{xk1[0]},{xk1[1]}]</p>
          <p className='m-0'>xk2 = [{xk2[0]},{xk2[1]}]</p>
          <p className='m-0'>xk3 = [{xk3[0]},{xk3[1]}]</p>
          <p className='m-0'>alpha1 = [{alpha}]</p>
          <p className='m-0'>alpha2 = [{alpha2}]</p>
          <p className='m-0'>alpha3 = [{alpha3}]</p>
          <p className='m-0'>d = [{d[0]} , {d[1]}]</p>
        </div>
      </div>])
        k++;
        if(k>50){
          return "morethan100";
        }
        if(norm(d)<=acc){
          return `Minima lies at [${xk3[0]} , ${xk3[1]}]`
        }
        else{
          s2 = s1;
          s1 = [d[0]/norm(d),d[1]/norm(d)];
        }
      }
    } catch (err) {
      toast("Error in finding Minima")
      console.log(err);
    }
  }

  const handleSubmit = (e) => {
    setiter([])
    e.preventDefault();
    if (evalFunc(4, 4) === "success") {
      let ans = powellconj();
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
          <input type="number" required className="form-control" placeholder="" value={a} onChange={(e) => { seta((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y0 (Initial Point):</span>
          <input type="number" required className="form-control" placeholder="" value={b} onChange={(e) => { setb((e.target.value)) }} aria-describedby="bvalue" />
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
        <p className="m-1">s(1) = [1,0]</p>
        <p className="m-1">s(2) = [0,1]</p>
        {/* <p className="m-1">∇f (Initial Point) = {`[${gradi(a, b)[0]} , ${gradi(a, b)[1]}]`}</p> */}
        {/* <p className="m-1">s0 (Initial Search Direction) = {`[${-gradi(a, b)[0]} , ${-gradi(a, b)[1]}]`}</p> */}

      </div>
      {iter}
    </div>
  </>
}

export default PowellsConjugateDirectionMethod;
