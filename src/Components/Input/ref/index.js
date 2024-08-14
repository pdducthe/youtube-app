import React from "react";
import { forwardRef } from "react";

const InputComment = forwardRef(function InputComment(props, ref) {
  // @ts-ignore
  const { value, ...rest } = props;
  return <input {...rest} ref={ref} value={value} />;
});

export default InputComment;
