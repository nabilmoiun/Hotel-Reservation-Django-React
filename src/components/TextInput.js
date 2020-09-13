import React from 'react';

export default function TextInput({
  divClass,
  htmlForLabel,
  labelName,
  inputClass,
  inputType,
  inputName,
  inputValue,
  inputPlaceHolder,
  onChange,
  required
}) {
  return (
    <div className={divClass}>
      <label htmlFor={htmlForLabel}>{labelName}</label>
      <input
        className={inputClass}
        type={inputType}
        name={inputName}
        value={inputValue}
        placeholder={inputPlaceHolder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
