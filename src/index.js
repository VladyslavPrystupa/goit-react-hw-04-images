import React from 'react';
import ReactDOM from 'react-dom/client';
// import { App } from 'components/App/App';

import { useState, useEffect } from 'react';

const App = () => {
  const [value, setValue] = useState(0);
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    console.log(value);
  }, [value]);

  // useEffeмфдct(() => {
  //   document.title = `You clicked ${value} times`;
  // });

  useEffect(() => {
    console.log(firstValue);
  }, [firstValue]);

  useEffect(() => {
    console.log(secondValue);
  }, [secondValue]);

  return (
    <div>
      <p>You clicked {value} times</p>
      <button onClick={() => setValue(firstValue + secondValue)}>
        Click me
      </button>
      <button onClick={() => setFirstValue(firstValue + 1)}>
        First: {firstValue}
      </button>
      <button onClick={() => setSecondValue(secondValue + 1)}>
        Second: {secondValue}
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
