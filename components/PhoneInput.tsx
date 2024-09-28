import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneNumberInputProps {
  phone: string;
  setPhone: (phone: string) => void;
}

const PhoneNumberInput = ({ phone, setPhone }: PhoneNumberInputProps) => {
  // Update this function to match the expected signature
  const handlePhoneChange = (
    value: string,
    data: {},
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => {
    setPhone(value); // setPhone now receives the phone number directly
  };

  return (
    <div>
      <PhoneInput
        country={"us"}
        value={phone}
        onChange={handlePhoneChange} // Pass the updated handler
        inputProps={{
          name: "phone",
          required: true,
        }}
        enableSearch={true}
      />
    </div>
  );
};

export default PhoneNumberInput;
