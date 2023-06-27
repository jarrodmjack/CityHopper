import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import Layout from "../layout/Layout";
import LoadingSpinner from "../loading/LoadingSpinner";

type PreviousSearchSideBarProps = {
  previousSearches: any;
  handleShowPreviousSearch: any;
};

const PreviousSearchSideBar: React.FC<PreviousSearchSideBarProps> = ({
  previousSearches,
  handleShowPreviousSearch,
}) => {
  if (!previousSearches) {
    return (
      <Layout format="loading">
        <LoadingSpinner size={96} />
      </Layout>
    );
  }

  if (previousSearches && previousSearches.length === 0) {
    return <div>No previous searches</div>;
  }

  return (
    <div className="flex flex-col py-10">
      <h5 className="mb-10 text-xl">Previous searches</h5>
      {previousSearches.length > 0 && previousSearches.map((previousSearch: any, i: number) => (
        <div key={previousSearch.id} className="flex items-center gap-2">
          <span>
            <FaSearch />
          </span>
          <span
            onClick={() => handleShowPreviousSearch(previousSearch.properties)}
            key={previousSearch.id}
            className="mb-2 flex cursor-pointer items-center gap-2 p-2 rounded-lg hover:bg-slate-100 hover:text-black"
          >
            {previousSearch.properties[0].address}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PreviousSearchSideBar;
