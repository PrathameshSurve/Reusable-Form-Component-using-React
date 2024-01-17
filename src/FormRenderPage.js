import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import FormConstants from '../../components/FormConstants.js';

const FormRenderPage = (props) => {

  const errRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});



  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  const dropdowns = [
    ["Scheme Validity Type", "Choose Scheme Valididty Type", false],
    ["dropdownname2", "Select an option", false],
    ["dropdownname3", "Select an option", false]
  ]

  const dropdownOptions = [
    ["Swap"],
    ["B"],
    ["C", "s", "j", "s"]
  ]

  const formElements = [
    ['input'],
    ['select'],
    ['multiselect'],
    ['switch']
  ];

  const inputFields = [
    ['text', 'Scheme Name', 'Enter Scheme Name', false, '^[A-Za-z\\s]+$', 'nameErr', 'Please Enter Valid Scheme Name'],
    ['number', 'Scheme Validity Limit', 'Enter Scheme Valid Limit', false, '^[0-9]{10}$', 'valididtyErr', 'Please Enter Valid number of digits'],
    ['text', 'Description', 'Enter Description', false, '^[A-Za-z\\s]+$', 'descriptionErr', 'Please Enter valid format of decription'],
  ];

  const switchFields = [
    ['swicth1 dsf'],
    ['switch2'],
    ['switch3 sdfds sdfs'],
    ['switch4 sdsds sdsd sdds']
  ];

  const handleCancelFunction = () => {
    navigate('/route_to_previous_page');
  }

  const handleSubmitFunction = (formData) => {
    console.log(formData);
  }

  const buttons = [
    { label: 'Submit', onClick: handleSubmitFunction, type: "submit" },
    { label: 'Cancel', onClick: handleCancelFunction, disabled: false },
  ];

  const multiselectFields = [
    {
      id: 'exampleMultiselect1',
      multiselectOptions: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      showCheckbox: true,
      placeholder: 'Select Options1',
    },

  ];

  return (

        <div className="col-md-12 mb-4">
          <div className="col-md-3">
            <FormConstants elements={formElements} inputFields={inputFields} onSubmit={handleSubmitFunction} dropdowns={dropdowns} selectOptions={dropdownOptions} multiselectFields={multiselectFields} switchFields={switchFields} buttons={buttons} />   
          </div>
        </div>
  );

}

export default FormRenderPage;
