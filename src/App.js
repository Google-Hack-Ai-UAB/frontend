import "./App.css";
import FileUploader from "./components/Files/FileUploader";
import Auth0LoginButton from "./components/Auth/Auth0LoginButton";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUploader></FileUploader>
        <Auth0LoginButton></Auth0LoginButton>
      </header>
    </div>
  );
}

export default App;
