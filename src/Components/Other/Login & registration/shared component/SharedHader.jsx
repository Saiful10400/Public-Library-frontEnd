import { Link } from "react-router-dom";

const SharedHader = ({ data }) => {
  return (
    <div>
      <h1 className="font-bold text-4xl lg:text-5xl primarytextColor">{data}</h1>
      <h1 className=" text-md lg:text-xl primarytextColor font-thin mt-3">
        {`Doesn't have an account yet?`}{" "}
        <Link to={data==="Login"?"/signup":"/login"} className="underline lightPrimaryColor font-bold">{data==="Login"? "Sign up" : "Login"}</Link>
      </h1>
    </div>
  );
};

export default SharedHader;
