import React, { useState } from 'react'
import methods from './reference'
import ExhaustiveSearchMethod from '../algos/ExhaustiveSearchMethod';
import BoundingPhaseMethod from '../algos/BoundingPhaseMethod';
import IntervalHalvingMethod from '../algos/IntervalHalvingMethod';
import FibonacciSearchMethod from '../algos/FibonacciSearchMethod';
import GoldenSectionSearchMethod from '../algos/GoldenSectionSearchMethod';
import SuccessiveQuadraticEstimationMethod from '../algos/SuccessiveQuadraticEstimationMethod';
import NewtonRaphsonMethod from '../algos/NewtonRaphsonMethod';
import BisectionMethod from '../algos/BisectionMethod';
import SecantMethod from '../algos/SecantMethod';
import CubicSearchMethod from '../algos/CubicSearchMethod';
import BoxEvolutionary from '../algos/BoxEvolutionary';
import SimplexSearchMethod from '../algos/SimplexSearchMethod';
import HookeJeevesPatternSearchMethod from '../algos/HookeJeevesPatternSearchMethod';
import PowellsConjugateDirectionMethod from '../algos/PowellsConjugateDirectionMethod';
import CauchysMethod from '../algos/CauchysMethod';
import NewtonsMethod from '../algos/NewtonsMethod';
import MarquardtsMethod from '../algos/MarquardtsMethod';
import ConjugateGradientMethod from '../algos/ConjugateGradientMethod';

const Home = () => {
    const [opt, setopt] = useState("sing")
    const [curropt, setcurropt] = useState("s1")
    const optmethdict = {
        "sing": "s1",
        "mult": "m1"
    }
    const compdict = {
        "s1": <ExhaustiveSearchMethod />,
        "s2": <BoundingPhaseMethod />,
        "s3": <IntervalHalvingMethod />,
        "s4": <FibonacciSearchMethod />,
        "s5": <GoldenSectionSearchMethod />,
        "s6": <SuccessiveQuadraticEstimationMethod />,
        "s7": <NewtonRaphsonMethod />,
        "s8": <BisectionMethod />,
        "s9": <SecantMethod />,
        "s10": <CubicSearchMethod />,
        "m1": <BoxEvolutionary />,
        "m2": <SimplexSearchMethod />,
        "m3": <HookeJeevesPatternSearchMethod />,
        "m4": <PowellsConjugateDirectionMethod />,
        "m5": <CauchysMethod />,
        "m6": <NewtonsMethod />,
        "m7": <MarquardtsMethod />,
        "m8": <ConjugateGradientMethod />
    }

    return (<>
        <div className="container" id='homecont'>
            <div className="container">
                <h3 className='m-2'><label htmlFor="SinMul">Select Optimisation</label></h3>
                <select className="form-select m-2" value={opt} onChange={(e) => { setopt(e.target.value); setcurropt(optmethdict[e.target.value]) }} aria-label="Default select example">
                    <option className='p-4' value="sing" selected>Single Variable Optimisation</option>
                    <option className='p-4' value="mult">Multi Variable Optimisation</option>
                </select>
                <h3 className='m-2 mt-4'><label htmlFor="SinMul">Select Method</label></h3>
                <select className="form-select m-2" value={curropt} onChange={(e) => { setcurropt(e.target.value) }} aria-label="Default select example">
                    {opt === "sing" ?
                        <>
                            <option value="s1" selected>Exhaustive Search Method</option>
                            <option value="s2">Bounding Phase Method</option>
                            <option value="s3">Interval Halving Method</option>
                            <option value="s4">Fibonacci Search Method</option>
                            <option value="s5">Golden Section Search Method</option>
                            <option value="s6">Successive Quadratic Estimation Method</option>
                            <option value="s7">Newton-Raphson Method</option>
                            <option value="s8">Bisection Method</option>
                            <option value="s9">Secant Method</option>
                            <option value="s10">Cubic Search Method</option>
                        </> :
                        <>
                            <option value="m1">Box's Evolutionary Optimization Method</option>
                            <option value="m2">Simplex Search Method</option>
                            <option value="m3">Hooke-Jeeves Pattern Search Method</option>
                            <option value="m4">Powell's Conjugate Direction Method</option>
                            <option value="m5">Cauchy's (Steepest Descent) Method</option>
                            <option value="m6">Newton's Method</option>
                            <option value="m7">Marquardt's Method</option>
                            <option value="m8">Conjugate Gradient Method</option>
                        </>
                    }
                </select>
            </div>
        </div>

        <div className="container" id="algocont">
            <h1 style={{ textAlign: 'center' }}>{methods[curropt]}</h1>
            <div className="container">
            {compdict[curropt]}
            </div>
        </div>

    </>
    )
}

export default Home