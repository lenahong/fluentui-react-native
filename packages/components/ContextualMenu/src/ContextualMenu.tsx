import { contextualMenuName, IContextualMenuProps, IContextualMenuSlotProps, IContextualMenuType } from './ContextualMenu.types';
import { settings } from './ContextualMenu.settings';
import { IUseComposeStyling, compose } from '@uifabricshared/foundation-compose';
import { useViewCommandFocus } from '@fluentui-react-native/interactive-hooks';
import { mergeSettings } from '@uifabricshared/foundation-settings';
import { backgroundColorTokens, borderTokens } from '@fluentui-react-native/tokens';
import { Callout } from '@fluentui-react-native/callout';

export const ContextualMenu = compose<IContextualMenuType>({
  displayName: contextualMenuName,
  usePrepareProps: (props: IContextualMenuProps, useStyling: IUseComposeStyling<IContextualMenuType>) => {
    const { componentRef, ...rest } = props;
    const cmRef = useViewCommandFocus(componentRef);

    const slotProps = mergeSettings<IContextualMenuSlotProps>(useStyling(props), {
      root: {
        ref: cmRef,
        ...rest
      }
    });

    return { slotProps };
  },
  settings: settings,
  slots: {
    root: Callout
  },
  styles: {
    root: [backgroundColorTokens, borderTokens]
  }
});

export default ContextualMenu;