import React from 'react';
import Header from "./Header.jsx";
import ContentController from "./ContentController.jsx";

// import Footer from "./Footer.jsx";



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nightTheme: false };
    }

    toggleTheme = () => {
        this.setState({ nightTheme: !this.state.nightTheme });
    }

    render() {
        let className = "wrapper";
        this.state.nightTheme && (className += " night");
        return (
            <div className={className}>
                <Header toggleTheme={this.toggleTheme} />
                <ContentController />
            </div>
        );
    }
}