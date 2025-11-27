// 转化月份到时间戳
/**
 * @param {*} DateArr 中国时区 GMT+8 [start,end] Date
 * @returns 时间戳 官方时间 UTC+0 [startTimeStamp, endTimeStamp]
 */
export function formatToUTCStamp(DateArr) {
  // 校验入参：确保是数组且包含两个Date对象
  if (
    !Array.isArray(DateArr) ||
    DateArr.length !== 2 ||
    !(DateArr[0] instanceof Date) ||
    !(DateArr[1] instanceof Date)
  ) {
    console.warn("入参格式错误，需传入 [Date, Date] 类型的中国时区时间数组");
    return [0, 0]; // 异常返回默认值，避免程序崩溃
  }

  const [startDate, endDate] = DateArr;

  // 关键：中国时区（GMT+8）转 UTC+0，需减去 8 小时的毫秒数（8*60*60*1000 = 28800000）
  const UTC_OFFSET = 8 * 60 * 60 * 1000;

  // 计算 UTC 时间戳（中国时间 - 8小时 = UTC时间）
  const startTimeStamp = startDate.getTime() - UTC_OFFSET;
  const endTimeStamp = endDate.getTime() - UTC_OFFSET;

  // 确保时间戳为有效数字（避免Invalid Date导致的NaN）
  const validStart = isNaN(startTimeStamp) ? 0 : startTimeStamp;
  const validEnd = isNaN(endTimeStamp) ? 0 : endTimeStamp;

  return [validStart, validEnd];
}
