import React, { createContext, useCallback, useEffect, useState } from "react";
export enum Types {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

export interface File {
  id: string;
  name: string;
  size: number;
  type: Types.FILE;
  fileType?: string;
  lastModified?: number;
}

export interface Folder {
  id: string;
  name: string;
  type: Types.FOLDER;
  contents: (Folder | File)[];
  lastModified?: number;
}

const initialFolders = [
  {
    id: "1",
    name: "Home",
    type: Types.FOLDER as const,
    contents: [],
    lastModified: Date.now(),
  },
];

const initialData = {
  folders: initialFolders as any,
  setFolders: (data: any) => {},
  currentFolderId: "1",
  setCurrentFolderId: (id: string) => {},
};

export const FolderDataContext = createContext(initialData);

export function FolderDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [currentFolderId, setCurrentFolderId] = useState<string>("1");

  const handlebeforeUnload = useCallback(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    const storageFolders = localStorage.getItem("folders");

    if (storageFolders) {
      setFolders(JSON.parse(storageFolders));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handlebeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handlebeforeUnload);
    };
  }, [handlebeforeUnload]);

  return (
    <FolderDataContext.Provider
      value={{ folders, setFolders, currentFolderId, setCurrentFolderId }}
    >
      {children}
    </FolderDataContext.Provider>
  );
}