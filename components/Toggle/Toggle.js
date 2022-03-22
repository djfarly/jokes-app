import { useState } from "react";

import styled from "styled-components";

function useToggle(defaultValue) {
  const [isActive, setIsActive] = useState(defaultValue);

  function toggle() {
    setIsActive(!isActive);
  }

  return [isActive, toggle];
}

export function Toggle() {
  const [isActive, handleClick] = useToggle(false);

  return (
    <Button onClick={handleClick}>
      {isActive ? "Deactivate" : "Activate!"}
    </Button>
  );
}

const Button = styled.button``;
