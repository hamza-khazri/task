import React from "react";

interface props {
  name: string;
  type: string;
  placeholder: string;
}

function InputText({ name, type, placeholder }: props) {
  return <>
    <input name={name} type={type} placeholder={placeholder} className="w-full block bg-white p-2 rounded"/>
  </>;
}

export default InputText;
