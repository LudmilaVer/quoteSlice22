// src/components/Quote.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRandomQuote } from '../features/quote/quoteSlice';
import styles from './Quote.module.css';

const Quote = () => {
  const dispatch = useDispatch();
  const quote = useSelector(state => state.quote.quote);
  const author = useSelector(state => state.quote.author);
  const status = useSelector(state => state.quote.status);
  const error = useSelector(state => state.quote.error);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <div className={styles.container}>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <>
          <p className={styles.quote}>"{quote}"</p>
          <p className={styles.author}>- {author}</p>
        </>
      )}
      {status === 'failed' && <p>{error}</p>}
      <button className={styles.button} onClick={handleNewQuote}>New Quote</button>
    </div>
  );
};

export default Quote;
