import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Feature from '../../components/feature';
import FeaturesTitle from '../../components/featuresTitle';
import logo from '../../assets/logo.svg';
import {
  Container,
  FeaturesContainer,
  SectionContainer,
  Title,
  Features,
} from './Home.styles';

export default function Home() {
  const { t } = useTranslation('general');
  return (
    <Container>
      <SectionContainer>
        <img src={logo} alt="logo" />
      </SectionContainer>
      <SectionContainer>
        <Title>{t('title')}</Title>
      </SectionContainer>
      <SectionContainer>
        <FeaturesContainer>
          <FeaturesTitle />
          <Features>
            <Feature
              title="ViteJs"
              url="https://vitejs.dev/"
              description="Module bundler"
            />
            <Feature
              title="Styled components"
              url="https://styled-components.com/"
            />
            <Feature
              title="i18next"
              url="http://i18next.com"
              description="Internationalization-framework"
            />
            <Feature
              title="Husky git hooks"
              url="https://typicode.github.io/husky/#/"
              description="Husky improves your commits"
            />
            <Feature
              title="Lint staged"
              url="https://github.com/okonet/lint-staged"
              description="Run linters against staged git files"
            />
            <Feature
              title="Conventional commit"
              url="https://github.com/compilerla/conventional-pre-commit"
              description="A pre-commit hook to check commit messages for Conventional Commits formatting."
            />
            <Feature title="Typescript" url="https://www.typescriptlang.org/" />
            <Feature
              title="React router"
              url="https://reactrouter.com/en/main"
            />
            <Feature
              title="Testing Library"
              url="https://testing-library.com/"
            />
          </Features>
        </FeaturesContainer>
      </SectionContainer>
    </Container>
  );
}
