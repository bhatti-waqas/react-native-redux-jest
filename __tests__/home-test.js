/**
 * Created by waqas.bhatti on 10/04/2018.
 */
import React from 'react';
import Home from '../app/components/home';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
});