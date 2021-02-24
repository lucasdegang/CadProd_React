import logo from './logo.svg';
import './App.css';

import Home from '../src/components/Home'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'

function App() {
  return (
    <div className="App">
      <header className="header">
          <p>State</p>
      </header>
      <Home />
    </div>
  );
}

export default App;
