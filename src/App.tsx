import Discover from "./pages/Discover";
import FlowerEdition from "./pages/FlowerEdition";
import Home from "./pages/Home";
import Letme from "./pages/Letme";

import { Routes, Route } from "react-router-dom";
import Letme2 from "./pages/Letme2";
import FlowerEdition2 from "./pages/FlowerEdition2";
import Letme3 from "./pages/Letme3";
import RomantucEdition from "./pages/RomanticEdition";
import Letme4 from "./pages/Letme4";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} index={true} />
        <Route path="/letme" element={<Letme />} />
        <Route path="/letme2" element={<Letme2 />} />
        <Route path="/letme3" element={<Letme3 />} />
        <Route path="/letme4" element={<Letme4 />} />
        <Route path="/flower-edition" element={<FlowerEdition />} />
        <Route path="/flower-edition2" element={<FlowerEdition2 />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/romantic-edition" element={<RomantucEdition />} />
      </Routes>
    </>
  );
};

export default App;
