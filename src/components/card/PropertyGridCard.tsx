import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

type PropertyGridCardProps = {
  property: any;
};

const PropertyGridCard: React.FC<PropertyGridCardProps> = ({ property }) => {
  return (
    <div className="w-[350px] rounded-xl bg-slate-100 shadow-lg hover:opacity-90">
      <a href={property.url ? property.url : "/404"} target="_blank">
        <img
          className="h-64 w-full rounded-t-xl object-cover"
          src={property.images[0]}
          alt={`host-property-image-${property.userId}`}
        />
      </a>
      <div className="flex h-[280px] flex-col justify-between px-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="font-bold text-black">{property.name.length > 40 ? `${property.name.slice(0,40)}...` : property.name}</span>
            {property.rating ? (
              <span className="ml-4 mt-2 flex items-center gap-2 self-start text-sm text-black">
                <FaStar />
                {property.rating}
              </span>
            ) : (
              <span className="ml-4 mt-2 flex items-center gap-2 self-start text-sm text-black">
                <FaStar />
                N/A
              </span>
            )}
          </div>
          <p className="text-base font-semibold text-gray-700">
            {property.type}
          </p>
        </div>
        <div className="flex flex-wrap">
          {property.previewAmenities.length > 0 &&
            property.previewAmenities.map((amenity: string, i: number) => (
              <span
                key={i}
                className="mb-2 mr-2 inline-block w-fit rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {amenity}
              </span>
            ))}
        </div>
        <div className="text-black">
              <span>{property.address}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-black">
            Rate: ${property.price.rate} USD / night
          </span>
          <a
            href={property.deeplink ? property.deeplink : property.url}
            target="_blank"
            className="inline-flex items-center self-start rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyGridCard;
