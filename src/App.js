import React from 'react';
import { ThemeProvider } from './Components/ThemeContext';
import StudentTable from './Components/StudentTable';
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <StudentTable />
      </div>
    </ThemeProvider>
  );
};

export default App;

