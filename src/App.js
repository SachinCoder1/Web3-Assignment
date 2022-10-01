import { Routes, Route } from "react-router-dom";
import { urls } from "./constants";
import Analytics from "./pages/Analytics";
import Nfts from "./pages/Nfts";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <>
      <Routes>
        <Route path={urls.wallet} element={<Wallet />} />
        <Route path={urls.nfts} element={<Nfts />} />
        <Route path={urls.Analytics} element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;
