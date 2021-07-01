import React, {useRef, useState, useCallback} from 'react';
import { Button, ContextualMenu, ContextualMenuItem } from '@fluentui/react-native';

import {
  // MenuButtonName,
  MenuButtonProps,
  // MenuButtonSlotProps,
  // MenuButtonType,
  // MenuButtonRenderData,
  // MenuButtonContext,
  // MenuButtonState,
} from './MenuButton.types';

export const MenuButton = (props: MenuButtonProps) => {
  const stdBtnRef = useRef(null);

  const content = props.content || ''
  const menuItems = props.menuItems || []

  const [showContextualMenu, setShowContextualMenu] = useState(false);
  // const [focusOnMount, setShouldFocusOnMount] = React.useState(true);
  // const toggleFocusOnMount = React.useCallback((value) => setShouldFocusOnMount(value), [setShouldFocusOnMount]);
  // const [focusOnContainer, setShouldFocusOnContainer] = React.useState(false);
  // const toggleFocusOnContainer = React.useCallback((value) => setShouldFocusOnContainer(value), [setShouldFocusOnContainer]);

  const toggleShowContextualMenu = useCallback(() => {
    setShowContextualMenu(!showContextualMenu);
  }, [showContextualMenu, setShowContextualMenu]);

  // const onShowContextualMenu = React.useCallback(() => {
  //   setIsContextualMenuVisible(true);
  // }, [setIsContextualMenuVisible]);

  const onDismissContextualMenu = React.useCallback(() => {
    setShowContextualMenu(false);
    // setIsContextualMenuVisible(false);
  }, [setShowContextualMenu]);

  return (
    <>
      <Button content={content}  componentRef={stdBtnRef} onClick={toggleShowContextualMenu} />
      {showContextualMenu && (
        <ContextualMenu
          target={stdBtnRef}
          accessibilityLabel="Standard ContextualMenu"
          onDismiss={onDismissContextualMenu}
          setShowMenu={toggleShowContextualMenu}
          onItemClick={props.onItemClick}
        >
          {
            menuItems.map((menuItem) => {
              return <ContextualMenuItem
                        key={menuItem.itemKey}
                        text={menuItem.text}
                        itemKey={menuItem.itemKey}
                        icon={menuItem.icon}
                        disabled={menuItem.disabled}
                      />
            })
          }
        </ContextualMenu>
      )}
    </>
  )
}

export default MenuButton