import { useCallback, useContext } from "react";
import { FolderDataContext, Types } from "../context/FolderDataContext";
import { checkWithSameName } from "../utils/validation";
import toast from "react-hot-toast";

const useFileManagement = () => {
  const { folders, currentFolderId, setCurrentFolderId, setFolders } =
    useContext(FolderDataContext);

  const getFolders = useCallback(() => folders, [folders]);

  const getCurrentFolderId = useCallback(
    () => currentFolderId,
    [currentFolderId]
  );

  const updateCurrentFolderId = (id: string) => setCurrentFolderId(id);

  const add = (data: any) => {
    let updatedData: any;
    const addData = (obj: any) => {
      if (obj.type === Types.FILE) {
        return;
      }
      if (obj.type === Types.FOLDER && obj.id === currentFolderId) {
        if (checkWithSameName(obj.contents, data)) {
          toast.error(
            `${data.type.toLowerCase()} with same name already exists!`
          );
          return;
        }
        obj.contents = [...obj.contents, data];
        updatedData = folders;
        return;
      }

      for (let i = 0; i < obj.contents.length; i++) {
        const currObj = obj.contents[i];
        addData(currObj);
        if (updatedData) {
          return;
        }
      }
    };

    addData(folders[0]);

    setFolders([...folders]);
  };

  const rename = (data: { name: string; id: string; type: Types }) => {
    let updatedData: any;
    const renameData = (obj: any) => {
      if (obj.type === data.type && obj.id === data.id) {
        obj.name = data.name;
        obj.lastModified = Date.now();
        updatedData = folders;
        return;
      }

      for (let i = 0; i < obj.contents.length; i++) {
        const currObj = obj.contents[i];
        renameData(currObj);
        if (updatedData) {
          return;
        }
      }
    };

    renameData(folders[0]);

    setFolders([...folders]);
  };

  const remove = (data: { name: string; id: string; type: Types }) => {
    let updatedData: any;
    const removeData = (obj: any) => {
      if (updatedData) {
        return;
      }
      for (let i = 0; i < obj.contents.length; i++) {
        const currObj = obj.contents[i];

        if (currObj.type === data.type && currObj.id === data.id) {
          obj.contents = obj.contents.filter(
            (_: any, index: number) => i !== index
          );
          updatedData = folders;
          return;
        }
        removeData(currObj);
      }
    };

    removeData(folders[0]);

    setFolders([...folders]);
  };

  return {
    getFolders,
    getCurrentFolderId,
    updateCurrentFolderId,
    addFolder: add,
    addFile: add,
    renameFile: rename,
    renameFolder: rename,
    remove,
  };
};

export default useFileManagement;