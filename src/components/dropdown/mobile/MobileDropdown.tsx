import React, { PropsWithChildren } from "react";

type MobileDropdownOwnProps = {
  classNames?: string;
} & PropsWithChildren;

const MobileDropdown: React.FC<MobileDropdownOwnProps> = ({
  classNames = "",
  children,
}) => {
  return <div className={`${classNames} bg-gray-600 absolute top-5 right-5 flex w-40 rounded-lg shadow-xl flex-col text-center h-28 justify-evenly`}>{children}</div>;
};

export default MobileDropdown;
