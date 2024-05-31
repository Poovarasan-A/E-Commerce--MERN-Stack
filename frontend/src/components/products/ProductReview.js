import ReactStars from "react-rating-stars-component";

export default function ProductReview({ reviews }) {
  return (
    <div className="bg-neutral-200 bg-opacity-70 px-5">
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} class="my-4 flex">
            <div className="w-full">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold capitalize">
                  {review.user.name}
                </p>
                <ReactStars
                  size={18}
                  value={review.rating}
                  activeColor={"#FF9529"}
                  isHalf
                  edit={false}
                />
              </div>
              <div className="py-4">
                <p className="capitalize">{review.comment}</p>
              </div>
            </div>
            <div className="min-w-[10%] text-gray-600 font-semibold">
              {" "}
              5 months ago
            </div>
          </div>
        ))}
    </div>
  );
}
