import React, { useCallback } from "react";
import {
  Button,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useLayoutDispatcher, useSidebarExpanded } from "./layoutManager";

export const Sidebar = () => {
  const sidebarExpanded = useSidebarExpanded();
  const { closeSidebar } = useLayoutDispatcher();
  const onClose = useCallback(() => closeSidebar(), [closeSidebar]);

  return (
    <>
      <Drawer isOpen={sidebarExpanded} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>The Sidebar</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button color="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
