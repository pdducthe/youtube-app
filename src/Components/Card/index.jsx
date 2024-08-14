import React, { forwardRef, useEffect, useRef, useState } from "react";
import "./index.scss";

const InputComment = forwardRef(function InputComment(props, ref) {
  // @ts-ignore
  const { value, ...rest } = props;
  return <input {...rest} ref={ref} value={value} />;
});

export default function BaseCard(props) {
  const {
    title,
    subtitle,
    image,
    id,
    selectedCommentId,
    getInputValue,
    isDisabledInput,
    ...rest
  } = props;
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    // @ts-ignore
    if (selectedCommentId === id) {
      //@ts-ignore
      inputRef.current && inputRef.current.focus();
    }
  }, [selectedCommentId, id]);

  return (
    <div className="card" {...rest}>
      <div className="left-container">
        {image && (
          <div className="image-container">
            <img src={image} alt="" />
          </div>
        )}
      </div>
      <div className="right-container">
        {/* <p className="title">{title}</p> */}
        <InputComment
          ref={inputRef}
          // @ts-ignore
          disabled={isDisabledInput ? isDisabledInput : false}
          // @ts-ignore
          onChange={(e) => {
            setInputValue(e.target.value)
            getInputValue && getInputValue(e.target.value);
          }}
          // @ts-ignore
          value={inputValue}
        />
        <p className="subtitle">{subtitle}</p>
      </div>
    </div>
  );
}
