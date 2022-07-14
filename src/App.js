import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';

function App() {

  // https://repositive-task.herokuapp.com/api

  return (
    <div className="">

      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:profileId" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;
