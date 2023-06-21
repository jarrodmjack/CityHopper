import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import { api } from "~/utils/api";
import Select from "react-select";

type PropertySearchFormProps = {
  handleFindMatchingProperties: (options: PropertySearchFormOptions) => void;
};

const PropertySearchForm: React.FC<PropertySearchFormProps> = ({
  handleFindMatchingProperties,
}) => {
  const { user } = useUser();

  if (!user) return null;

  const [options, setOptions] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    numOfPeople: 1,
  });

  // const ctx = api.useContext(); TODO - ADD USERS SEARCH TO "PREVIOUS SEARCHED" which will be attached to the user

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
        className="flex items-center gap-2 text-black"
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
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="checkInDate" className="font-semibold">
            Check-in date
          </label>
          <input
            onChange={(e) =>
              setOptions({ ...options, checkIn: e.target.value })
            }
            id="checkInDate"
            type="date"
            className="focus:outline-none"
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
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="numOfAdults" className="font-semibold">
            How many adults?
          </label>
          <Select
            options={[
              { value: 1, label: "1 person" },
              { value: 2, label: "2 people" },
              { value: 3, label: "3 people" },
              { value: 4, label: "4 people" },
            ]}
            onChange={(option) => console.log(option?.value)}
          />
        </div>
        <button type="submit" className="ml-4 rounded-lg bg-blue-700 hover:bg-blue-900 px-4 py-6 text-slate-100">
          Search
        </button>
      </form>
    </div>
  );
};

export default PropertySearchForm;
