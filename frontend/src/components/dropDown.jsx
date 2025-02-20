import React from 'react'
import { useState } from 'react';

function DropdownList() {
    //Using useState to set the defualt value of DropDown Menu and declare the values
    const [selectedValue, setSelectedValue] = useState('Option 1');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <select className='p-2 w-24 font-semibold border-2 border-slate-500 rounded-md bg-black text-white' value={selectedValue} onChange={handleChange}>
            <option className='bg-white text-black'  id='india' value="Option 1">India</option>
            <option className='bg-white text-black'  id='global' value="Option 2">Global</option>
           
        </select>
    );
}
export default DropdownList;


