import React from 'react'

const ListAlgos = () => {
  return (
    <>
    <div className="container" id='listcont'>
        <h3 style={{textAlign:'center',textDecoration:'underline'}}>Single Variable Optimization</h3>
        <ul>
            <li>Exhaustive Search Method</li>
            <li>Bounding Phase Method</li>
            <li>Interval Halving Method </li>
            <li>Fibonacci Search Method</li>
            <li>Golden Section Search Method</li>
            <li>Successive Quadratic Estimation Method</li>
            <li>Newton-Raphson Method</li>
            <li>Bisection Method</li>
            <li>Secant Method</li>
            <li>Cubic Search Method</li>
        </ul>
        <h3 style={{textAlign:'center',textDecoration:'underline'}}>Multi Variable Optimization</h3>
        <ul>
            <li>Box's Evolutionary Optimization Method</li>
            <li>Simplex Search Method</li>
            <li>Hooke-Jeeves Pattern Search Method</li>
            <li>Powell's Conjugate Direction Method </li>
            <li>Cauchy's (Steepest Descent) Method</li>
            <li>Newton's Method</li>
            <li>Marquardt's Method</li>
            <li>Conjugate Gradient Method</li>
        </ul>
    </div>
    </>
  )
}

export default ListAlgos