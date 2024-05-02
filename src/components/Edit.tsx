import { Button, Input, Modal } from "@mui/material";
import React, { useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { Types } from "../context/FolderDataContext";
import useFileManagement from "../hooks/useFileManagement";

interface EditProps {
  type: Types;
  name: string;
  id: string;
}

const Edit: React.FC<EditProps> = ({ type, name, id }) => {
  const [open, setOpen] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState(name);
  const { renameFolder, remove } = useFileManagement();

  const handleNewFolder = () => {
    renameFolder({ type, id, name: newFolderName });
    setRenameModal(false);
  };

  const handleDelete = () => {
    remove({ name, type, id });
    setOpen(false);
  };

  return (
    <div className="edit">
      <MdEdit onClick={() => setOpen(true)} size={24} />
      <Modal className="muiModal" open={open} onClose={() => setOpen(false)}>
        <div className="uploadModal">
          <div
            className="uploadItem"
            onClick={() => {
              setRenameModal(true);
              setOpen(false);
            }}
          >
            <MdOutlineDriveFileRenameOutline size={40} />
            Rename {type === Types.FOLDER ? "Folder" : "File"}
          </div>
          <div onClick={handleDelete} className="uploadItem">
            <MdDelete size={40} />
            Delete {type === Types.FOLDER ? "Folder" : "File"}
          </div>
        </div>
      </Modal>
      <Modal
        className="muiModal"
        open={renameModal}
        onClose={() => setRenameModal(false)}
      >
        <div className="uploadModal">
          <div className={"modalHeader"}>
            Rename {type === Types.FOLDER ? "Folder" : "File"}
          </div>
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
              Save
            </Button>
            <Button onClick={() => setRenameModal(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Edit;
