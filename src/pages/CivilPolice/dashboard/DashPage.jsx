import React from "react";
import TheftCount from "../TheftCount";
import AccidentCount from "../AccidentCount";
import SearchEngine from '../SearchEngine';
import { overrideThemeVariables} from "ui-neumorphism";
overrideThemeVariables({
  "--light-bg": "#fff",
  "--light-bg-dark-shadow": "#212f4d",
  "--light-bg-light-shadow": "#B9BDBF",
  "--dark-bg": "#33394d",
  "--dark-bg-dark-shadow": "#000000",
  "--dark-bg-light-shadow": "#111827",
  "--primary": "#c91ec4",
  "--primary-dark": "#4526f9",
  "--primary-light": "#c7befd",
});

const CDashPage = () => {
  return (
    <>
      <div className="row m-5 p-2 justify-content-between">
          <TheftCount />
          <AccidentCount />
      </div>
      <div className="row justify-content-center">
        <SearchEngine />
      </div>
    </>
  );
};

export default CDashPage;
