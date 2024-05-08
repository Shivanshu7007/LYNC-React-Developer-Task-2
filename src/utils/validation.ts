import { Folder } from "../context/FolderDataContext";

export const checkWithSameName = (data: Folder[], newData: File | Folder) => {
  return data.some((d) => d.type === newData.type && d.name === newData.name);
};