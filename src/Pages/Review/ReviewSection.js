import React from "react";
import Review from "../Home/Review";
import people1 from "../../assets/images/people1.png";
import people2 from "../../assets/images/people2.png";
import people3 from "../../assets/images/people3.png";

const ReviewSection = () => {
    const reviews = [
        {
            _id: 1,
            name: "Winson Herry",
            review: "",
            location: "California",
            img: people1,
        },
        {
            _id: 2,
            name: "Winson Herry",
            review: "",
            location: "California",
            img: people2,
        },
        {
            _id: 3,
            name: "Winson Herry",
            review: "",
            location: "California",
            img: people3,
        },
        {
            _id: 1,
            name: "Winson Herry",
            review: "",
            location: "California",
            img: people1,
        },
        {
            _id: 2,
            name: "Winson Herry",
            review: "",
            location: "California",
            img: people2,
        },
    ];
    return (
        <div className="container mx-auto py-16">
            <h1 className="text-xl lg:px-14 px-4 py-2">Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-content-center lg:px-14 px-4 mx-auto">
                {reviews.map((review) => (
                    <Review key={review._id} review={review}></Review>
                ))}
            </div>
        </div>
    );
};

export default ReviewSection;
