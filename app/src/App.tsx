import { useState, createContext } from "react";
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
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
  web3: Web3 | undefined;
  setWeb3: React.Dispatch<React.SetStateAction<Web3 | undefined>>;
}

export const UserContext = createContext<IUserContextProps>({
  account: undefined,
  setAccount: () => { },
  web3: undefined,
  setWeb3: () => { },
});

function App() {

  const [account, setAccount] = useState<string | undefined>(undefined);
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);

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