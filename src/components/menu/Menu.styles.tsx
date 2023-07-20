import styled from 'styled-components';
import COLORS from '../../constants/colors';

export const Target = styled.div<{ $targeted?: boolean }>`
  outline: ${({ $targeted }) => $targeted && `${COLORS.white} 1px solid`};
`;

export default { Target };
