import AuthorSlide from "./Components/AuthorSlide";

const Home = () => {
  return (
    <div>
      {/* banner */}
      <div className="w-full min-h-[400px] flex justify-center items-center border-2 text-3xl font-bold">
        <span>Banner</span>
      </div>
      {/* authors */}
      <div className="w-full pt-6 mt-4 border-2 text-3xl font-bold">
        <AuthorSlide></AuthorSlide>
      </div>
      {/* most read */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>most read</span>
      </div>
      {/* newly arrived books */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>new arrived boook</span>
      </div>
      {/* catagory */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>catagory</span>
      </div>
      {/* islamic book */}
      <div className="w-full min-h-[200px] mt-4 flex justify-center items-center border-2 text-3xl font-bold">
        <span>islamic book</span>
      </div>
      {/* academic book */}
    </div>
  );
};

export default Home;
