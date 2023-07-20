import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../routes/constants';
import COLORS from '../../constants/colors';
import { H1, H2 } from '../../components/typography';
import SketchesGrid, { SketchCard } from '../../components/sketchesGrid';
import loic from '../../assets/photos/loic.webp';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import mouseConfettiPreview from '../../assets/previews/mouse-confetti-preview.png';
import flowFieldPreview from '../../assets/previews/flow-field-preview.png';
import circularMotionPreview from '../../assets/previews/circular-motion-preview.png';
import {
  AboutBottomContent,
  AboutContainer,
  AboutContent,
  AboutTopContent,
  Description,
  Image,
  LinkElement,
} from './Home.styles';

export default function Home() {
  const { t } = useTranslation('home');

  const age = useMemo(() => {
    const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }, []);

  return (
    <div>
      <AboutContainer
        style={{ backgroundColor: COLORS.blue800, color: COLORS.white }}
      >
        <AboutContent>
          <Image width={500} height={500} src={loic} alt="Loïc Rico" />
          <AboutTopContent>
            <H1>
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
      <SketchesGrid>
        <SketchCard to={ROUTES.mouseFollow} imageUrl={mouseFollowPreview}>
          {t('sketches.mouseFollow')}
        </SketchCard>
        <SketchCard to={ROUTES.mouseConfetti} imageUrl={mouseConfettiPreview}>
          {t('sketches.mouseConfetti')}
        </SketchCard>
        <SketchCard to={ROUTES.flowField} imageUrl={flowFieldPreview}>
          {t('sketches.flowField')}
        </SketchCard>
        <SketchCard to={ROUTES.circularMotion} imageUrl={circularMotionPreview}>
          {t('sketches.circularMotion')}
        </SketchCard>
      </SketchesGrid>
    </div>
  );
}
