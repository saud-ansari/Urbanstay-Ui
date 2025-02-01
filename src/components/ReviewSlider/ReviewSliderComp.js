import React from 'react';
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import './ReviewSliderComp.css'; // Importing custom styles

const ReviewSliderComp = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,

        responsive: [
            {
                breakpoint: 992, // For tablets and small desktops
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768, // For mobile screens
                settings: {
                    slidesToShow: 1,
                }
            },

        ]
    };

    return (
        <div className="review-slider-comp my-5" data-aos="zoom-in-up">
            <h3 className="text-center mb-4">What Our Guests Are Saying</h3>
            <Slider {...settings}>
                {/* Card 1 */}
                <Card className="carousel-slide shadow ">
                    <h5 className="text-center">Exceptional Stay!</h5>
                    <p className="truncated-multiline">
                        "The urban apartment exceeded all my expectations! The space was well-designed, and the location was perfect for exploring the city. 
                        I especially loved the rooftop view."
                    </p>
                    <h5 className="text-muted text-center">- Michael Thompson</h5>
                </Card>

                {/* Card 2 */}
                <Card className="carousel-slide shadow">
                    <h5 className="text-center">A Wonderful Experience</h5>
                    <p className="truncated-multiline">
                        "My stay at the mountain retreat was unforgettable. The cozy ambiance, stunning surroundings, and great service made this the perfect escape."
                    </p>
                    <h5 className="text-muted text-center">- Sarah Johnson</h5>
                </Card>

                {/* Card 3 */}
                <Card className="carousel-slide shadow">
                    <h5 className="text-center">Highly Recommended</h5>
                    <p className="truncated-multiline">
                        "Stayed at the downtown loft, and it was an amazing experience. The modern decor and unbeatable location made it ideal for my business trip.
                        Will definitely book again!"
                    </p>
                    <h5 className="text-muted text-center">- Alex Brown</h5>
                </Card>

                {/* Card 4 */}
                <Card className="carousel-slide shadow">
                    <h5 className="text-center">Perfect for a Family Vacation</h5>
                    <p className="truncated-multiline">
                        "The lakeside cottage was everything we wanted and more. Peaceful, beautiful views, and plenty of space for the kids to play."
                    </p>
                    <h5 className="text-muted text-center">- Emily Parker</h5>
                </Card>

                {/* Card 5 */}
                <Card className="carousel-slide shadow">
                    <h5 className="text-center">Amazing Weekend Getaway</h5>
                    <p className="truncated-multiline">
                        "Stayed at the seaside villa for a weekend, and it was absolutely perfect. The beach was right outside our door, and the villa itself was gorgeous.!"
                    </p>
                    <h5 className="text-muted text-center">- John Davis</h5>
                </Card>
            </Slider>
        </div>
    );
};

export default ReviewSliderComp;
