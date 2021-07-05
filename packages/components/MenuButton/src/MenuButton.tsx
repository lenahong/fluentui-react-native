/** @jsx withSlots */
/** @jsxFrag React.createFragment */
import React, {useRef, useState, useCallback} from 'react';
//SubmenuItem , Submenu
import { Button, ContextualMenu, ContextualMenuItem } from '@fluentui/react-native';
import { IUseComposeStyling, compose } from '@uifabricshared/foundation-compose';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { ISlots, withSlots } from '@uifabricshared/foundation-composable';
import { View } from 'react-native';

import {
  MenuButtonName,
  MenuButtonProps,
  MenuButtonSlotProps,
  MenuButtonType,
  MenuButtonRenderData,
  MenuButtonItemProps,
  MenuButtonState,
  // MenuButtonRenderData,
} from './MenuButton.types';

export const MenuButton = compose<MenuButtonType>({
  displayName: MenuButtonName,
  usePrepareProps: (userProps: MenuButtonProps, useStyling: IUseComposeStyling<MenuButtonType>) => {
    const { menuItems, content, icon, disabled, onItemClick } = userProps;

    const stdBtnRef = useRef(null);
    const [showContextualMenu, setShowContextualMenu] = useState(false);
    // const [showSubmenu, setShowSubmenu] = useState(false);
    // const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
    // const [focusOnMount, setShouldFocusOnMount] = React.useState(true);
    // const toggleFocusOnMount = React.useCallback((value) => setShouldFocusOnMount(value), [setShouldFocusOnMount]);
    // const [focusOnContainer, setShouldFocusOnContainer] = React.useState(false);
    // const toggleFocusOnContainer = React.useCallback((value) => setShouldFocusOnContainer(value), [setShouldFocusOnContainer]);
    // const data = useSelectedKey(null, onItemClick);

    const onDismiss = useCallback(() => {
      setShowContextualMenu(false);
    }, [setShowContextualMenu]);

  //   const onShowSubmenu = useCallback(() => {
  //   setIsSubmenuVisible(true);
  // }, [setIsSubmenuVisible]);

  // const onDismissSubmenu = useCallback(() => {
  //   setShowSubmenu(false);
  // }, [setShowSubmenu]);

  //   const toggleShowSubmenu = React.useCallback(() => {
  //   setShowSubmenu(!showSubmenu);
  //   setIsSubmenuVisible(!isSubmenuVisible);
  // }, [showSubmenu, isSubmenuVisible, setShowSubmenu, setIsSubmenuVisible]);

  //   // const [containerFocus, setContainerFocus] = React.useState(true);
  //   // const toggleContainerFocus = React.useCallback(() => {
  //   //   setContainerFocus(false);
  //   // }, [setContainerFocus]);

  const toggleShowContextualMenu = useCallback(() => {
        setShowContextualMenu(!showContextualMenu);
      }, [showContextualMenu, setShowContextualMenu]);

    const state: MenuButtonState = {
      context: {
        showContextualMenu: !!showContextualMenu,
        // selectedKey: data.selectedKey,
        // onItemClick: data.onKeySelect,
        // onDismissMenu: onDismiss,
        // isSubmenuOpen: isSubmenuVisible,
        // dismissSubmenu: onDismissSubmenu
      },
    };

    const styleProps = useStyling(userProps, (override: string) => state[override] || userProps[override]);

    const slotProps = mergeSettings<MenuButtonSlotProps>(styleProps, {
      root: {},
      button: {
        content,
        disabled,
        icon,
        componentRef: stdBtnRef,
        onClick: toggleShowContextualMenu
      },
      contextualMenu: {
        onItemClick,
        target: stdBtnRef,
        accessibilityLabel: 'MenuButton',
        onDismiss,
        setShowMenu: toggleShowContextualMenu
      },
      contextualMenuItems: {
        menuItems
      },
      ContextualMenuItem
    });

    return { slotProps, state };
  },
  slots: {
    root: React.Fragment,
    button: { slotType: Button as React.ComponentType<object> },
    contextualMenu: { slotType: ContextualMenu as React.ComponentType<object> },
    contextualMenuItems: View
  },
  styles: {},
  render: (Slots: ISlots<MenuButtonSlotProps>, renderData: MenuButtonRenderData) => {
    if (!(renderData.state && renderData.slotProps)) {
      return null;
    }
    const context = renderData.state!.context;
    const menuItems = renderData.slotProps!.contextualMenuItems && renderData.slotProps.contextualMenuItems.menuItems || [];
    function renderContextualMenuItem(menuItem: MenuButtonItemProps) {
      return <ContextualMenuItem {...menuItem} />
    }

    return (
      <Slots.root>
        <Slots.button />
        {
          context.showContextualMenu && (
            <Slots.contextualMenu>
              {menuItems.map(menuItem => {
                // const stdMenuItemRef = React.useRef(null);
                return menuItem.submenu?
                <Slots.contextualMenuItems>
                  {renderContextualMenuItem(menuItem)}
                  {/* <SubmenuItem {...menuItem} componentRef={stdMenuItemRef} /> */}
                  {/* {showSubmenu && (
                    <Submenu target={stdMenuItemRef} onDismiss={onDismissSubmenu} onShow={onShowSubmenu} setShowMenu={toggleShowSubmenu}>
                      {menuItem.submenuItems && menuItem.submenuItems.map && menuItem.submenuItems.map(submenuItem => renderContextualMenuItem(submenuItem))}
                    </Submenu>
                  )} */}
                </Slots.contextualMenuItems>
                 : renderContextualMenuItem(menuItem)
              })}
            </Slots.contextualMenu>
          )
        }
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
  // const [focusOnMount, setShouldFocusOnMount] = React.useState(true);
  // const toggleFocusOnMount = React.useCallback((value) => setShouldFocusOnMount(value), [setShouldFocusOnMount]);
  // const [focusOnContainer, setShouldFocusOnContainer] = React.useState(false);
  // const toggleFocusOnContainer = React.useCallback((value) => setShouldFocusOnContainer(value), [setShouldFocusOnContainer]);

//   const toggleShowContextualMenu = useCallback(() => {
//     setShowContextualMenu(!showContextualMenu);
//   }, [showContextualMenu, setShowContextualMenu]);

  // const onShowContextualMenu = React.useCallback(() => {
  //   setIsContextualMenuVisible(true);
  // }, [setIsContextualMenuVisible]);

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