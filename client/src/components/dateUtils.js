import { format, differenceInDays, startOfToday, startOfYesterday, startOfWeek, startOfMonth, startOfYear } from 'date-fns';

export const categorizeFolders = (folders) => {
  const today = startOfToday();
  const yesterday = startOfYesterday();
  const thisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const thisMonth = startOfMonth(today);
  const thisYear = startOfYear(today);

  const categories = {
    today: [],
    yesterday: [],
    thisWeek: [],
    thisMonth: [],
    thisYear: [],
    never: [],
  };

  folders.forEach(folder => {
    const createdAt = new Date(folder.created_at);


    if (differenceInDays(today, createdAt) === 0) {
        console.log('Category: Today');
      categories.today.push(folder);
    } else if (differenceInDays(today, createdAt) === 1) {
      categories.yesterday.push(folder);
    } else if (createdAt >= thisWeek) {
      categories.thisWeek.push(folder);
    } else if (createdAt >= thisMonth) {
      categories.thisMonth.push(folder);
    } else if (createdAt >= thisYear) {
      categories.thisYear.push(folder);
    } else {
      categories.never.push(folder);
    }
  });

  return categories;
};
