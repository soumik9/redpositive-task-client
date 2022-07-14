import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './pages/Home';

function App() {

  // https://repositive-task.herokuapp.com/api

  return (
    <div className="">

      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
