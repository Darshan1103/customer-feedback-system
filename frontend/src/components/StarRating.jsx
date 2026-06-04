function StarRating({ rating, setRating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "30px",
            color:
              star <= rating
                ? "#FFD700"
                : "#D1D5DB",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;