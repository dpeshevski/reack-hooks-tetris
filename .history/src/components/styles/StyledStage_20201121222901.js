import styled from 'styled-components';

export const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.header}, calc(25vw / ${props => props.width}));
  grid-template-columns: repeat(${props => props.width}, 1fr);
`