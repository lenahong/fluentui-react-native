import { ContextualMenuItemProps, ContextualMenuProps } from '@fluentui-react-native/contextual-menu';
import { IButtonProps } from '@fluentui-react-native/button';
import { IRenderData } from '@uifabricshared/foundation-composable';
import { IconProps } from '@fluentui-react-native/icon';

export const MenuButtonName = 'MenuButton';

export interface MenuButtonContext {
  /*
   ** The currently selected MenuButton's key
   */
  selectedKey: string | null;

  /*
   ** Updates the clicked menu item and calls the client’s onItemClick callback
   */
  onItemClick?: (key: string) => void;
  /*
   ** Parent menu's onDismiss callback that is passed into submenu to call when submenu item is clicked
   */
  onDismissMenu?: () => void;
  /*
   ** Checks if any child menus are open
   */
  isSubmenuOpen?: boolean;
  /*
   ** MenuButtonItems will call this submenu dismissal when they are hovered
   */
  dismissSubmenu?: () => void;
}

export interface MenuButtonState {
  context: MenuButtonContext;
}

export interface MenuButtonItemProps extends ContextualMenuItemProps {
  submenu?: boolean;
  submenuItems?: ContextualMenuItemProps[];
}

export interface MenuButtonProps {
  menuItems?: MenuButtonItemProps[];
  content?: string;
  onItemClick?: (key: string) => void;
  disabled?: boolean;
  icon?: number | string | IconProps;
}

export type MenuButtonSlotProps = {
  root: React.PropsWithChildren<MenuButtonProps>;
  button: IButtonProps;
  contextualMenu: ContextualMenuProps;
};

export type MenuButtonRenderData = IRenderData<MenuButtonSlotProps, MenuButtonState>;

export interface MenuButtonType {
  props: MenuButtonProps;
  slotProps: MenuButtonSlotProps;
  state: MenuButtonState;
}
