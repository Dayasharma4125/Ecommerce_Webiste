import React from 'react';

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center">Testimonials</h2>
      <div className="grid grid-cols-2 gap-4">
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
    </div>
  );
};

const Testimonial = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <p className="text-gray-700">“This is the best product I have ever used!”</p>
      <h3 className="text-xl font-bold">John Doe</h3>
    </div>
  );
};

export default Testimonials;
