import styled from 'styled-components';

export const Target = styled.div<{ $targeted?: boolean }>`
  outline: ${({ $targeted, theme }) => $targeted && `${theme.white} 1px solid`};
`;

export default { Target };
