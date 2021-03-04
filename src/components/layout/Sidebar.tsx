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
import { useLayoutStore } from "../../zustand-state/layout-state";

export const Sidebar = React.memo(() => {
  const sidebarExpanded = useLayoutStore((state) => state.sidebarExpanded);
  const requestSidebarExpanded = useLayoutStore(
    (state) => state.requestSidebarExpanded
  );

  const onClose = useCallback(() => requestSidebarExpanded(false), [
    requestSidebarExpanded,
  ]);

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
});
