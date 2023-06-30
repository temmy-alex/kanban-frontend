import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAccountCircle, MdOutlineLogout } from "react-icons/md";
import { LuPlusSquare } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initiate, logout } from "../../configs/store/global/action";

const HeaderLayout = () => {
  const { isAuthenticated, user, finishInitiate } = useSelector(
    (state: any) => state.global
  );
  const [modal, setModal] = useState(false);
  const navigate: any = useNavigate();
  const dispatch: any = useDispatch();
  const location: any = useLocation();

  useEffect(() => {
    if (!finishInitiate) dispatch(initiate());
    if (finishInitiate && !isAuthenticated) navigate("/auths/sign-in");
    

    // fetchCategory();
    // if (token) {
    //     let path = location.pathname.split("/")[1];
    //     if(path === 'accounts') setAccount(true);
    //     else setAccount(false)
    //     setAuth(true)
    // };
  }, [finishInitiate, isAuthenticated, location]);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-[#fcb502] to-[#06384a]">
      <div className="flex justify-between items-center p-4 border-b-2">
        <p
          className="text-2xl font-bold text-white"
          onClick={() => navigate("/")}
        >
          Kanban GWP
        </p>
        <div
          className="border p-2 border-white h-[50px] w-[150px] items-center justify-center flex"
          onClick={() => dispatch(logout())}
        >
          <MdOutlineLogout size={25} color="white" />
          <p className="text-sm ml-3 text-white">Logout</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
