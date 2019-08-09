import React from 'react'
import { App } from "./App.jsx";

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe("App", () => {
    const app = shallow(<App />);

    it("Тема переключается", () => {
        app.instance().toggleTheme();
        expect(app.state("theme")).toEqual("night");
    });
});