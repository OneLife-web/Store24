'use client';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handlePhoneChange = (value: string) => {
    setPhone(value);

    if (!isValidPhoneNumber(value)) {
      setError('Invalid phone number');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={handlePhoneChange}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true
        }}
        enableSearch={true}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PhoneNumberInput;