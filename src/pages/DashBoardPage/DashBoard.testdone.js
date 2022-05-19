import React from 'react';
import renderer from 'react-test-renderer';
import DashBoard from './DashBoard';

describe('React Native Unit Test Dashboard', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<DashBoard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
