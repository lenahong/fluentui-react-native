import * as React from 'react';
import { MenuButton } from '..';
import * as renderer from 'react-test-renderer';

it('ContextualMenu default props', () => {
  const tree = renderer.create(<MenuButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
