import test from 'node:test';
import assert from 'node:assert/strict';
import {
  STUDENT_PROFILE,
  MOSGRU_COST_STRUCTURE,
  MOSGRU_TOTAL_BUDGET,
  NUTRIVITA_SURVEY_PREFERENCES,
  searchPortfolioContent,
  filterProjectsByCategory,
  calculateScaledMosgruBudget,
} from './portfolioData';

test('student profile matches exact user credentials and PDF details', () => {
  assert.equal(STUDENT_PROFILE.name, 'Humaidah');
  assert.equal(STUDENT_PROFILE.faculty, 'Fakultas Farmasi');
  assert.equal(STUDENT_PROFILE.major, 'Farmasi');
  assert.equal(STUDENT_PROFILE.npm, '2506540550');
  assert.equal(STUDENT_PROFILE.phone, '08568034305');
  assert.equal(STUDENT_PROFILE.uiEmail, 'humaidah@ui.ac.id');
  assert.equal(STUDENT_PROFILE.personalEmail, 'umai.humaidah@gmail.com');
  assert.equal(STUDENT_PROFILE.instagram, 'umai.hmdh');
});

test('MOSGRU cost structure sums to exact Rp 24.000.000 from PDF page 5', () => {
  const sum = MOSGRU_COST_STRUCTURE.reduce((acc, item) => acc + item.amount, 0);
  assert.equal(sum, MOSGRU_TOTAL_BUDGET);
  assert.equal(sum, 24000000);
});

test('NutriVita market research top preference is 80% Permainan Edukatif', () => {
  const top = NUTRIVITA_SURVEY_PREFERENCES[0];
  assert.equal(top.percentage, 80.0);
  assert.equal(top.responses, 24);
  assert.equal(top.totalRespondents, 30);
});

test('searchPortfolioContent finds projects, skills, resume, and financial data accurately', () => {
  const mosgruResults = searchPortfolioContent('Oryza nivara');
  assert.ok(mosgruResults.some((r) => r.type === 'Project' && r.title.includes('MOSGRU')));

  const imageJResults = searchPortfolioContent('ImageJ');
  assert.ok(imageJResults.some((r) => r.type === 'Skill' && r.title.includes('ImageJ')));

  const almatuqResults = searchPortfolioContent("Al-Ma'tuq");
  assert.ok(almatuqResults.some((r) => r.type === 'Resume'));
});

test('filterProjectsByCategory filters accurately by category and search query', () => {
  const all = filterProjectsByCategory('ALL');
  assert.equal(all.length, 3);

  const qc = filterProjectsByCategory('QUALITY CONTROL');
  assert.equal(qc.length, 1);
  assert.equal(qc[0].id, 'proj-smilecheck');

  const queryFilter = filterProjectsByCategory('ALL', 'Martha Tilaar');
  assert.equal(queryFilter.length, 1);
  assert.equal(queryFilter[0].id, 'proj-mosgru');
});

test('calculateScaledMosgruBudget scales variable prototype/testing costs while preserving R&D base', () => {
  const base = calculateScaledMosgruBudget(1);
  assert.equal(base.total, 24000000);

  const doubleBatch = calculateScaledMosgruBudget(2);
  // Fixed: 7M + 7M = 14M; Variable: (4M + 3M + 2M + 1M) * 2 = 20M => Total = 34M
  assert.equal(doubleBatch.total, 34000000);
});
