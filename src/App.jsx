// src/App.js
import React from 'react';
import Quote from './components/Quote';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Random Quote Generator</h1>
      <Quote />
    </div>
  );
};

export default App;