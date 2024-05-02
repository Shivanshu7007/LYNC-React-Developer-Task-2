import { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import { MdCreateNewFolder } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import useFileManagement from "../hooks/useFileManagement";
import { Types } from "../context/FolderDataContext";
import { Button, Input } from "@mui/material";

// TODO: update current folder's lastModify

const UploadButton = () => {
  const [open, setOpen] = useState(false);
  const [nameModal, setNameModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("Untitled folder");
  const fileUploadRef = useRef<any>();

  const { addFile, addFolder } = useFileManagement();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    addFile({
      id: Date.now() + "",
      type: Types.FILE,
      fileType: fileUploadRef.current.files[0].type,
      name: fileUploadRef.current.files[0].name,
      size: fileUploadRef.current.files[0].size,
      lastModified: fileUploadRef.current.files[0].lastModified,
    });
    setOpen(false);
  };

  const handleNewFolder = () => {
    addFolder({
      id: Date.now() + "",
      type: Types.FOLDER,
      name: newFolderName,
      lastModified: Date.now(),
      contents: [],
    });
    setNameModal(false);
    setNewFolderName("Untitled folder");
  };

  return (
    <>
      <div className="newBtnWrapper">
        <button onClick={() => setOpen(true)}>
          <span className="plus-icon">+</span>
          <span>New</span>
        </button>
      </div>
      <Modal className="muiModal" open={open} onClose={() => setOpen(false)}>
        <div className="uploadModal">
          <div
            className="uploadItem"
            onClick={() => {
              setNameModal(true);
              setOpen(false);
            }}
          >
            <MdCreateNewFolder size={40} />
            New Folder
          </div>
          <div
            onClick={() => {
              fileUploadRef.current.click();
            }}
            className="uploadItem"
          >
            <input
              ref={fileUploadRef}
              hidden
              type="file"
              onChange={handleFileUpload}
            />
            <FaFileUpload size={40} />
            File Upload
          </div>
        </div>
      </Modal>
      <Modal
        className="muiModal"
        open={nameModal}
        onClose={() => setNameModal(false)}
      >
        <div className="uploadModal">
          <div className={"modalHeader"}>New Folder</div>
          <div className="uploadItem">
            <Input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
          </div>
          <div className="modalFooter">
            <Button
              onClick={handleNewFolder}
              disabled={!newFolderName}
              variant="outlined"
            >
              Create
            </Button>
            <Button onClick={() => setNameModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadButton;
