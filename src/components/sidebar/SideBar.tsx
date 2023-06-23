import type { PropsWithChildren } from "react";

const SideBar = (props: PropsWithChildren) => {
  return (
    <div className="bg-gray-950 w-64 p-4">
        {props.children}
    </div>
  )
}

export default SideBar