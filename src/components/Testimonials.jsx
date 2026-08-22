
import React from "react";
import { assets, TestimonialsData } from "../assets/assets";


const Testimonials = () => {
  return (
    <div className="container mx-auto py-10 lg:px-32 w-full overflow-hidden" id="testimonials">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Testimonials
      </h1>
      <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">
        What our students say about us
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {TestimonialsData.map((Testimonial, index) => (
         <div key={index} className="max-w-[340px] shadow-lg rounded px-8 py-12 text-center">
            <img className="w-20 h-20 rounded-full mx-auto mb-4" src={Testimonial.image}  alt={Testimonial.alt}/>
            <h2 className="text-xl text-gray-700 font-medium">{Testimonial.name}</h2>
            <div className="flex justify-center gap-1 text-red-500 mb-4">
              {Array.from({ length: Testimonial.Rating }, (item, index) => (
                <img key={index} src={assets.star} alt="star"/>
              ))}
            </div>
            <p className="text-gray-600">{Testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;