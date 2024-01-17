import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown'; // Install This from npm or yarn

import './multiselector-dropdown.css'

const ReusableForm = (props) => {

  const { elements, inputFields, dropdowns, selectOptions, multiselectFields, onSubmit, buttons = [] } = props;
  const [formData, setFormData] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);


  useEffect(() => {
    const anyFieldNotFilled = Object.values(formData).some((value) => value === '' || value == !value);
    const hasRegexError = Object.entries(formData).some(([name, value]) => {
      const fieldInfo = inputFields.find(([_, fieldId]) => fieldId === name);
      return fieldInfo && fieldInfo[4] && value && !new RegExp(fieldInfo[4]).test(value);
    });

    setDisableSubmit(anyFieldNotFilled || hasRegexError);
  }, [formData]);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: (prevData[fieldName] instanceof Array) ? [...prevData[fieldName], value] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log('Form submitted with data:', formData);
    setFormData({});
    const form = e.target;
    form.reset();
  };

  return (
    <div className='m-2' style={{ fontSize: "11px" }}>
      <form onSubmit={handleSubmit} className="row g-1">

        {/* {inputFields.map((fieldProps, index) => {
          const [type, id, placeholder, disabled, regex, errorHelpId, errorMessage] = fieldProps;
          return <div className="mb-2" key={index}>

            <label htmlFor={id} className="form-label mb-1">
              {id}
            </label>
            <input
              type={type}
              id={id}
              placeholder={placeholder}
              onChange={(e) => handleInputChange(id, e.target.value)}
              disabled={disabled}
              pattern={regex}
              autoComplete='off'
              aria-describedby={errorHelpId}
              required
              className="form-control form-control-sm font-size-12"
            />
            {regex && formData[id] && !new RegExp(regex).test(formData[id]) && (
              <div id={id} className='form-text text-warning mt-0'>{errorMessage}</div>)}
          </div>
        })} */}


        {/* {multiselect && (
          <div className="mb-2">
            <label htmlFor={multiselect.id} className="form-label mb-1">
              {multiselect.label}
            </label>
            <Multiselect
              options={multiselect.options}
              displayValue={multiselect.displayValue}
              showCheckbox={multiselect.showCheckbox}
              placeholder={multiselect.placeholder}
              avoidHighlightFirstOption={multiselect.avoidHighlightFirstOption}
              onSelect={(selectedList) => handleInputChange(multiselect.id, selectedList)}
            />
          </div>
        )} */}



        {elements.map(([type], index) => (
          <div className="" key={index} >

            {type === 'input' && (
              inputFields.map(([type, id, placeholder, disabled, regex, errorHelpId, errorMessage], index) => (
                <React.Fragment key={index}>
                  <div className="mb-2" >
                    <label htmlFor={id} className="form-label mb-1">
                      {id}
                    </label>
                    <input
                      type={type}
                      id={id}
                      placeholder={placeholder}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      disabled={disabled}
                      pattern={regex}
                      autoComplete='off'
                      aria-describedby={errorHelpId}
                      required
                      className="form-control form-control-sm font-size-12"
                    />
                    {regex && formData[id] && !new RegExp(regex).test(formData[id]) && (
                      <div id={id} className='form-text text-warning mt-0'>{errorMessage}</div>)}
                  </div>
                </React.Fragment>))
            )}

            {type === 'select' && (
              dropdowns.map(([dropdownName, defaultDropdownValue, disabled], index) => (
                <React.Fragment key={index}>
                  <div className="mb-2">
                    <label htmlFor={dropdownName} className="form-label mb-1">
                      {dropdownName}
                    </label>
                    <select
                      id={dropdownName}
                      disabled={disabled}
                      onChange={(e) => handleInputChange(dropdownName, e.target.value)}
                      required
                      className="form-control form-control-sm "
                      defaultValue=""
                      style={{ fontSize: "11px" }}
                    >
                      <option disabled value="">{defaultDropdownValue}</option>
                      {selectOptions[index].map((dropdownOption, optionIndex) => (
                        <option key={optionIndex} value={dropdownOption}>{dropdownOption}</option>
                      ))}
                    </select>
                  </div>
                </React.Fragment>
              ))
            )}


            {type === 'multiselect' && (
              multiselectFields.map(({ id, multiselectOptions, showCheckbox, placeholder }, index) => (
                <React.Fragment key={index}>
                  <div className="mb-2">
                    <label htmlFor={id} className="form-label mb-1">
                      {id}
                    </label>
                    <Multiselect
                      id={id}
                      options={multiselectOptions}
                      displayValue={multiselectOptions.id  || 'label'}
                      showCheckbox={showCheckbox || false}
                      placeholder={placeholder || 'Search & Select Multiple Options'}
                      avoidHighlightFirstOption={true}
                      onSelect={(selectedList, selectedItem) => handleInputChange(id, selectedItem)}
                    />
                  </div>
                </React.Fragment>
              ))
            )}

            {/* Add more conditionals for other types of form elements here */}

          </div>
        ))}


        <div className='mb-2'>
          {buttons.map((button, index) => (
            <button
              key={index}
              type={button.type || 'button'}
              onClick={button.onClick}
              className={`btn btn-sm btn-voltup-theme ${button.className || ''}`}
              disabled={button.disabled == false ? false : disableSubmit}
            >
              {button.label}
            </button>
          ))}



        </div>

      </form>
    </div>
  );
};

export default ReusableForm;
