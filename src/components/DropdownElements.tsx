import React from "react";
import styled from "@emotion/styled";

const colors = {
  primary: "#3471D4",
  border: "#92B1DC"
};

export const DropdownContainer = styled("div")({
  width: "20rem",
  margin: "auto",
  position: "relative"
});

export const InputContainer = styled("div")({
  display: "flex",
  width: "100%",
  fontSize: "1rem",
  lineHeight: "1rem",
  whiteSpace: "normal",
  minHeight: "2rem",
  outline: "0",
  marginTop: "0.5rem",
  padding: "0.5rem",

  border: "1px solid #aaa",
  borderRadius: "0.3rem",
  transition: ".1s ease",
  boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
  "&:hover, &:focus": {
    borderColor: colors.border
  }
});

export const Input = styled("input")({
  width: "100%",
  fontSize: "1rem",
  minHeight: "2rem",
  outline: "0",
  boxShadow: "none",
  border: "none",
  borderRadius: ".30rem",
  transition: "0.1s ease"
});

export const Button = styled("button")({
  border: "none",
  backgroundColor: "#fff",
  cursor: "pointer",
  "&:focus": {
    outline: 0
  }
});

//------------------------------------------------------------
// Item List Elements
//------------------------------------------------------------
export const ItemList = styled("ul")<{
  isOpen?: boolean;
}>(
  {
    padding: 0,
    marginTop: 5,
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    maxHeight: "20rem",
    overflowY: "auto",
    overflowX: "hidden",
    outline: "0",
    transition: "opacity .1s ease",
    borderRadius: ".3rem",
    boxShadow: "0 2px 3px 0 rgba(34,36,38,.15)",
    borderColor: colors.border,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: "solid",
    zIndex: 20
  },
  ({ isOpen }) => ({
    border: isOpen ? null : "none"
  })
);

const ItemContainer = styled("li")<{ isSelected: boolean }>(
  {
    alignItems: "center",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    display: "flex",
    fontSize: "1rem",
    height: "auto",
    justifyContent: "space-between",
    lineHeight: "1rem",
    overflow: "hidden",
    padding: ".8rem 1.1rem",
    position: "relative",
    textAlign: "left",
    textOverflow: "ellipsis",
    textTransform: "none",
    whiteSpace: "nowrap",
    wordWrap: "normal",
    "&:hover": {
      background: colors.primary,
      color: "white"
    }
  },
  ({ isSelected }) =>
    isSelected
      ? {
          color: "rgba(0,0,0,.95)",
          fontWeight: "700"
        }
      : null
);
export function DropdownItem({ itemText, isSelected, ...wrapperProps }) {
  return (
    <ItemContainer isSelected={isSelected} {...wrapperProps}>
      <ItemText>{itemText}</ItemText>
      {isSelected && <CheckmarkIcon data-testid="checkmark" />}
    </ItemContainer>
  );
}

export const ItemText = styled("span")({
  width: "calc(100% - 12px)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  display: "inline-block"
});

export function CheckmarkIcon(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" {...props}>
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  );
}

export function ArrowIcon({ isOpen }: { isOpen?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="grey"
      strokeWidth="1px"
      transform={isOpen ? "rotate(180)" : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  );
}

export function ClearIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      height={12}
      fill="transparent"
      stroke="grey"
      strokeWidth="1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  );
}
