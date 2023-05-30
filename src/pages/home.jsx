import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const [user_detail, setUserDetail] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("irk-user");

    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUserDetail(parsedUser);
      console.log(parsedUser);
    }
  }, [navigate]);

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <p>Hello {user_detail.name}</p>
    </div>
  );
};
