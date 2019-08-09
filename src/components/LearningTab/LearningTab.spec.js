import React from 'react'
import { LearningTab } from "./index.jsx";

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });


describe("LearningTab", () => {

    it("Если слова не приходят, выводит сообщение о пустоте", () => {
        const props = {
            words: {}
        };

        const app = shallow(<LearningTab {...props} />);
        expect(app.find("Empty")).toHaveLength(1);
    });
});