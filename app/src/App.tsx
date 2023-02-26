import { useState, createContext, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import './App.css'
import Home from './routes/Home';
import CarDashboard from './routes/CarDashboard';
import Contact from './routes/Contact';
import Paperbase from "./components/Paperbase/Paperbase";
import Web3 from "web3";

function Layout() {
  return (
    <>
      <Paperbase>
        <Outlet />
      </Paperbase>
    </>
  );
}
interface IUserContextProps {
  account: string | undefined;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  web3: Web3 | null;
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | null>>;
}

export const UserContext = createContext<IUserContextProps>({
  account: "",
  setAccount: () => { },
  web3: null,
  setWeb3: () => { },
});

function App() {

  const [account, setAccount] = useState<string>("");
  const [web3, setWeb3] = useState<Web3 | null>(null);

  return (
    <UserContext.Provider value={{
      account: account,
      setAccount: setAccount,
      web3: web3,
      setWeb3: setWeb3
    }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/cardashboard/" element={<CarDashboard />} />
            <Route path="/contact/" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )

}

export default App