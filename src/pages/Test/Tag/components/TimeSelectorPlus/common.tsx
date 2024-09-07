function getDateRange(key: any) {
    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    let startDate, endDate;
    let startOfWeek
    let startOfLastWeek;
    let lastMonth, lastMonthYear
    switch (key) {
      case '今天':
        startDate = endDate = today;
        break;
      case '昨天':
        startDate = yesterday;
        endDate = yesterday;
        break;
      case '本周':
        startOfWeek = new Date(today);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        startDate = startOfWeek;
        endDate = today;
        break;
      case '上周':
        startOfLastWeek = new Date(today);
        startOfLastWeek.setDate(
          startOfLastWeek.getDate() - startOfLastWeek.getDay() - 6
        );
        startDate = startOfLastWeek;
        endDate = new Date(today);
        endDate.setDate(endDate.getDate() - endDate.getDay());
        break;
      case '本月':
        startDate = new Date(today.getFullYear(), today.getMonth(), 2);
        endDate = today;
        break;
      case '上月':
        lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
        lastMonthYear =
          today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
        startDate = new Date(lastMonthYear, lastMonth, 2);
        endDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case '今年':
        startDate = new Date(today.getFullYear(), 0, 2);
        endDate = today;
        break;
      case '去年':
        startDate = new Date(today.getFullYear() - 1, 0, 2);
        endDate = new Date(today.getFullYear() - 1, 11, 32);
        break;
      case '过去7天':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);
        endDate = yesterday;
        break;
      case '过去30天':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 30);
        endDate = yesterday;
        break;
      case '过去90天':
        startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 90);
        endDate = yesterday;
        break;
      default:
        throw new Error(`Unknown date range key: ${key}`);
    }
    return [
      startDate.toISOString().split('T')[0] + ' ' + '00:00:00',
      endDate.toISOString().split('T')[0] + ' ' + '23:59:59'
    ];
  }
  export default { getDateRange };