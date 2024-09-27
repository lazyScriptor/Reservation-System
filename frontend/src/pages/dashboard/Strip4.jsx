import React from "react";
import strip4Image from "../../assets/Strip4Image.png";
function Strip4() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="flex flex-col items-center py-4 bg-gradient-to-r p-8 from-gray-800 to-gray-500 rounded-xl text-white">
          {/* Grid start */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* image part */}
            <div className="flex items-center">
              <img src={strip4Image} alt="" />
            </div>
            {/* description part */}
            <div className="flex flex-col items-center col-span-2 py-4">
              <div className="py-4 flex flex-col items-center">
                <h2 className="pb-4 text-2xl">About ... Reservation System</h2>
                <hr className="border-2 rounded-full w-10 self-center  border-brandBlue " />
              </div>
              <div className="flex flex-col gap-4 ">
                <p>
                  YepBooking system has been created to help gyms, sport centres
                  and other businesses to manage bookings online. It can be used
                  to manage creche in gyms, group activities or individual
                  sports like badminton or Tennis
                </p>
                <p>
                  Our system is easy to use for both business owners and
                  end-users. We have a wide range of settings that customise
                  system to your needs. You can check out some of our
                  testimonials.
                </p>
                <p>
                  Based on feedback from our customer we keep launching new
                  features and improvements. We usually release around 80
                  improvements each year. Upgrades to a newer version of the
                  system are free of charge.
                </p>
              </div>
            </div>
          </div>
          {/* Down part */}
          <div className="py-8 w-full">
            <div className="container grid grid-cols-2 md:grid-cols-4 text-center">
              <div className="border-r border-l border-white p-4">
                <h2 className="text-2xl font-semibold">Sri Lankan</h2>
                <p className="uppercase ">Booking system</p>
              </div>
              <div className="border-r border-white p-4">
                <h2 className="text-2xl font-semibold">100 +</h2>
                <p className="uppercase ">Customers</p>
              </div>
              <div className="border-r border-l border-white p-4">
                <h2 className="text-2xl font-semibold">15 + years</h2>
                <p className="uppercase ">operating</p>
              </div>
              <div className=" p-4 border-r border-white">
                <h2 className="text-2xl font-semibold">150 000</h2>
                <p className="uppercase ">Bookings per month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Strip4;
