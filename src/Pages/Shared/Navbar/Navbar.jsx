import { useState, useEffect, useRef } from "react";
import logo from "../../../assets/dnslogo.png";
import { Link } from "react-router-dom";
import useAuth from "../../../Hook/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();
  // ------logout--------
  const HandleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const closeDropDown = (e) => {
      if (
        dropDownMenuRef.current &&
        !dropDownMenuRef.current.contains(e.target)
      ) {
        setDropDownState(false);
      }
    };

    document.addEventListener("mousedown", closeDropDown);
    return () => document.removeEventListener("mousedown", closeDropDown);
  }, []);

  const Navlinks = (
    <>
      <li className="group flex  cursor-pointer flex-col">
        <Link to="">Home</Link>{" "}
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
      <li className="group flex  cursor-pointer flex-col">
        <Link to="">About</Link>{" "}
        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
      </li>

      <li className="group flex  cursor-pointer flex-col">
        <button className="btn">
          <Link to="/dashboard">Dashboad</Link>{" "}
          <div className="badge badge-secondary">+99</div>
        </button>

        <span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
      </li>
    </>
  );

  return (
    <nav className="flex items-center justify-between bg-[#393E46] px-4 py-2 text-white">
      <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
        <h2>
          <img className="w-20 h-12" src={logo} alt="" />
        </h2>
      </div>
      <div className="flex items-center justify-between gap-16">
        <ul className="flex items-center justify-between gap-10">{Navlinks}</ul>
        <div className="flex items-center justify-between gap-5">
          {user ? (
            <div tabIndex={0} role="button" className="bg-green-200">
              <div
                ref={dropDownMenuRef}
                onClick={() => setDropDownState(!dropDownState)}
                className="relative  flex cursor-pointer   items-center gap-3  px-6 py-2  "
              >
                {" "}
                <img
                  className="w-10 rounded-full"
                  alt="User Avatar"
                  src={user?.photoURL}
                />
              </div>
              {dropDownState && (
                <ul className="absolute bg-slate-400 top-12 z-10 flex flex-col gap-2 rounded-lg">
                  <li className="cursor-pointer   rounded-b-lg px-6 py-2 text-white hover:bg-sky-600">
                    {user.displayName}
                  </li>
                  <li
                    onClick={HandleLogout}
                    className="cursor-pointer  rounded-b-lg px-6 py-2 text-white hover:bg-sky-600"
                  >
                    {user.email}
                  </li>
                  <li
                    onClick={HandleLogout}
                    className="cursor-pointer  rounded-b-lg px-6 py-2 text-white hover:bg-sky-600"
                  >
                    Log Out
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/signup" className="">
              <button className="rounded-full bg-sky-600 px-6 py-2 text-white transition-all duration-300 hover:scale-90">
                <Link to="/login"> SignUp or login</Link>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
