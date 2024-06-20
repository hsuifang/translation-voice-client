import { Grid, Flex, Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledTypingText = styled(Textarea)`
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-family: monospace;
  font-size: 16px;
  height: 100%;
  border: none;
  resize: none;
  border-radius: 8px;
  padding: 0;
`;

// @ignore
export const StyledShowSelectedText = styled(Flex)`
  align-items: center;
  border-right: 2px dashed #ddd;
  padding-right: 8px;
  margin-right: 8px;
  p,
  label {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    font-family: monospace;
    margin-left: 5px;
  }
  span {
    font-family: monospace;
  }
  @media screen and (max-width: 400px) {
    label {
      display: none;
    }
  }
`;

export const StyledGridWrapper = styled(Grid)`
  position: relative;
  grid-template-rows: 1fr auto;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px 0 16px 16px;
  padding-right: 0;

  @media screen and (max-width: 400px) {
    padding-bottom: 8px;
  }
`;
