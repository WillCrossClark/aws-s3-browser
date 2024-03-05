import React from "react";
import FileBrowser from "./pages/Homepage/components/FileBroswer/FileBrowser";
import Header from "./pages/Homepage/components/Header/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <FileBrowser />
    </>
  );
};

export default App;
