import { IconEyeClose, IconEyeOpen } from "components/icon";
import React, { Fragment, useState } from "react";
import Input from "./Input";

const InputPasswordToggle = ({control}) => {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={togglePassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        control={control}
      >
        {togglePassword ? (
          <IconEyeOpen onClick={() => setTogglePassword(false)} />
        ) : (
          <IconEyeClose onClick={() => setTogglePassword(true)} />
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
