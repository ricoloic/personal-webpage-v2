import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import loic from '../../assets/photos/loic.webp';
import './Home.scss';
import { H1, H2 } from '../../components/typography';
import ROUTES from '../../routes/constants';
import mouseFollowPreview from '../../assets/previews/mouse-follow-preview.png';
import COLORS from '../../constants/colors';

const age = (() => {
  const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
})();

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <div className="home">
      <div
        className="full-bleed"
        style={{ backgroundColor: COLORS.blue800, color: COLORS.white }}
      >
        <section id="about">
          <div>
            <img
              id="myself"
              className="rounded"
              width={300}
              height={300}
              src={loic}
              alt="Loïc Rico"
            />
          </div>
          <div className="grid-col-span-2">
            <H1>
              <a href="https://github.com/ricoloic">Loïc Rico</a>
            </H1>
            <hr />
            <p>
              Hi, I&apos;m Loïc Rico, a {age} years old canadian web developer.
              This page is a personal website of mine where I can display my
              creations. I&apos;m currently working at{' '}
              <a className="bold underlined" href="https://www.ebay.com/">
                eBay
              </a>{' '}
              as a full-stack developer. I&apos;m passionate about generative
              art and I love to learn new things.
            </p>
          </div>
          <div className="grid-col-span-3">
            <H2>About this page</H2>
            <hr />
            <p>
              This page is a personal website of mine where I can display my
              creations. It was build with{' '}
              <a
                target="_blank"
                className="bold underlined"
                href="https://reactjs.org/"
                rel="noreferrer"
              >
                React
              </a>{' '}
              and{' '}
              <a
                target="_blank"
                className="bold underlined"
                href="https://p5js.org/"
                rel="noreferrer"
              >
                p5js
              </a>
              . The source code is available on the{' '}
              <a
                target="_blank"
                className="bold underlined"
                href="https://github.com/ricoloic/personal-webpage/"
                rel="noreferrer"
              >
                Github Repo
              </a>
              . I&apos;m currently working on this page on my free time. If you
              would like to report a feature or a bug, feel free to leave an
              issue on the project repository. Before I decided to create this
              page, I was always finding my self searching for a particular
              project to show to someone. And more often than not I wasn&apos;t
              even able to start the project since the person I would be showing
              it to, were not setup to run it locally. So I decided to build
              this page to show my creations to people who are interested in my
              work. I hope you enjoy it.
            </p>
          </div>
        </section>
      </div>
      <section id="sketches">
        <Link
          to={ROUTES.mouseFollow}
          className="card"
          style={{
            backgroundImage: `url(${mouseFollowPreview})`,
          }}
        >
          <p>Mouse Follow</p>
        </Link>
      </section>
    </div>
  );
}
