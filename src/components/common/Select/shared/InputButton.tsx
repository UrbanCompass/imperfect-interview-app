import styled from '@emotion/styled';

const InputButton = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translate(-30%, -50%);
  svg.cx-icon {
    vertical-align: unset;
  }

  &:hover {
    cursor: pointer;
  }
`;
InputButton.displayName = 'InputButton';

export { InputButton };
