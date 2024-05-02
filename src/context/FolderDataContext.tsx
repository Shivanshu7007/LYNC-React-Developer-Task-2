import React, { createContext, useState } from "react";
export enum Types {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

export type File =
  | {
      id: string;
      name: string;
      size: number;
      type: Types.FILE;
      fileType?: string;
      lastModified?: Date;
    }
  | {};

export type Folder =
  | {
      id: string;
      name: string;
      type: Types.FOLDER;
      contents: (Folder | File)[];
      lastModified?: Date;
    }
  | {};

const initialFolders = [
  {
    id: "1",
    name: "Home",
    type: Types.FOLDER,
    lastModified: Date.now(),
    contents: [
      // {
      //   id: "2",
      //   name: "Folder 1",
      //   type: Types.FOLDER,
      //   lastModified: Date.now(),
      //   contents: [
      //     {
      //       id: "3",
      //       name: "Folder 2",
      //       type: Types.FOLDER,
      //       lastModified: Date.now(),
      //       contents: [
      //         {
      //           id: "4",
      //           name: "Folder 3",
      //           type: Types.FOLDER,
      //           lastModified: Date.now(),
      //           contents: [
      //             {
      //               id: "5",
      //               name: "Folder 4",
      //               type: Types.FOLDER,
      //               lastModified: Date.now(),
      //               contents: [],
      //             },
      //             {
      //               id: "file1",
      //               name: "File 1",
      //               type: Types.FILE,
      //               size: 300000,
      //               lastModified: Date.now(),
      //             },
      //             {
      //               id: "file2",
      //               name: "File 2",
      //               type: Types.FILE,
      //               size: 380000,
      //               lastModified: Date.now(),
      //             },
      //             {
      //               id: "file3",
      //               name: "File 3",
      //               type: Types.FILE,
      //               size: 500000,
      //               lastModified: Date.now(),
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
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

  return (
    <FolderDataContext.Provider
      value={{ folders, setFolders, currentFolderId, setCurrentFolderId }}
    >
      {children}
    </FolderDataContext.Provider>
  );
}
