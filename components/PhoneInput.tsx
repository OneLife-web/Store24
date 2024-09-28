import React, { useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberInputProps {
  phone: string;
  setPhone: (phone: string) => void;
}

const PhoneNumberInput = ({ phone, setPhone }: PhoneNumberInputProps) => {
  const phoneInputRef = useRef<HTMLInputElement>(null); // Create a ref for the input

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  useEffect(() => {
    // Blur the input after the component mounts
    if (phoneInputRef.current) {
      phoneInputRef.current.blur();
    }
  }, []);

  return (
    <div>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={handlePhoneChange} // Pass the updated handler
        inputProps={{
          name: "phone",
          required: true,
          ref: phoneInputRef, // Assign the ref to the inputProps
        }}
        enableSearch={true}
      />
    </div>
  );
};

export default PhoneNumberInput;