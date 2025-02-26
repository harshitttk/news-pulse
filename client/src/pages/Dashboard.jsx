import { useNavigate } from "react-router-dom";
import { PiPulseFill } from "react-icons/pi";
import Title from "../components/Title";

const Dashboard = () => {
  const navigate = useNavigate();

  const onSignup = () => {
    navigate("/register");
  };

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      <div className=" text-[90px] m-3">
        <PiPulseFill />
      </div>
      <div>
        <Title />
      </div>

      <div className="flex gap-8 m-10">
        <button onClick={onSignup} className="shadow-md">Register</button>
        <button onClick={onLogin} className="shadow-md">Login</button>
      </div>

      <p>Test Login Credentials: </p>
      <div className="flex gap-2">
        <p>Username: test</p>
        <p>Password: test123</p>
      </div>

      <div className="flex flex-col bottom-3 absolute items-center">
        {/*<p>Made by Harshit Kumar</p>*/}
        {/*<p>Copyright ©️ 2024</p>*/}
      </div>
    </div>
  );
};

export default Dashboard;
