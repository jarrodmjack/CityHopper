import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import Select from "react-select";
import { toast } from "react-hot-toast";

type PropertySearchFormProps = {
  handleFindMatchingProperties: (options: PropertySearchFormOptions) => void;
};

const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  handleFindMatchingProperties,
}) => {
  const { user } = useUser();

  if (!user) return null;
  const [options, setOptions] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    numOfPeople: 1,
  });

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">
        Quickly find a property using the options below
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFindMatchingProperties(options);
        }}
        className="grid grid-cols-2 gap-2 text-black lg:flex lg:items-center lg:gap-2"
      >
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="location" className="font-semibold">
            Location ( City, Country )
          </label>
          <input
            onChange={(e) =>
              setOptions({ ...options, location: e.target.value })
            }
            value={options.location}
            placeholder="Where are you staying?"
            id="location"
            type="text"
            className="focus:outline-none"
            required={true}
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="checkInDate" className="font-semibold">
            Check-in date
          </label>
          <input
            onChange={(e) => {
              const todaysDate = new Date().toISOString().split("T")[0];
              const selectedCheckInDate = e.target.value;

              if (selectedCheckInDate < todaysDate!) {
                toast.error(
                  "Checkin date cannot be before todays date. Please select a different date"
                );
                setOptions({ ...options, checkIn: selectedCheckInDate });
              } else {
                setOptions({ ...options, checkIn: selectedCheckInDate });
              }
            }}
            id="checkInDate"
            type="date"
            className="focus:outline-none"
            required={true}
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="checkOutDate" className="font-semibold">
            Check-out date
          </label>
          <input
            onChange={(e) =>
              setOptions({ ...options, checkOut: e.target.value })
            }
            id="checkOutDate"
            type="date"
            className="focus:outline-none"
            required={true}
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 lg:py-2.5">
          <label htmlFor="numOfAdults" className="font-semibold">
            How many adults?
          </label>
          <Select
            required={true}
            options={[
              { value: 1, label: "1 person" },
              { value: 2, label: "2 people" },
              { value: 3, label: "3 people" },
              { value: 4, label: "4 people" },
            ]}
            onChange={(option) => console.log(option?.value)}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 rounded-lg bg-blue-700 px-4 py-6 text-slate-100 hover:bg-blue-900 lg:ml-4"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
