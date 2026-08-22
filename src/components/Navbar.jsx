import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets"; 

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-16 py-4 bg-white shadow-sm">
      <img src={assets.logo} alt="logo" className="h-10 w-auto" />

      <span
        onClick={() => navigate("/dashboard")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && navigate("/dashboard")}
        className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition cursor-pointer select-none"
      >
        Back
      </span>
    </nav>
  );
}