function StarRating({ rating, setRating }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "6px",
        alignItems: "center",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: "pointer",
            fontSize: "28px",
            color:
              star <= rating
                 ? "#3F51E5"
                 : "#D1D5DB",
            transition: "0.2s ease",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;