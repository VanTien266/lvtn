import { replace } from 'lodash';
// import numeral from 'numeral';

// ----------------------------------------------------------------------

// export function fCurrency(number) {
//   return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
// }

// export function fPercent(number) {
//   return numeral(number / 100).format('0.0%');
// }

export function fNumberCurrency(number) {
  return number.toLocaleString('vi-VN',{
    style:'currency',
    currency: 'VND'
  });
}

export function fNumber(number) {
  return number.toLocaleString('vi-VN');

}

// export function fShortenNumber(number) {
//   return replace(numeral(number).format('0.00a'), '.00', '');
// }

// export function fData(number) {
//   return numeral(number).format('0.0 b');
// }
