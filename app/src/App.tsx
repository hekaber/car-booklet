import { MetaMaskProvider } from "metamask-react";
import { Route, Routes, Outlet } from "react-router-dom";
import './App.css'
import Home from './routes/Home';
import BookletDetails from './routes/Booklet/BookletDetails';
import Contact from './routes/Contact';
import Paperbase from "./components/Paperbase/Paperbase";
import { HOME_ROUTE, CONTACT_ROUTE, BOOKLET_ROUTE, BOOKLET_LIST_ROUTE } from './classes/utils/constants';
import Booklets from "./routes/Booklet/Booklets";
import { UserDataProvider } from "./context/UserDataContext";
import { AlertProvider } from "./context/AlertContext";

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
    <MetaMaskProvider>
      <UserDataProvider>
        <AlertProvider>
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
        </AlertProvider>
      </UserDataProvider>
    </MetaMaskProvider>
  )
}

export default App