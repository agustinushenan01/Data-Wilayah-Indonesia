import { Routes, Route } from 'react-router';
import './App.css'
import Home from './pages/Home';

export default function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  )
}
