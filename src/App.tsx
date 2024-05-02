import "./App.css";
import Breadcrumb from "./components/Breadcrumb";
import FolderData from "./components/FolderData";
import UploadButton from "./components/UploadButton";
import { FolderDataProvider } from "./context/FolderDataContext";

function App() {
  return (
    <main className="main">
      <FolderDataProvider>
        <header className="header">
          <div className="headerContent">
            <img src="logo513.png" alt="header-logo" width={50} height={50} />
            <span>My Drive</span>
          </div>
        </header>
        <div className="mid">
          <div className="leftSection">
            <UploadButton />
            <nav className="sidebar">
              <div className="item">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="arrow"></span>
                  <img
                    src="home.png"
                    width={20}
                    height={20}
                    alt="drive-icon"/>
                </div>
                <span>Home</span>
              </div>
            </nav>
            
          </div>
          <div className="rightSection">
            <Breadcrumb />
            <FolderData />
          </div>
        </div>
      </FolderDataProvider>
    </main>
  );
}

export default App;
