import { useState } from "react";
import { Rate } from "antd";

const RateModal = () => {
  const [userRating, setUserRating] = useState<number>(0);
  const handleRatingChange = (value: number) => {
    setUserRating(value); // Update the user's rating
    console.log(`User rated the movie: ${value} stars`);
    // Optionally, send the rating to your backend or API here
  };

  return (
    <div>
      <Rate
        allowHalf
        defaultValue={0}
        value={userRating}
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default RateModal;
