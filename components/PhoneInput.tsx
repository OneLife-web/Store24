"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  return (
    <div>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={handlePhoneChange}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
        }}
        enableSearch={true}
      />
    </div>
  );
};

export default PhoneNumberInput;
