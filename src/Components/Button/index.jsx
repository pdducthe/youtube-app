import React from "react";
import "./index.scss";

export default function BaseButton({ children,...rest }) {
  const {className} = rest;
  const customClassName = className
    ? `${className} base-button`
    : "base-button";
  // const isDisabled = useMemo(() => {
  //   return className === "disabled" ? true : false;
  // }, [className]);
  return (
    <button className={customClassName} {...rest}>
      {children}
    </button>
  );
}
