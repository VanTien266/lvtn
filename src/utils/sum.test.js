import Example from './sum';
import {fireEvent, render, waitFor} from '@testing-library/react-native'

describe('examples of some things', () => {
    const {getByTestId, getByText, queryByTestId, toJSON} = render(<Example />)
    const famousProgrammerInHistory = 'Ada Lovelace'
  
    const input = getByTestId('input')
    fireEvent.changeText(input, famousProgrammerInHistory)
  
    const button = getByText('Print Username')
    fireEvent.press(button)
  
    waitFor(() => expect(queryByTestId('printed-username')).toBeTruthy())
  
    it(getByTestId('printed-username').props.children).toBe(
      famousProgrammerInHistory,
    )
    it(toJSON()).toMatchSnapshot()
  })