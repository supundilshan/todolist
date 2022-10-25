import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Display from './Components/Display';
import UpdateTodo from './Components/UpdateTodo';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Display />} />
          <Route path='update/:updatingID' element={<UpdateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
