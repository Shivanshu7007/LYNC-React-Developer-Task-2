import { useMemo } from "react";
import useFileManagement from "../hooks/useFileManagement";
import NestedAccordion from "./NestedAccordion";

const Sidebar = () => {
  const { getFolders } = useFileManagement();
  const folders = useMemo(() => getFolders(), [getFolders]);
  return (
    <nav className="sidebar">
      <NestedAccordion folder={folders[0]} index={0} />
    </nav>
  );
};

export default Sidebar;