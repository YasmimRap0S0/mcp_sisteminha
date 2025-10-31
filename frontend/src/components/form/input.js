import React from "react";

const Input = ({id, label, setValue, ...props}) => {
    return (
        <p>
            <label htmlFor={id}>{id}</label>
            <input type="text" id={id} onChange={(({target}) => setValue(target.value))} {...props} />
        </p>
    )
}

export default Input;