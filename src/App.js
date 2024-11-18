import './App.css';
import { Route, Routes } from 'react-router-dom';
import Auth from './Pages/Auth';
import Completed from './Pages/Completed';
import Progress from './Pages/Progress';
import Pending from './Pages/Pending';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path='/register' element={<Auth register={"register"}/>} />
        <Route path='/completed' element={<PrivateRoute element={Completed} />} />
        <Route path='/progress' element={<PrivateRoute element={Progress} />} />
        <Route path='/pending' element={<PrivateRoute element={Pending} />} />
        
      </Routes>
    </div>
  );
}

export default App;
