// src/pages/Logout.jsx
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: call supabase.auth.signOut() here later
    navigate("/login");
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f3] font-['Inter']">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm text-center border border-[#e8ddd6]">
        <h1 className="text-xl font-semibold text-[#4a3f3a] mb-2">
          Log out?
        </h1>
        <p className="text-sm text-[#8a7a72] mb-6">
          You'll need to sign back in to access your dashboard.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-lg bg-[#c1694f] text-white font-medium hover:bg-[#a85940] transition-colors"
          >
            Log out
          </button>
          <button
            onClick={handleCancel}
            className="w-full py-2.5 rounded-lg bg-transparent text-[#8a7a72] font-medium hover:bg-[#f0e8e3] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}