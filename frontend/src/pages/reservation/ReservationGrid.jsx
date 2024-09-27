import React, { useState } from "react";

const array1 = [1, 2, 3, 4, 5, 6, 7];
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cost = `$14`;
const names = [`item1`, `item2`, `item3`, `item4`, `item5`, `item6`, 'item7'];

function ReservationGrid() {
  // State to track selected slots
  const [selectedSlots, setSelectedSlots] = useState({});

  // Toggle slot selection and log the pressed status
  const toggleSlot = (rowIndex, colIndex) => {
    const slotKey = `${rowIndex}-${colIndex}`;
    const name = names[rowIndex - 1]; // Get the relevant name from names array
    const array1Value = array1[rowIndex -1]; // Get the relevant value from array1

    setSelectedSlots((prevSelected) => {
      const updatedSelected = {
        ...prevSelected,
        [slotKey]: !prevSelected[slotKey], // Toggle the current slot
      };

      // Log the selected slots and their status along with relevant name and array1 value
      // console.log("Selected slots:", updatedSelected);
      console.log("Relevant name:", name);
      console.log("Relevant array1 value:", array1Value);
      return updatedSelected;
    });
  };

  return (
    <div className="flex flex-col py-10 bg-gray-200 items-center rounded-lg">
      {/* Row 1 */}
      <div></div>
      {/* Row 2 */}
      <div className="flex justify-start">
        {/* Row 2 column 1 */}
        <div className="w-14">
          {names.map((item, index) => (
            <div key={index} className="w-14 aspect-square flex items-center justify-center">
              {item}
            </div>
          ))}
        </div>
        {/* Row 2 column 2 grid */}
        <div
          className="grid border rounded-md"
          style={{
            gridTemplateColumns: `repeat(${array2.length}, minmax(0, 1fr))`,
          }}
        >
          {array1.map((item1, rowIndex) =>
            array2.map((item2, colIndex) => {
              // Use rowIndex + 1 and colIndex + 1 to start from 1
              const displayRowIndex = rowIndex + 1;
              const displayColIndex = colIndex + 1;
              const slotKey = `${displayRowIndex}-${displayColIndex}`;
              const isSelected = selectedSlots[slotKey]; // Check if the slot is selected
              return (
                <div
                  key={`${displayRowIndex}-${displayColIndex}`}
                  className={`border rounded-lg aspect-square w-14 hover:bg-brandBlue/40 active:bg-brandBlue border-gray-300 p-2 transition-colors duration-100 cursor-pointer text-center ${
                    isSelected ? "bg-brandBlue text-white" : ""
                  }`} // Add styling if selected
                  onClick={() => toggleSlot(item1, colIndex+1)} // Toggle slot on click
                >
                  {`${displayRowIndex}, ${displayColIndex}`} {/* Display indices starting from 1 */}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex py-4">
        <div className="w-14"></div>
        <div className="flex justify-start">
          {array2.map((item, index) => (
            <div key={index} className="flex justify-evenly w-14">{`${cost}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReservationGrid;
