import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        let defStyle = { width: "100px", height: "50px" };

        let { className, style } = this.props;
        if (className) {
            className = " " + className;
        } else {
            className = "";
        }

        this.state = {
            style: Object.assign(defStyle, style),
            className: "button " + className
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (typeof this.props.onClick !== "function") return;
        this.props.onClick();
    }

    render() {
        let { style, className } = this.state;
        const { children, disabled } = this.props;
        disabled && (className += " disabled");
        
        return <div
            onClick={this.handleClick}
            className={className}
            style={style}>
            {children}
        </div>
    }
}