import React from "react";

export default function Button(props) {
    let defStyle = {};

    const handleClick = () => {
        if (typeof props.onClick !== "function" ||
            props.disabled) return;
        props.onClick();
    }

    const {
        children, disabled, active, attractive,
        style: propsStyle, className: propsClassName } = props;

    let classes = ["button", propsClassName];
    disabled && classes.push("button_disabled");
    active && classes.push("button_active");
    attractive && classes.push("button_attractive");
    const className = classes.join(" ").trim();

    const style = Object.assign(defStyle, propsStyle);

    return <div
        onClick={handleClick}
        className={className}
        style={style}>
        {children}
    </div>;
}