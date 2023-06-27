import React, { PropsWithChildren } from "react";

type MobileDropdownOptionOwnProps = {
} & PropsWithChildren;

const MobileDropdownOption: React.FC<MobileDropdownOptionOwnProps> = ({
  children
}) => {
  return <span className="w-full">{children}</span>;
};

export default MobileDropdownOption;
