import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {

  // https://repositive-task.herokuapp.com/api

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
