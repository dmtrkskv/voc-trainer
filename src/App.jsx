import React from 'react';
// import Image from "./svg/burger.svg";

import Header from "./Header.jsx";
import ContentController from "./ContentController.jsx";

// import Footer from "./Footer.jsx";



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <ContentController />
            </div>
        );
    }
}