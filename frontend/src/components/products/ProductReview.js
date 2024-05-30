export default function ProductReview({ reviews }) {
  return (
    <div class="bg-neutral-200 bg-opacity-70 px-5">
      <hr />
      {reviews &&
        reviews.map((review) => (
          <div key={review._id} class="my-4 flex">
            <div className="w-full">
              <div>
                <p className="text-lg font-semibold">{review.user.name}</p>
              </div>
              <div className="py-4">
                <p className="">{review.comment}</p>
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
