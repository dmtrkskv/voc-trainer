import React from "react";

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.defStyle = { marginRight: "50px" };
    }

    handleChange = e => {
        const v = e.target.value;
        this.setState({ value: v });
        this.props.search(v);
    }

    render() {
        const style = { ...this.defStyle, ...this.props.style };
        return <input style={style} type="text" value={this.state.value} onChange={this.handleChange} />;
    }
}