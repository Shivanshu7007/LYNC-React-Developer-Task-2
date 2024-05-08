import React, { useMemo } from "react";
import useFileManagement from "../hooks/useFileManagement";
import { Types } from "../context/FolderDataContext";
import { FaFileAlt, FaFolder } from "react-icons/fa";
import { formatRelative, subDays } from "date-fns";
import { BiFileBlank } from "react-icons/bi";
import Edit from "./Edit";

const FolderData = () => {
  const { getFolders, getCurrentFolderId, updateCurrentFolderId } =
    useFileManagement();

  const folders: any = getFolders();

  const currentFolderId = getCurrentFolderId();

  const currentFolderData: any = useMemo(() => {
    let currentData: any;
    const getData = (obj: any) => {
      if (obj.type === Types.FILE) {
        return;
      }
      if (obj.type === Types.FOLDER && obj.id === currentFolderId) {
        currentData = obj;
        return;
      }

      for (let i = 0; i < obj.contents.length; i++) {
        const currentObject = obj.contents[i];
        getData(currentObject);
        if (currentData) {
          return;
        }
      }
    };

    getData(folders[0]);
    return currentData;
  }, [folders, currentFolderId]);

  return currentFolderData.contents.length ? (
    <div className="folderData">
      <div className="folderDataHeader">
        <div>Name</div>
        <div>Last Modified</div>
        <div>Size</div>
      </div>
      <div>
        {currentFolderData?.contents?.map((data: any) => {
          return (
            <div className="folderDataHeader" key={data.id}>
              <div
                className="nameColumn"
                onDoubleClick={() => {
                  if (data.type === Types.FOLDER) {
                    updateCurrentFolderId(data.id);
                  }
                }}
              >
                {data.type === Types.FOLDER ? (
                  <FaFolder size={24} />
                ) : (
                  <FaFileAlt size={24} />
                )}
                {data.name}
              </div>
              <div>
                {data.lastModified &&
                  formatRelative(
                    subDays(new Date(data.lastModified), 0),
                    new Date()
                  )}
              </div>
              <div>{data.size ? `${data.size / 1000} KB` : "-"}</div>
              <Edit id={data.id} name={data.name} type={data.type} />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="empty">
      <BiFileBlank size={80} />
      <div>Empty Folder</div>
    </div>
  );
};

export default FolderData;
