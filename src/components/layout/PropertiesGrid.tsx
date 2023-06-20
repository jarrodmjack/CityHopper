import Image from "next/image";
import React from "react";
import PropertyGridCard from "../card/PropertyGridCard";

type PropertiesGridProps = {
  properties: any[];
};

const PropertiesGrid: React.FC<PropertiesGridProps> = ({ properties }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {properties.map((property, i) => (
        <PropertyGridCard key={property.id} property={property}  />
      ))}
    </div>
  );
};

export default PropertiesGrid;
