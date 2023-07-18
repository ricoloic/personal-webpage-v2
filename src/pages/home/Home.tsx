import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Container from '../../components/container';
import './Home.scss';
import Paper, { PaperHeader } from '../../components/paper';
import COLORS from '../../constants/colors';

export default function Home() {
  const { t } = useTranslation('home');
  return (
    <Container className="home">
      <section className="grid-container padding-1">
        <Paper
          className="grid-col-span-4"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        >
          <PaperHeader title={t('sections.popularCategory.title')} />
        </Paper>
        <Paper backgroundColor={COLORS.blue900} color={COLORS.white}>
          <PaperHeader title={t('sections.totalExpenses.title')} />
        </Paper>
        <Paper backgroundColor={COLORS.blue900} color={COLORS.white}>
          <PaperHeader title={t('sections.frequencyOfTransactions.title')} />
        </Paper>
        <Paper
          className="grid-col-span-4"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        >
          <PaperHeader title={t('sections.popularTransactions.title')} />
        </Paper>
        <Paper
          className="grid-col-span-6"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        >
          <PaperHeader title={t('sections.expensesAndWeeklyAverage.title')} />
        </Paper>
        <Paper
          className="grid-col-span-6"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        >
          <PaperHeader title={t('sections.expensesAndIncome.title')} />
        </Paper>
        <Paper
          className="grid-col-span-8"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        />
        <Paper
          className="grid-col-span-4"
          backgroundColor={COLORS.blue900}
          color={COLORS.white}
        >
          <PaperHeader title={t('sections.recommendations.title')} />
        </Paper>
      </section>
    </Container>
  );
}
