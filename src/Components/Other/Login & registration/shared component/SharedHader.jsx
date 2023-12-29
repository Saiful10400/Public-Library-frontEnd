import { Link } from "react-router-dom";

const SharedHader = ({ data }) => {
  return (
    <div>
      <h1 className="font-bold text-4xl lg:text-5xl">{data}</h1>
      <h1 className=" text-md lg:text-xl font-thin mt-3">
        {`Doesn't have an account yet?`}{" "}
        <Link to={data==="Login"?"/signup":"/login"} className="underline text-[#a274f6] font-bold">{data==="Login"? "Sign up" : "Login"}</Link>
      </h1>
    </div>
  );
};

export default SharedHader;
