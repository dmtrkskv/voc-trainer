import React from "react";

export default function Button(props) {
    let defStyle = {};
    const defClassName = "button";

    const handleClick = () => {
        if (typeof props.onClick !== "function" ||
            props.disabled) return;
        props.onClick();
    }

    const {
        children, disabled, active, attractive,
        style: propsStyle, className: propsClassName } = props;

    let classes = [defClassName, propsClassName];
    disabled && classes.push("disabled");
    active && classes.push("active");
    attractive && classes.push("attractive");
    const className = classes.join(" ").trim();

    const style = Object.assign(defStyle, propsStyle);

    return <div
        onClick={handleClick}
        className={className}
        style={style}>
        {children}
    </div>;
}