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
import { useActions, useAppState } from "../../overmind";

export const Sidebar = React.memo(() => {
  const { layout } = useAppState();
  const { layout: actions } = useActions();

  const onClose = useCallback(() => {
    // TODO: Why is this not typed?
    (actions as any).requestSidebarExpanded(false);
  }, [actions]);

  return (
    <>
      <Drawer
        isOpen={layout.sidebarExpanded}
        placement="right"
        onClose={onClose}
      >
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
