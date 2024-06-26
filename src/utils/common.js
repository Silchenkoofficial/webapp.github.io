export const getStatusColor = (status) => {
  switch (status) {
    case 'run':
      return {
        backgroundColor: '#FEFAEA',
        borderColor: '#FABE24',
      };
    case 'delayed':
      return {
        backgroundColor: '#F8F9FA',
        borderColor: '#9DA6B4',
      };
    case 'performed':
      return {
        backgroundColor: '#EFFCF3',
        borderColor: '#4ADC7F',
      };
    case 'abandonment':
      return {
        backgroundColor: '#FFF5F5',
        borderColor: '#FC8181',
      };
    case 'refusal':
      return {
        backgroundColor: '#FFF5F5',
        borderColor: '#FC8181',
      };
    case 'transfer':
      return {
        backgroundColor: '#FFFFFF',
        borderColor: '#495466',
      };
    default:
      return {
        backgroundColor: '#FEFAEA',
        borderColor: '#FABE24',
      };
  }
};

export const formatPhone = (phone) => {
  if (!phone) return 'Неизвестный';

  let a = phone.split('');
  a.splice(1, 0, ' (');
  a.splice(5, 0, ') ');
  a.splice(9, 0, '-');
  a.splice(12, 0, '-');
  return a.join('');
};
