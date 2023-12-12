import styled from "styled-components";
import { flexContainerCenter } from "../../styles/css/flex-container-center";

export const FullScreenContainer = styled.div`
  ${flexContainerCenter}

  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
