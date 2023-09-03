import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Detail from "./Pages/Detail";
import Order from "./Pages/Order";
import ConfirmOrder from "./Pages/ConfirmOrder";
import ItemRegister from "./Pages/ItemRegister";
import ItemSelfRegister from "./Pages/ItemSelfRegister";
import ItemVideoRegister from "./Pages/ItemVideoRegister";
import First from './Pages/First';
import Mypage from "./Pages/Mypage";
import GuideSlider from "./Components/GuideSlider";
import ItemVideoRegister2 from "./Pages/ItemVideoRegister2";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/first" element={<First />} />
        <Route path="/itemregister" element={<ItemRegister />} />
        <Route path="/itemselfregister" element={<ItemSelfRegister />} />
        <Route path="/itemvideoregister" element={<ItemVideoRegister />} />
        <Route path="/itemvideoregister2" element={<ItemVideoRegister2 />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/guide" element={<GuideSlider />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
