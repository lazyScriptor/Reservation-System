import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const componentDetails = [
  {
    title: "Customised look and feel",
    description:
      "Every system is customised to have the same look and feel as your website. Logo, colours and text is customised so your customers know where they are.",
    image: CiCalendarDate,
  },
  {
    title: "Amazing local support",
    description:
      "Need help? You can email or call us. We are here help 7 days a week. Most of the queries are answered within the same day.",
    image: RiCustomerService2Line,
  },
  {
    title: "Ongoing improvements",
    description:
      "We are working on improving the system daily. The new features are developed based on your needs and feedback. Usability and security is our main focus. We are aiming to make the system very easy to use so you can focus on what is important for you..",
    image: IoSettingsOutline,
  },
];

export default function Strip3() {
  return (
    <div className="py-8 bg-gray-300">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {componentDetails.map((item, index) => (
            <div className="flex flex-col items-center  justify-start py-8">
              {item.image && React.createElement(item.image, { className: "text-brandBlueDark ", size: 100 })} {/* Tailwind styles */}
              {/* Render the icon if available */}
              <h2 className="text-brandBlueDark text-lg font-semibold">{item.title}</h2>
              <p className="text-xs text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Strip3Comp() {}
