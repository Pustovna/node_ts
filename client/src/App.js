import React from 'react';
import './App.css';
import { SearchForm } from './components/SearchForm';
import { Result } from './components/Result';
import { MyContextProvider } from './context/FormContext';

function App() {
  return (
    <MyContextProvider>
      <div className="App">
        <main>
          <SearchForm></SearchForm>
          <Result></Result>
        </main>
      </div>
    </MyContextProvider>
  );
}

export default App;
