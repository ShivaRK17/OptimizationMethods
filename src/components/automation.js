const fs = require('fs');

const methods = [
  "Exhaustive Search Method",
  "Bounding Phase Method",
  "Interval Halving Method",
  "Fibonacci Search Method",
  "Golden Section Search Method",
  "Successive Quadratic Estimation Method",
  "Newton-Raphson Method",
  "Bisection Method",
  "Secant Method",
  "Cubic Search Method",
  "Box's Evolutionary Optimization Method",
  "Simplex Search Method",
  "Hooke-Jeeves Pattern Search Method",
  "Powell's Conjugate Direction Method",
  "Cauchy's (Steepest Descent) Method",
  "Newton's Method",
  "Marquardt's Method",
  "Conjugate Gradient Method"
];

methods.forEach(method => {
  const fileName = method.replace(/\s+/g, ''); // Remove spaces
  const content = `
import React from 'react';

const ${fileName} = () => {
  return <div>${method}</div>;
}

export default ${fileName};
  `;
  fs.writeFileSync(`${fileName}.js`, content);
  console.log(`${fileName}.js created.`);
});
