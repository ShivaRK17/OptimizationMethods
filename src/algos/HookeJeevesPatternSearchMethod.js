import { add, evaluate, isNull, norm, subtract } from 'mathjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const HookeJeevesPatternSearchMethod = () => {
  const [func, setfunc] = useState('x^2 +y^2 + 3x - 4y -2')
  const [a, seta] = useState(3)
  const [b, setb] = useState(3)
  const [delx, setdelx] = useState(0.5);
  const [dely, setdely] = useState(0.5);
  const [alpha, setAlpha] = useState(2)
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

  const f = ([x, y]) => {
    return evaluate(func, { 'x': x, 'y': y });
  }

  function exploratoryMove(x, delta) {
    let xc = x;

    const xval = [x, [x[0] + delta[0], x[1]], [x[0] - delta[0], x[1]]];
    const fxval = [f(x), f(xval[1]), f(xval[2])];
    const fxmin = Math.min(fxval);
    const xind = xval[fxval.indexOf(fxmin)];

    x = xind;

    const yval = [x, [x[0], x[1] + delta[1]], [x[0], x[1] - delta[1]]]
    const fyval = [f(x), f(yval[1]), f(yval[2])];
    const fymin = Math.min(fyval);
    const yind = fyval.indexOf(fymin);

    x = yind;

    if (x === xc) {
      return null;
    }
    return x;
  }

  function patternmove(xk1, currpoint) {
    return add(xk1, subtract(xk1, currpoint));
  }

  function hookejeeves() {
    try {
      setiter([])
      seta(parseFloat(a));
      setb(parseFloat(b));
      setdelx(parseFloat(delx));
      setdely(parseFloat(dely));
      setAlpha(parseFloat(alpha));
      setacc(parseFloat(acc));
      let currpoint = [a, b];
      let currdel = [delx, dely];
      let k = 0;
      function terminate(del) {
        if (norm(del)) {
          return "terminate";
        }
        else {
          del = [del[0] / alpha, del[1] / alpha];
          return del;
        }
      }
      while (true) {
        let xk1 = exploratoryMove(currpoint, currdel);
        if (isNull(xk1)) {
          const ter = terminate(currdel);
          if (ter === "terminate") {
            return `Minima lies at [${xk1[0]} , ${xk1[1]}]`;
          }
          else {
            currdel = ter;
            continue;
          }
        }
        k++;
        if (k > 50) {
          return "morethan100";
        }
        let xpk1 = patternmove(xk1, currpoint);
        let newxk1 = exploratoryMove(xpk1, currdel);
        if (f(newxk1) < f(currpoint)) {

        }
        else{
          const ter = terminate(currdel);
          if (ter === "terminate") {
            return `Minima lies at [${xk1[0]} , ${xk1[1]}]`;
          }
          else {
            currdel = ter;
            continue;
          }
        }
      }

    } catch (error) {
      console.log(error);
      toast("Error in Evaluating Minima")
    }
  }

  // // function hookejeeves() {
  // try {
  //   setiter([])
  //   seta(parseFloat(a));
  //   setb(parseFloat(b));
  //   setdelx(parseFloat(delx));
  //   setdely(parseFloat(dely));
  //   setAlpha(parseFloat(alpha));
  //   setacc(parseFloat(acc));
  //   let x0 = [a, b];
  //   let delta = [delx, dely];
  //   let k = 0;
  //   let x = x0;

  //   while (true) {
  //     // Perform an exploratory move.
  //     let xNew = exploratoryMove(x, delta);
  //     console.log(xNew);
  //     // If the exploratory move is a success, set x and go to Step 4.
  //     if (isExploratoryMoveSuccessful(xNew)) {
  //       x = xNew;
  //       gotoStep4(xNew);
  //     } else {
  //       // If the exploratory move is not a success, check if the termination parameter is met.
  //       if (isTerminationParameterMet(delta, acc)) {
  //         // Terminate the algorithm.
  //         console.log(x);
  //         return `Minima lies at [${x[0]} , ${x[1]}]`;
  //       } else {
  //         // Reduce the step increments and go back to Step 2.
  //         for (let i = 0; i < delta.length; i++) {
  //           delta[i] = delta[i] / alpha;
  //         }
  //         gotoStep2(x);
  //       }
  //     }
  //   }

  //   // Step 4: Perform the pattern move.
  //   function gotoStep4(xNew) {
  //     x = xNew;
  //     k++;
  //     xNew = patternMove(x);
  //     gotoStep5(xNew);
  //   }

  //   // Step 5: Perform another exploratory move.
  //   function gotoStep5(xNew) {
  //     xNew = exploratoryMove(xNew, delta);
  //     gotoStep6(xNew);
  //   }

  //   // Step 6: Check if the function value decreases.
  //   function gotoStep6(xNew) {
  //     if (f(xNew) < f(x)) {
  //       gotoStep4(xNew);
  //     } else {
  //       gotoStep3(xNew);
  //     }
  //   }

  //   // Step 3: Check if the termination parameter is met.
  //   function gotoStep3(x) {
  //     if (isTerminationParameterMet(delta, acc)) {
  //       return x;
  //     } else {
  //       gotoStep2(x);
  //     }
  //   }

  //   // Step 2: Perform an exploratory move.
  //   function gotoStep2(x) {
  //     x = exploratoryMove(x, delta);
  //   }

  //   // Exploratory move function.
  //   function exploratoryMove(x, delta) {
  //     console.log(x, delta);
  //     // Implement the exploratory move function here.
  //     // The exploratory move function should return a new x value.
  //     let xc = x;

  //     const xval = [x, [x[0] + delta[0], x[1]], [x[0] - delta[0], x[1]]];
  //     const fxval = [f(x), f(xval[1]), f(xval[2])];
  //     const fxmin = Math.min(fxval);
  //     const xind = xval[fxval.indexOf(fxmin)];

  //     x = xind;

  //     const yval = [x, [x[0], x[1] + delta[1]], [x[0], x[1] - delta[1]]]
  //     const fyval = [f(x), f(yval[1]), f(yval[2])];
  //     const fymin = Math.min(fyval);
  //     const yind = fyval.indexOf(fymin);

  //     x = yind;

  //     if (x === xc) {
  //       return null;
  //     }
  //     return x;
  //   }

  //   // Pattern move function.
  //   function patternMove(x, xprev) {
  //     // Implement the pattern move function here.
  //     // The pattern move function should return a new x value.
  //     return add(x, subtract(x, xprev));
  //   }

  //   // Function to check if the exploratory move is successful.
  //   function isExploratoryMoveSuccessful(xNew) {
  //     // Implement the function to check if the exploratory move is successful here.
  //     // The function should return true if the exploratory move is successful, and false otherwise.
  //     if (isNull(xNew)) {
  //       return false;
  //     }
  //     return true;
  //   }

  //   // Function to check if the termination parameter is met.
  //   function isTerminationParameterMet(delta, epsilon) {
  //     // Implement the function to check if the termination parameter is met here.
  //     // The function should return true if the termination parameter is met, and false otherwise.
  //     if (norm(delta) <= epsilon) {
  //       return true;
  //     }
  //     return false;
  //   }
  // } catch (err) {
  //   toast("Error in finding Minima")
  //   console.log(err);
  // }
  // // }

  const handleSubmit = (e) => {
    setiter([])
    e.preventDefault();
    if (evalFunc(4, 4) === "success") {
      let ans = hookejeeves();
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
          <span className="input-group-text" id="bvalue">Enter alpha (Greater than 1):</span>
          <input step={0.0001} min={1} type="number" required className="form-control" placeholder="" value={alpha} onChange={(e) => { setAlpha((e.target.value)) }} aria-describedby="nvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter ∆ (x):</span>
          <input step={0.0001} type="number" required className="form-control" placeholder="" value={delx} onChange={(e) => { setdelx((e.target.value)) }} aria-describedby="nvalue" />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="bvalue">Enter ∆ (y):</span>
          <input step={0.0001} type="number" required className="form-control" placeholder="" value={dely} onChange={(e) => { setdely((e.target.value)) }} aria-describedby="nvalue" />
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
export default HookeJeevesPatternSearchMethod;
