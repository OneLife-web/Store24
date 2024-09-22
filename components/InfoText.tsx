"use client";
import React from "react";

interface InfoTextProps {
  text: string;
}

const InfoText: React.FC<InfoTextProps> = ({ text }) => {
  return <div className="bodyText">{text}</div>;
};

export default InfoText;
