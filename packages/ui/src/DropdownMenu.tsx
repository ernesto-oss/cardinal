import * as React from "react";
import * as DropdownMenuComponent from "@radix-ui/react-dropdown-menu";

interface DropdownMenuProps extends DropdownMenuComponent.DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, trigger, ...props }) => {
  return (
    <DropdownMenuComponent.Root {...props}>
      <DropdownMenuComponent.Trigger asChild>{trigger}</DropdownMenuComponent.Trigger>
      <DropdownMenuComponent.Portal>
        <DropdownMenuComponent.Content
          className="animate-fade-in-up h-full rounded-md border border-gray-300 bg-white shadow-lg shadow-gray-900/50"
          sideOffset={10}
          side="bottom"
          align="end"
        >
          {children}
        </DropdownMenuComponent.Content>
      </DropdownMenuComponent.Portal>
    </DropdownMenuComponent.Root>
  );
};

export const DropdownItem = DropdownMenuComponent.Item;
export const DropdownItemIndicator = DropdownMenuComponent.ItemIndicator;
export const DropdownGroup = DropdownMenuComponent.Group;
export const DropdownSeparator = DropdownMenuComponent.Separator;
