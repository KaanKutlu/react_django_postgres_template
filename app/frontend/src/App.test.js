import App from './App';
import LabSelector from './Components/Utils/LabSelector';
import Upload from './Components/Upload/Upload';
import IlluminaMachineUpload from './Components/Upload/IlluminaMachineUpload';
import LogoHeader from './Components/Header/KarilianHeader';

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("ensure header is in placae", () => {
  act(() => {
    render(<App data-testid="map" />, container);
  });
  

  expect(container.getElementsByClassName("title")[0].textContent).toBe("NGS Monitor");

})