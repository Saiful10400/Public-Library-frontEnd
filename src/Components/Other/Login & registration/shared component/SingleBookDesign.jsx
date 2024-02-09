
import { Link } from 'react-router-dom';

const SingleBookDesign = ({book}) => {
    console.log(book)
    return (
        <Link to={`/book/${book?._id}`} className="text-center hover:scale-110 transition-all duration-300 delay-300">
            <img className="w-[80%] h-[300px] inline-block object-cover rounded-lg" src={book.coverPhoto} alt="" />
            <div className="mt-3">
            <h1 className="text-sm font-bold">{book.banglaName}</h1>
            <h1 className="text-[13px]">{book.authorName}</h1>
            </div>
            {
                <div className={`${book?.rating?.rating>0?"block":"hidden"} rating rating-xs`}>
                <input type="radio" name={book?._id} className="mask mask-star-2 bg-orange-400" checked={book?.rating?.rating===1} />
                <input type="radio" name={book?._id} className="mask mask-star-2 bg-orange-400" checked={book?.rating?.rating===2} />
                <input type="radio" name={book?._id} className="mask mask-star-2 bg-orange-400" checked={book?.rating?.rating===3} />
                <input type="radio" name={book?._id} className="mask mask-star-2 bg-orange-400" checked={book?.rating?.rating===4} />
                <input type="radio" name={book?._id} className="mask mask-star-2 bg-orange-400" checked={book?.rating?.rating===5} />
                <span className='text-gray-300 text-xs ml-1'>({book?.rating?.ratedPeople})</span>
              </div>
            }
        </Link>
    );
};

export default SingleBookDesign;