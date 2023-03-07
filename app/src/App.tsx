import { useState, createContext, useEffect } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import './App.css'
import Home from './routes/Home';
import BookletDetails from './routes/Booklet/BookletDetails';
import Contact from './routes/Contact';
import Paperbase from "./components/Paperbase/Paperbase";
import Web3 from "web3";
import { HOME_ROUTE, CONTACT_ROUTE, BOOKLET_ROUTE, BOOKLET_LIST_ROUTE } from './classes/utils/constants';
import Booklets from "./routes/Booklet/Booklets";

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
  account: string;
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

  const storedAccount = sessionStorage.getItem('account') ?? "";
  const [account, setAccount] = useState<string>(storedAccount);
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
          <Route path={HOME_ROUTE} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={`${BOOKLET_ROUTE}:bookletAddress`} element={<BookletDetails />} />
            <Route path={`${BOOKLET_LIST_ROUTE}`} element={<Booklets />} />
            <Route path={CONTACT_ROUTE} element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )

}

export default App