import React, { useMemo, useState } from "react";
import { Types } from "../context/FolderDataContext";
import useFileManagement from "../hooks/useFileManagement";
import { FaFolder, FaHome } from "react-icons/fa";

type File = {
  id: string;
  name: string;
  size: number;
  type: Types.FILE;
  fileType?: string;
  lastModified?: Date;
};

type Folder = {
  id: string;
  name: string;
  type: Types.FOLDER;
  contents: (File | Folder)[];
  lastModified?: Date;
};

const NestedAccordion = ({
  folder,
  index,
}: {
  folder: Folder;
  index: number;
}) => {
  const { updateCurrentFolderId, getCurrentFolderId } = useFileManagement();
  const currentFolderId = useMemo(
    () => getCurrentFolderId(),
    [getCurrentFolderId]
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div>
        <div
          className={`item ${
            currentFolderId === folder.id ? "selectedItem" : ""
          }`}
          onClick={() => updateCurrentFolderId(folder.id)}
        >
          {[...Array(index)].map((_, i) => (
            <div key={i} style={{ height: 5, width: 5 }}></div>
          ))}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              className={`arrow ${isOpen ? "openArrow" : "closeArrow"}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen((prev) => !prev);
              }}
            ></span>
          </div>
          {index === 0 ? <FaHome size={20} /> : <FaFolder size={20} />}
          <span>{folder.name}</span>
        </div>
      </div>
      <div style={isOpen ? {} : { display: "none" }}>
        {folder.contents.map((item, i) => {
          if (item.type === Types.FILE) {
            return <React.Fragment key={i}></React.Fragment>;;
          }
          return <NestedAccordion folder={item as Folder} index={index + 1} />;
        })}
      </div>
    </>
  );
};

export default NestedAccordion;