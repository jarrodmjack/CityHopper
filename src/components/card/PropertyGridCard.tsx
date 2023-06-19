import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

type PropertyGridCardProps = {
  property: any;
};

const PropertyGridCard: React.FC<PropertyGridCardProps> = ({ property }) => {
  return (
    <div
      key={property.id}
      className="flex max-w-sm flex-col justify-between rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 hover:opacity-90"
    >
      <a href={property.url ? property.url : "/404"} target="_blank">
        <img
          className="h-56 w-full rounded-t-lg"
          src={property.images[0]}
          alt={`host-thumbnail-${property.userId}`}
        />
        {/* TODO SWITCH TO NEXT IMAGES */}
        {/* <Image
          src={property.images[0]}
          alt={`host-thumbnail-${property.userId}`}
          w
        /> */}
      </a>
      <div className="flex h-full flex-col justify-between gap-4 p-5">
        <div className="flex justify-between gap-4">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-100">
            {property.name}
          </h5>
          {property.rating ? (
            <span className="mt-2 flex items-center gap-2 self-start text-sm text-slate-100">
              <FaStar />
              {property.rating}
            </span>
          ) : (
            <span className="mt-2 flex items-center gap-2 self-start text-sm text-slate-100">
              <FaStar />
              N/A
            </span>
          )}
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <span className="font-semibold text-slate-100">
          Rate: ${property.price.rate} USD / night
        </span>
        <a
          href={property.deeplink ? property.deeplink : property.url}
          target="_blank"
          className="inline-flex items-center self-start rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-emerald-600 dark:hover:bg-green-700 dark:focus:ring-blue-800"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default PropertyGridCard;
