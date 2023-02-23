import { Route, Routes, Outlet } from "react-router-dom";
import './App.css'
import Home from './routes/Home';
import CarDashboard from './routes/CarDashboard';
import Contact from './routes/Contact';
import Paperbase from "./components/Paperbase/Paperbase";

function Layout() {
  return (
    <>
      <Paperbase>
        <Outlet />
      </Paperbase>
    </>
  );
}

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home /> }/>
          <Route path="/cardashboard/" element={<CarDashboard /> }/>
          <Route path="/contact/" element={<Contact /> }/>
        </Route>
      </Routes>
    </div>
  )

}

export default App
