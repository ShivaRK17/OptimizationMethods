import { evaluate, pow, sqrt } from 'mathjs';
import { toast } from 'react-toastify';

import React, { useState } from 'react';

const SimplexSearchMethod = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  const [x0, setX0] = useState(0)
  const [y0, setY0] = useState(0)
  const [x1, setX1] = useState(2)
  const [y1, setY1] = useState(0)
  const [x2, setX2] = useState(1)
  const [y2, setY2] = useState(1)

  const [gamm, setgamm] = useState(2)
  const [bet, setbet] = useState(0.5)
  const [acc, setacc] = useState(0.01)
  const [iter, setiter] = useState([])

  const evalFunc = (x,y) => {
    try {
      evaluate(func, { 'x': x,'y':y })
      return "success"
      // setResult(evaluate(func,{'x':x}))
    }
    catch (ex) {
      toast('Error in function.Try expressing in terms of x and y. Balance the paranthesis')
      return "error"
    }
  }
  const f = (x, y) => evaluate(func, { 'x': x, 'y': y });
  // const fprime = (a) => evaluate(derivative(func, 'x').toString(), { x: a });

  function areNotCollinear(x1, y1, x2, y2, x3, y3) {
    if (x1 === x2 && y1 === y2) return false;
    if (x1 === x3 && y1 === y3) return false;
    if (x2 === x3 && y2 === y3) return false;
    const slope1 = (y2 - y1) / (x2 - x1);
    const slope2 = (y3 - y2) / (x3 - x2);
    const slope3 = (y3 - y1) / (x3 - x1);

    return slope1 !== slope2 && slope1 !== slope3 && slope2 !== slope3;
}

  function simplex() {
    setX0(parseFloat(x0));
    setX1(parseFloat(x1));
    setX2(parseFloat(x2));
    setY0(parseFloat(y0));
    setY1(parseFloat(y1));
    setY2(parseFloat(y2));
    setbet(parseFloat(bet));
    setgamm(parseFloat(gamm));
    setacc(parseFloat(acc));
    if(areNotCollinear(x0,y0,x1, y1, x2, y2)===false){
      toast("Given points form a Straight Line")
      return;
    }
    setiter([])
    try {
      let sortSimp = [[x0,y0], [x1,y1], [x2,y2]];
    let k = 0;

    while (true) {
        sortSimp.sort((a, b) => f(a[0],a[1]) - f(b[0],b[1]));
        let xh = sortSimp[2];
        let xl = sortSimp[0];
        let xg = sortSimp[1];
        let xc = [(xl[0] + xg[0]) / 2, (xl[1] + xg[1]) / 2];
        let xr = [2 * xc[0] - xh[0], 2 * xc[1] - xh[1]];
        let xNew = xr;

        if (f(xr[0],xr[1]) < f(xl[0],xl[1])) {
            xNew = [(1 + gamm) * xc[0] - gamm * xh[0], (1 + gamm) * xc[1] - gamm * xh[1]];
        } else if (f(xr[0],xr[1]) >= f(xh[0],xh[1])) {
            xNew = [(1 - bet) * xc[0] + bet * xh[0], (1 - bet) * xc[1] + bet * xh[1]];
        } else if (f(xg[0],xg[1]) < f(xr[0],xr[1]) && f(xr[0],xr[1]) < f(xh[0],xh[1])) {
            xNew = [(1 + bet) * xc[0] - bet * xh[0], (1 + bet) * xc[1] - bet * xh[1]];
        }

        sortSimp[2] = xNew;

        // console.log(sortSimp.map(point => f(point)));
        // console.log(`xc is ${xc}; xr = ${xr}; xnew is ${xNew}, f(xnew) = ${f(xNew)}`);
        const tk = k;
        let sumix = pow(f(sortSimp[0][0],sortSimp[0][1])-f(xc[0],xc[1]),2)+pow(f(sortSimp[1][0],sortSimp[1][1])-f(xc[0],xc[1]),2)+pow(f(sortSimp[2][0],sortSimp[2][1])-f(xc[0],xc[1]),2)
        const q = sqrt((sumix)/3);
        setiter(curr => [...curr, <div className="input-group">
          <span className="input-group-text" id="basic-addon1">{tk}</span>
          <div className='d-flex flex-column p-3 justify-content-center'>
            <p className='m-0'>xl = [{xl[0]},{xl[1]}] & xg = [{xg[0]},{xg[1]}] &  xh = [{xh[0]},{xh[1]}]</p>
            <p className='m-0'>f(xl) = {f(xl[0],xl[1])} & f(xg) = [{f(xg[0],xg[1])}] &  f(xh) = [{f(xh[0],xh[1])}]</p>
            <p className='m-0'>Q = {q}</p>
          </div>
        </div>])
        // console.log(q);

        k++;

        if (q < acc) {
            return (`Minima lies in (${sortSimp.map(point => point[0]).reduce((sum, val) => sum + val, 0) / sortSimp.length} , ${sortSimp.map(point => point[1]).reduce((sum, val) => sum + val, 0) / sortSimp.length})`);
        }

        if (k === 100) {
            return "morethan100";
        }
    }
    } catch (err) {
      console.log(err);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (evalFunc(4,4) === "success") {
      let ans = simplex();
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
          <input type="number" required className="form-control" step={0.01} placeholder="" value={x0} onChange={(e) => { setX0((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y0 (Initial Point):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={y0} onChange={(e) => { setY0((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x1 (Initial Point):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={x1} onChange={(e) => { setX1((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y1 (Initial Point):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={y1} onChange={(e) => { setY1((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="avalue">Enter x2 (Initial Point):</span>
          <input type="number" required className="form-control" step={0.01} placeholder="" value={x2} onChange={(e) => { setX2((e.target.value)) }} aria-describedby="avalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter y2 (Initial Point):</span>
          <input type="number" required className="form-control" placeholder="" step={0.01} value={y2} onChange={(e) => { setY2((e.target.value)) }} aria-describedby="bvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter gamma:</span>
          <input type="number" min={1} step={0.01} required className="form-control" placeholder="" value={gamm} onChange={(e) => { setgamm((e.target.value)) }} aria-describedby="nvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter Beta:</span>
          <input type="number" min={0} max={1} step={0.01} required className="form-control" placeholder="" value={bet} onChange={(e) => { setbet((e.target.value)) }} aria-describedby="nvalue" />
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
        <p className="m-1">x0 = [{x0},{y0}]</p>
        <p className="m-1">x1 = [{x1},{y1}]</p>
        <p className="m-1">x2 = [{x2},{y2}]</p>
        <p className="m-1">gamma = {gamm}</p>
        <p className="m-1">beta = {bet}</p>
        <p className="m-1">accuracy = {acc}</p>

      </div>
      {iter}
    </div>
  </>
}

export default SimplexSearchMethod;
  