import * as React from "react";
import {
  DropdownContainer,
  InputContainer,
  Input,
  ItemList,
  DropdownItem,
  Button,
  ClearIcon,
  ArrowIcon
} from "./DropdownElements";
import useDropdown, { OnChangeFn } from "../hooks/useDropdown";

export type Item = {
  key: string;
  name: string;
};

function itemToString(item?: Item) {
  return item ? item.name : "";
}

export default function Dropdown({
  items,
  onChange,
  loading,
  placeholder = "Choose one...",
  labelText = "Choose an item from the dropdown list"
}: {
  items?: Item[];
  onChange?: OnChangeFn<Item>;
  loading?: boolean;
  labelText?: string;
  placeholder?: string;
}) {
  // A custom hook was chosen so that the state and actions
  // could be used for another component just by applying the
  // same set of state and actions
  // This allows the component to be fully customized.
  // Supplying render props is another approach that could be considered
  // if there is a often a component that needs to be replaced such as
  // how the DropdownItem is rendered

  const {
    // State
    isOpen,
    selectedItem,
    // Actions and Helpers
    toggleOpen,
    clearItem,
    getItemProps
  } = useDropdown<Item>({ onChange });

  return (
    <DropdownContainer>
      <label>{labelText}</label>
      <InputContainer>
        <Input
          value={itemToString(selectedItem)}
          onClick={toggleOpen}
          placeholder={loading ? "Loading..." : placeholder}
          readOnly
          data-testid="input"
        />

        {selectedItem && (
          <Button onClick={clearItem} data-testid="clear">
            <ClearIcon />
          </Button>
        )}
        <Button onClick={toggleOpen}>
          <ArrowIcon isOpen={isOpen} />
        </Button>
      </InputContainer>
      {isOpen && (
        <ItemList isOpen={isOpen}>
          {items.map(item => {
            const isSelected = item === selectedItem;

            return (
              <DropdownItem
                key={item.key}
                isSelected={isSelected}
                itemText={itemToString(item)}
                data-testid={`item-${item.key}`}
                {...getItemProps({ item })}
              />
            );
          })}
        </ItemList>
      )}
    </DropdownContainer>
  );
}
