import React from 'react'
import { useState } from 'react';

function DropdownListShow() {
    //Using useState to set the defualt value of DropDown Menu and declare the values
    const [selectedValue, setSelectedValue] = useState('Option 1');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <select className='p-2  font-semibold border-2 w-auto border-slate-500 rounded-md bg-black text-white' value={selectedValue} onChange={handleChange}>
            <option className='bg-white text-black' id='movies' value="Option 1">Movies</option>
            <option className='bg-white text-black' id='tv' value="Option 2">Tv Shows</option>
           
        </select>
    );
}
export default DropdownListShow;


