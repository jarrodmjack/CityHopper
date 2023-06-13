import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { api } from "~/utils/api";

const FlightSearchForm = () => {
  const { user } = useUser();

  if (!user) return null;

  const ctx = api.useContext();
  return (
    <div>
        <h2 className="text-2xl font-semibold mb-6">Quickly find your flight using the options below</h2>
      <form className="flex items-center gap-2 text-black">
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="departureAirport">Departure Airport</label>
          <input
            placeholder="Country, city or airport"
            id="departureAirport"
            type="text"
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white px-10 py-4">
          <label htmlFor="destinationAirport">Destination Airport</label>
          <input
            placeholder="Country, city or airport"
            id="destinationAirport"
            type="text"
          />
        </div>
        <div className="flex flex-col rounded-lg  bg-white p-4">
          <label htmlFor="departureDate">Departing</label>
          <input id="departureDate" type="date" />
        </div>
        <div className="flex flex-col rounded-lg  bg-white p-4">
          <label htmlFor="returnDate">Returning</label>
          <input id="returnDate" type="date" />
        </div>
        <div className="flex flex-col rounded-lg  bg-white p-4">
          <label htmlFor="returnDate">Select class</label>
          <select name="selectClass" id="selectClass">
            <option value="economy">Economy</option>
          </select>
        </div>
        <button className="ml-4 rounded-lg bg-emerald-700 px-4 py-6 text-slate-100">
          Search
        </button>
        {/* <form onSubmit=> */}

        {/* </form> */}
      </form>
    </div>
  );
};

export default FlightSearchForm;
