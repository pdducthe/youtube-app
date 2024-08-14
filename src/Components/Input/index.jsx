import React from "react";
import './index.scss';

export default function BaseInput({...children
}) {
  return (
    <input
      className="base-input"
      {...children}
    />
  );
}
