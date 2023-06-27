import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { PropertySearchFormOptions } from "~/types/PropertySearchFormTypes";
import Select from "react-select";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import Modal from "react-modal";
import { FaCalendar } from "react-icons/fa";

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
    checkIn: new Date(),
    checkOut: new Date(),
    numOfPeople: 1,
  });
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSelectRange = (range: any) => {
    setDateRange({
      startDate: range.selection.startDate,
      endDate: range.selection.endDate,
      key: "selection",
    });
    setOptions({
      ...options,
      checkIn: range.selection.startDate,
      checkOut: range.selection.endDate,
    });
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

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
        <div className="flex flex-col rounded-lg bg-white px-10 py-4 gap-2">
          <label htmlFor="location" className="font-semibold">
            Location ( City, Country )
          </label>
          <input
            required={true}
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
        <div className="flex items-center gap-4 rounded-lg bg-white p-4">
          <div className="flex flex-col gap-2">
            <span>
              <span className="font-semibold">Check in: </span>
              {options.checkIn
                ? `${options.checkIn.toISOString().split("T")[0]}`
                : "YYYY/MM/DD"}
            </span>
            <span>
              <span className="font-semibold">Check out: </span>
              {options.checkOut
                ? `${options.checkOut.toISOString().split("T")[0]}`
                : "YYYY/MM/DD"}
            </span>
          </div>
          <button type="button" className="text-slate-100" onClick={openModal}>
            <FaCalendar style={{ color: "black" }} />
          </button>
        </div>

        <Modal
          ariaHideApp={false}
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <DateRangePicker ranges={[dateRange]} onChange={handleSelectRange} />
        </Modal>
        <div className="flex flex-col rounded-lg bg-white px-10 lg:py-2.5 gap-1.5">
          <label htmlFor="numOfAdults" className="font-semibold">
            How many people?
          </label>
          <Select
            required={true}
            options={[
              { value: 1, label: "1 person" },
              { value: 2, label: "2 people" },
              { value: 3, label: "3 people" },
              { value: 4, label: "4 people" },
            ]}
            onChange={(option) =>
              setOptions({ ...options, numOfPeople: option!.value })
            }
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
