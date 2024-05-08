import { Toaster } from "react-hot-toast";
import "./App.css";
import Breadcrumb from "./components/Breadcrumb";
import FolderData from "./components/FolderData";
import Sidebar from "./components/Sidebar";
import UploadButton from "./components/UploadButton";
import { FolderDataProvider } from "./context/FolderDataContext";
import { ImOnedrive } from "react-icons/im";

function App() {
  return (
    <main className="main">
      <FolderDataProvider>
        <header className="header">
          <div className="headerContent">
          <ImOnedrive size={50} />
            <span> My Drive</span>
          </div>
        </header>
        <div className="mid">
          <div className="leftSection">
            <UploadButton />
            <Sidebar />
          </div>
          <div className="rightSection">
            <Breadcrumb />
            <FolderData />
          </div>
        </div>
      </FolderDataProvider>
      <Toaster position="top-center" />
    </main>
  );
}

export default App;