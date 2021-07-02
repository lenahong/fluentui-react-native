import React, {useRef, useState, useCallback} from 'react';
import { Button, ContextualMenu, ContextualMenuItem } from '@fluentui/react-native';
// import { IUseComposeStyling, compose } from '@uifabricshared/foundation-compose';
// import { useSelectedKey } from '@fluentui-react-native/interactive-hooks';
// import { mergeSettings } from '@uifabricshared/foundation-settings';
// import { ISlots } from '@uifabricshared/foundation-composable';
// import { View } from 'react-native';

import {
  // MenuButtonName,
  // MenuButtonName,
  MenuButtonProps,
  // MenuButtonSlotProps,
  // MenuButtonType,
  // MenuButtonRenderData,
  // MenuButtonContext,
  // MenuButtonState,
  // MenuButtonRenderData,
  // MenuButtonContext,
} from './MenuButton.types';

// export const CMContext = React.createContext<MenuButtonContext>({
//   selectedKey: null,
//   onItemClick: (/* key: string */) => {
//     return;
//   },
//   onDismissMenu: () => {
//     return;
//   },
// });

// export const MenuButton1 = compose<MenuButtonType>({
  // displayName: MenuButtonName,
  // usePrepareProps: (userProps: MenuButtonProps, useStyling: IUseComposeStyling<MenuButtonType>) => {
  //   const { menuItems, content = '', onItemClick } = userProps;

  //   // This hook updates the Selected Button and calls the customer's onClick function. This gets called after a button is pressed.
  //   const data = useSelectedKey(null, onItemClick);

  //   // const [containerFocus, setContainerFocus] = React.useState(true);
  //   // const toggleContainerFocus = React.useCallback(() => {
  //   //   setContainerFocus(false);
  //   // }, [setContainerFocus]);

  //   const state: MenuButtonState = {
  //     context: {
  //       selectedKey: data.selectedKey,
  //       onItemClick: data.onKeySelect,
  //       // onDismissMenu: dismissCallback,
  //     },
  //   };

  //   const styleProps = useStyling(userProps, (override: string) => state[override] || userProps[override]);

  //   const slotProps = mergeSettings<MenuButtonSlotProps>(styleProps, {
  //     root: {
  //       content: content,
  //       menuItems: menuItems,
  //       onItemClick: onItemClick
  //     },
  //     button: {
  //       content: content
  //     },
  //     contextualMenu: {
  //       onItemClick: onItemClick
  //     }
  //   });

  //   return { slotProps, state };
  // },
  // settings: settings,
  // slots: {
  //   root: View,
  //   button: Button,
  //   contextualMenu: ContextualMenu
  // },
  // styles: {
  //   root: [backgroundColorTokens, borderTokens],
  //   button: [],
  // },
  // render: (Slots: ISlots<MenuButtonSlotProps>, renderData: MenuButtonRenderData) => {
  //   if (renderData.state == undefined) {
  //     return null;
  //   }
  //   return (
  //     <CMContext.Provider value={renderData.state.context}>
  //       <Slots.root>
  //         <Slots.button></Slots.button>
  //         <Slots.contextualMenu></Slots.contextualMenu>
  //       </Slots.root>
  //     </CMContext.Provider>
  //   );
  // },
// });

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