import React from "react";

const Checkbox = ({ options, value, setValue }) => {

    function handleChange({target}){
        if(target.checked)
            setValue([...value, target.value]);
        else
            setValue(value.filter((item) => item !== target.value));
    }

    return (
        <>
            {options.map((option) => (
                <p key={option}>
                    <label className="flex items-center inline cursor-pointer">
                        <input
                            className="cursor-pointer hover:opacity-90 mr-3 appearance-none w-5 h-5 bg-white border-none rounded-sm focus:outline-none checked:bg-blue-700 checked:border-transparent relative checked:before:content-['✔'] checked:before:text-white checked:before:absolute checked:before:left-1 checked:before:top-0 checked:before:text-sm"
                            type="checkbox"
                            value={option}
                            checked={value.includes(option)}
                            onChange={handleChange}/>
                        <span
                            className="font-sans text-[26px]"
                        >{option}</span>
                    </label>
                </p>
            ))}
        </>
    )

}

export default Checkbox;