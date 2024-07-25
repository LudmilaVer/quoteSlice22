import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRandomQuote = createAsyncThunk('quote/fetchRandomQuote', async () => {
  try {
    const response = await axios.get('https://type.fit/api/quotes');
    const quotes = response.data;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    console.log('API Response:', randomQuote);
    return { content: randomQuote.text, author: randomQuote.author || 'Unknown' };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
});

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    quote: '',
    author: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quote = action.payload.content;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quoteSlice.reducer;

