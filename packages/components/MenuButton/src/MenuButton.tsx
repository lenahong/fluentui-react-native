/** @jsx withSlots */
// import React, {useRef, useState, useCallback} from 'react';
import * as React from 'react';
import { Button } from '@fluentui/react-native';
// import { Button, ContextualMenu, ContextualMenuItem, SubmenuItem, Submenu } from '@fluentui/react-native';
import { IUseComposeStyling, compose } from '@uifabricshared/foundation-compose';
// import { compose } from '@uifabricshared/foundation-compose';
// import { useSelectedKey } from '@fluentui-react-native/interactive-hooks';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { ISlots, withSlots } from '@uifabricshared/foundation-composable';
import { View } from 'react-native';

import {
  MenuButtonName,
  MenuButtonProps,
  MenuButtonSlotProps,
  MenuButtonType,
  MenuButtonRenderData,
  // MenuButtonContext,
  MenuButtonState,
  // MenuButtonRenderData,
} from './MenuButton.types';

export const MenuButton = compose<MenuButtonType>({
  displayName: MenuButtonName,
  usePrepareProps: (userProps: MenuButtonProps, useStyling: IUseComposeStyling<MenuButtonType>) => {
    const { menuItems, content, icon, disabled, onItemClick } = userProps;

  //   const data = useSelectedKey(null, onItemClick);

  //   // const [containerFocus, setContainerFocus] = React.useState(true);
  //   // const toggleContainerFocus = React.useCallback(() => {
  //   //   setContainerFocus(false);
  //   // }, [setContainerFocus]);

    const state: MenuButtonState = {
      context: {
        selectedKey: '1'//data.selectedKey,
  //       onItemClick: data.onKeySelect,
  //       // onDismissMenu: dismissCallback,
      },
    };

    const styleProps = useStyling(userProps, (override: string) => state[override] || userProps[override]);

    const slotProps = mergeSettings<MenuButtonSlotProps>(styleProps, {
      root: {
        content,
        menuItems,
        onItemClick,
        icon,
        disabled
      },
      button: {
        content,
        disabled,
        icon
      },
      contextualMenu: {
  //       onItemClick
      }
    });

    return { slotProps, state };
  },
  // settings: settings,
  slots: {
    root: View,
    button: { slotType: Button as React.ComponentType<object> },
  //   contextualMenu: ContextualMenu
  },
  styles: {
  //   root: [backgroundColorTokens, borderTokens],
  //   button: [],
  },
  render: (Slots: ISlots<MenuButtonSlotProps>, renderData: MenuButtonRenderData, ...children: React.ReactNode[]) => {
    if (renderData.state == undefined) {
      return null;
    }
    return (
      <Slots.root>
        {children}
        <Slots.button></Slots.button>
        {/* <Slots.contextualMenu></Slots.contextualMenu> */}
      </Slots.root>
    );
  },
});

// export const MenuButton1 = (props: MenuButtonProps) => {
//   const stdBtnRef = useRef(null);
//   const stdMenuItemRef = React.useRef(null);

//   const content = props.content || ''
//   const menuItems = props.menuItems || []
//   const icon = props.icon || ''

//   const [showContextualMenu, setShowContextualMenu] = useState(false);
//   // const [focusOnMount, setShouldFocusOnMount] = React.useState(true);
//   // const toggleFocusOnMount = React.useCallback((value) => setShouldFocusOnMount(value), [setShouldFocusOnMount]);
//   // const [focusOnContainer, setShouldFocusOnContainer] = React.useState(false);
//   // const toggleFocusOnContainer = React.useCallback((value) => setShouldFocusOnContainer(value), [setShouldFocusOnContainer]);

//   const toggleShowContextualMenu = useCallback(() => {
//     setShowContextualMenu(!showContextualMenu);
//   }, [showContextualMenu, setShowContextualMenu]);

//   // const onShowContextualMenu = React.useCallback(() => {
//   //   setIsContextualMenuVisible(true);
//   // }, [setIsContextualMenuVisible]);

//   const onDismissContextualMenu = React.useCallback(() => {
//     setShowContextualMenu(false);
//     // setIsContextualMenuVisible(false);
//   }, [setShowContextualMenu]);

//   function renderContextualMenuItem(menuItem) {
//     return <ContextualMenuItem
//       key={menuItem.itemKey}
//       text={menuItem.text}
//       itemKey={menuItem.itemKey}
//       icon={menuItem.icon}
//       disabled={menuItem.disabled}
//     />
//   }

//   const [showSubmenu, setShowSubmenu] = React.useState(false);
//   const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);

//   const toggleShowSubmenu = React.useCallback(() => {
//     setShowSubmenu(!showSubmenu);
//     setIsSubmenuVisible(!isSubmenuVisible);
//   }, [showSubmenu, isSubmenuVisible, setShowSubmenu, setIsSubmenuVisible]);

//   const onShowSubmenu = React.useCallback(() => {
//     setIsSubmenuVisible(true);
//   }, [setIsSubmenuVisible]);

//   const onDismissSubmenu = React.useCallback(() => {
//     setShowSubmenu(false);
//   }, [setShowSubmenu]);

//   return (
//     <>
//       <Button content={content}  componentRef={stdBtnRef} onClick={toggleShowContextualMenu} disabled={props.disabled} icon={icon}/>
//       {showContextualMenu && (
//         <ContextualMenu
//           target={stdBtnRef}
//           accessibilityLabel="Standard ContextualMenu"
//           onDismiss={onDismissContextualMenu}
//           setShowMenu={toggleShowContextualMenu}
//           onItemClick={props.onItemClick}
//         >
//           {
//             menuItems.map(menuItem => {
//               return menuItem.submenu?
//               <>
//                 <SubmenuItem {...menuItem} onHoverIn={toggleShowSubmenu} componentRef={stdMenuItemRef} />
//                 {showSubmenu && (
//                   <Submenu target={stdMenuItemRef} onDismiss={onDismissSubmenu} onShow={onShowSubmenu} setShowMenu={toggleShowSubmenu}>
//                     {menuItem.submenuItems && menuItem.submenuItems.map && menuItem.submenuItems.map(submenuItem => renderContextualMenuItem(submenuItem))}
//                   </Submenu>
//                 )}
//               </>
//               : renderContextualMenuItem(menuItem)
//             })
//           }
//         </ContextualMenu>
//       )}
//     </>
//   )
// }

export default MenuButton