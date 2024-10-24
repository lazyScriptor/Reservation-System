import React from "react";
import ImageGridComponent from "./dashboardComponents/ImageGridComponent";
import gridImage1 from "../../assets/gridImage1.jpg";
import gridImage2 from "../../assets/gridImage2.jpg";
import gridImage3 from "../../assets/gridImage3.jpg";
import gridImage4 from "../../assets/gridImage4.jpg";
import gridImage5 from "../../assets/gridImage5.jpg";
import Button1 from "../../components/Button1";
const imageGridComponentDetails = [
  {
    heading: "Group Classes and Courses ",
    description: "Yoga, Pilates, Bootcamp, Spin, Stretching, Zumba and more",
    image: gridImage1, // Image for this component
  },
  {
    heading: "Individual Reservations",
    description: "Tennis, squash, badminton, bowling, table tennis",
    image: gridImage2, // Different image for this component
  },
  {
    heading: "Sports Centers Facilities",
    description: "Multi sport centres, playing fields, pools",
    image: gridImage3, // Different image for this component
  },
  {
    heading: "Child Care on-site Experts",
    description:
      "Gym based child care, time based bookings, different age groups",
    image: gridImage4, // Different image for this component
  },
  {
    heading: "Best Fitness Equipment",
    description:
      "XBody EMS Training, Vibrostation, Power Plate, VacuShape and more",
    image: gridImage5, // Different image for this component
  },
];
function Strip2() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="flex justify-center flex-col py-4">
          <h1 className="text-center pb-4 text-2xl font-semibold">Online Booking System</h1>
          <hr className="border-2 rounded-full w-10 self-center  border-brandBlue " />
        </div>
        {/* Image section */}
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {imageGridComponentDetails.map((item, index) => (
               <ImageGridComponent
               key={index}
               gridImage={item.image}
               bgColor={index % 2 == 0 ? "green-400" : "brandBlue"}
               heading={item.heading}
               description={item.description}
             />
            ))}
          </div>
          <div className="py-8">
           <Button1 content={"Our Products"} hover_text_color="black"/>
          </div>
        </div>

      </div>
    </div>
  );
}
export default Strip2;
