import { useState } from "react";
export type OnChangeFn<T> = (item?: T) => void;

// useDropDown keeps the useful state of a dropdown and triggers
// onChange if the item is changed or cleared
export default function useDropdown<T>({
  onChange
}: { onChange?: OnChangeFn<T> } = {}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  // Item properties
  const getItemProps = ({ item }: { item: T }) => {
    return {
      onClick: () => {
        setSelectedItem(item);
        setIsOpen(false);
        onChange && onChange(item);
      }
    };
  };

  // Clear the item and trigger the onChange
  const clearItem = () => {
    setSelectedItem(null);
    onChange && onChange(null);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return {
    // State
    isOpen,
    selectedItem,
    // Actions
    clearItem,
    getItemProps,
    toggleOpen
  };
}
