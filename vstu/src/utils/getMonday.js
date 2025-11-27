/**
 * @param {Date|string|number} inputDate - 任意日期（Date对象/日期字符串/时间戳）
 * @returns {Date} 本周周一 00:00:00 的Date对象（时区自动匹配输入日期）
 */
export function getMonday(inputDate) {
  // 1. 解析输入为Date对象（兼容多种输入格式）
  const targetDate = new Date(inputDate);
  if (isNaN(targetDate.getTime())) {
    throw new Error(
      "输入的日期格式无效，请传入Date对象、合法日期字符串或时间戳"
    );
  }

  // 2. 计算当前周周一: getDate()指今天是几号
  // getDay会根据今天是周几来给出数字，默认是西方规范，0=周日 1=周一 。。。 现在改为 0=周一 1=周二 。。。 6=周日
  const today = targetDate.getDay() === 0 ? 6 : targetDate.getDay() - 1;
  // console.log("targetDate.getDate() today", targetDate.getDate(), today);
  const currentWeekMonday = new Date();
  currentWeekMonday.setDate(targetDate.getDate() - today);
  // 强制设置时间为 00:00:00.000（确保时分秒归零）
  currentWeekMonday.setHours(0, 0, 0, 0);
  // console.log("currntMonday", currentWeekMonday);
  return currentWeekMonday;
}
