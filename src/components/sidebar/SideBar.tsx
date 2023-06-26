import type { PropsWithChildren } from "react";

const SideBar = (props: PropsWithChildren) => {

  if (!props.children) {
    return <div className="bg-gray-950 w-64 p-4"></div>
  }

  return (
    <div className="bg-gray-950 w-64 p-4 hidden md:block">
        {props.children}
    </div>
  )
}

export default SideBar