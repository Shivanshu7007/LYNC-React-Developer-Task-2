import { useContext } from "react";
import { FolderDataContext, Types } from "../context/FolderDataContext";

const useFileManagement = () => {
  const { folders, currentFolderId, setCurrentFolderId, setFolders } = useContext(FolderDataContext);

  const getFolders = () => folders;

  const getCurrentFolderId = () => currentFolderId;

  const updateCurrentFolderId = (id: string) => setCurrentFolderId(id);

  const add = (data: any) => {
    let isDuplicate = false;

    // Check if the new item is a folder
    if (data.type === Types.FOLDER) {
      // Check if there's already a folder with the same name in the current folder
      isDuplicate = folders[0].contents.some((item: any) => {
        return item.type === Types.FOLDER && item.name === data.name;
      });

      // If a folder with the same name already exists, display an alert and return
      if (isDuplicate) {
        alert('A folder with the same name already exists.');
        return;
      }
    }

    if (data.type === Types.FILE) {
      let fileName = data.name;
      let count = 1;
      let alertShown = false;

      // Function to check for duplicates
      const checkDuplicate = (name: string) => {
        return folders[0].contents.some((item: any) => {
          return item.type === Types.FILE && item.name === name;
        });
      };

      // Check if there's already a file with the same name in the current folder
      isDuplicate = checkDuplicate(fileName);

      // If a file with the same name already exists, prompt for confirmation to upload another file
      while (isDuplicate) {
        if (!alertShown) {
          const confirmUpload = window.confirm(`A file with the same name already exists. Do you want to upload another file?`);
          // If the user cancels, do not upload the file
          if (!confirmUpload) {
            return;
          }
          alertShown = true;
        }

        // Append a number in parentheses to the file name
        fileName = `${data.name} (${count})`;
        count++;

        // Check if the newly generated file name already exists
        isDuplicate = checkDuplicate(fileName);
      }

      // Update the data's name with the final file name
      data.name = fileName;
    }

    let updatedData: any;
    const addData = (obj: any) => {
      if (obj.contents && Array.isArray(obj.contents)) {
        if (obj.type === Types.FOLDER && obj.id === currentFolderId) {
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

    const removeData = (obj: any, updatedData: any) => {
      if (updatedData) {
        return;
      }
      if (obj.contents && Array.isArray(obj.contents)) {
        for (let i = 0; i < obj.contents.length; i++) {
          const currObj = obj.contents[i];
          if (currObj.type === data.type && currObj.id === data.id) {
            obj.contents = obj.contents.filter((_: any, index: number) => i !== index);
            updatedData = folders;
            return;
          }
          removeData(currObj, updatedData);
        }
      }
    };

    removeData(folders[0], updatedData);
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
