import Main from './pages/Main'
import MovieInput from './pages/MovieInput'
import Login from './pages/Login'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Movie-Search" element={<MovieInput/>} />
        <Route path="/Main-page" element={<Main/>} />
      </Routes>
    </Router>

  );
}

export default App;
