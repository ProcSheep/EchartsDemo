import { hyRequest } from "..";

// 其实，后端处理月份和周的逻辑一样，根据时间范围find数据
export function getMonthConversationData(timeStampArr) {
  const [startTs, endTs] = timeStampArr;
  return hyRequest.get({
    url: "/conversation/monthData",
    params: {
      startTs,
      endTs,
    },
  });
}

export function getWeekConversationData(timeStampArr) {
  const [startTs, endTs] = timeStampArr;
  return hyRequest.get({
    url: "/conversation/weekData",
    params: {
      startTs,
      endTs,
    },
  });
}
