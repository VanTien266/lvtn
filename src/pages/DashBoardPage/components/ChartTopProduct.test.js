import React from 'react';
import {render} from '@testing-library/react-native'
import {EmptyContent} from './ChartTopProduct';

describe('React Native Unit Test ChartTopProduct', () => {
    test('Test display text of empty data', () => {
        const {queryByText} = render(<EmptyContent />);
        expect(queryByText('Không có dữ liệu để hiển thị')).toBeTruthy();
    });
})



