import * as React from 'react';
import {
  Divider,
  Container,
  Title,
  TitleContainer,
} from './FeaturesTitle.styles';

export default function FeaturesTitle() {
  return (
    <Container>
      <Divider />
      <TitleContainer>
        <Title>Features</Title>
      </TitleContainer>
    </Container>
  );
}
