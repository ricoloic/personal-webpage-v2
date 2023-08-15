import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import loic from '../../assets/photos/loic.webp';
import COLORS from '../../constants/colors';
import { H1, H2 } from '../../components/typography';
import {
  AboutBottomContent,
  AboutContainer,
  AboutContent,
  AboutTopContent,
  Description,
  Image,
  LinkElement,
} from './Home.styles';
import MaxWidthContainer from '../../components/maxWidthContainer/MaxWidthContainer';
import SketchesMenu from '../../components/sketchesMenu';
import { useApp } from '../../context/AppContext';

export default function Home() {
  const { theme } = useApp();
  const { t } = useTranslation('home');

  const age = useMemo(() => {
    const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }, []);

  return (
    <div>
      <AboutContainer
        style={{
          backgroundColor: COLORS[theme].black,
          color: COLORS[theme].white,
        }}
      >
        <AboutContent>
          <Image width={500} height={500} src={loic} alt="Loïc Rico" />
          <AboutTopContent>
            <H1 $fontSize="5xl">
              <a href="https://github.com/ricoloic">{t('name')}</a>
            </H1>
            <hr />
            <Description>
              {t('hero.first', { age })}
              <LinkElement href="https://www.ebay.com/">
                {t('hero.company')}
              </LinkElement>
              {t('hero.last')}
            </Description>
          </AboutTopContent>
          <AboutBottomContent>
            <H2>{t('aboutThisPage.title')}</H2>
            <hr />
            <Description>
              {t('aboutThisPage.first')}
              <LinkElement
                target="_blank"
                href="https://reactjs.org/"
                rel="noreferrer"
              >
                {t('aboutThisPage.react')}
              </LinkElement>
              {t('aboutThisPage.and')}
              <LinkElement
                target="_blank"
                href="https://p5js.org/"
                rel="noreferrer"
              >
                {t('aboutThisPage.p5js')}
              </LinkElement>
              {t('aboutThisPage.second')}
              <LinkElement
                target="_blank"
                href="https://github.com/ricoloic/personal-webpage-v2/"
                rel="noreferrer"
              >
                {t('aboutThisPage.githubRepo')}
              </LinkElement>
              {t('aboutThisPage.last')}
            </Description>
          </AboutBottomContent>
        </AboutContent>
      </AboutContainer>
      <MaxWidthContainer>
        <SketchesMenu />
      </MaxWidthContainer>
    </div>
  );
}
