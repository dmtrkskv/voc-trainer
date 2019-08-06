import React from "react";
import Button from "./Button.jsx";

import { Context } from "./Context.jsx";

export default function Empty(props) {
    return <Context.Consumer>
        {({ theme, beginSelection }) =>
            <div className="app__empty">
                It`s empty <br />
                <Button onClick={beginSelection} attractive>Click</Button>
                to add items
                 </div>
        }
    </Context.Consumer>
}