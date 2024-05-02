import React, { useCallback } from "react";
import useFileManagement from "../hooks/useFileManagement";
import { Types } from "../context/FolderDataContext";

const Breadcrumb = () => {
  const { getFolders, getCurrentFolderId, updateCurrentFolderId } =
    useFileManagement();

  const folders: any = getFolders();

  const currentFolderId = getCurrentFolderId();

  const getFolderList = useCallback(() => {
    let folderList: { name: string; id: string }[] = [];

    const findPath = (obj: any) => {
      for (let i = 0; i < obj.contents.length; i++) {
        const currObj = obj.contents[i];

        if (currObj.type === Types.FOLDER && currObj.id === currentFolderId) {
          folderList = [{ name: currObj.name, id: currObj.id }];
          return;
        }

        if (currObj.type === Types.FOLDER) {
          findPath(currObj);
        }

        if (folderList.length) {
          folderList = [{ name: currObj.name, id: currObj.id }, ...folderList];
          return;
        }
      }
    };

    findPath(folders[0]);
    return [{ name: folders[0].name, id: folders[0].id }, ...folderList];
  }, [folders, currentFolderId]);

  const folderList = getFolderList();
  return (
    <div className="breadcrumb">
      {folderList.map((folderObj, index) => {
        return (
          <React.Fragment key={folderObj.id}>
            <div
              className={`item ${
                index === folderList.length - 1 ? "selected" : ""
              } `}
              onClick={() => updateCurrentFolderId(folderObj.id)}
            >
              {folderObj.name}
            </div>
            {index !== folderList.length - 1 && <div>{">"}</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
