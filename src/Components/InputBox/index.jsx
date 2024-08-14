import "./index.scss";
import React, { useEffect, useRef, useState } from "react";
import BaseButton from "../Button";
import InputComment from "../Input/ref/index";

export default function BaseInputBox(props) {
  const { className, input, button } = props;
  const { onOk, onCancel } = button;
  const { getReplyInputValue } = input;

  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const customClassName = className
    ? `base-input-box ${className}`
    : `base-input-box`;

  useEffect(() => {
    //@ts-ignore
    inputRef.current && inputRef.current.focus();
  }, []);
  return (
    <div className={customClassName}>
      <InputComment
        ref={inputRef}
        // @ts-ignore
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          getReplyInputValue && getReplyInputValue(e.target.value);
        }}
      />
      <div className="action-btn">
        <BaseButton onClick={onCancel && onCancel}>Cancel</BaseButton>
        <BaseButton disabled={inputValue ? false : true} onClick={onOk && onOk}>
          Ok
        </BaseButton>
      </div>
    </div>
  );
}
