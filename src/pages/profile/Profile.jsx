import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="mt-10">
      <div className="text-3xl font-bold flex justify-center">Profile</div>

      <div className="flex justify-center text-2xl font-semibold mt-4">
        {user ? (
          <div>
            Name: {user.firstName} {user.lastName} <br />
            Email: {user.email}
          </div>
        ) : (
          <div>User not found</div>
        )}
      </div>

      <div className="flex justify-center mt-10">
        <button onClick={handleLogout} className="bg-red-500 text-white px-10 py-2 rounded-lg">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
