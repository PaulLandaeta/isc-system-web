const actualDate = new Date();
const numberPeriods = 3;

const setPeriods = () => {
  let firstSemester = actualDate.getMonth() <= 5;
  let currentYear = actualDate.getFullYear();
  const listPeriods = [];

  for (let i = 0; i < numberPeriods; i++) {
    const strPeriod = firstSemester ? 'Primero' : 'Segundo';
    const str = strPeriod + currentYear;
    listPeriods.push({
      id: i + 1,
      value: str,
    });

    if (!firstSemester) currentYear++;
    firstSemester = !firstSemester;
  }

  return listPeriods;
};

export const periods = setPeriods();

export const currentPeriod = periods[0].value;
