import { defineStore } from "pinia";
import {
  getMonthConversationData,
  getWeekConversationData,
} from "../../service/conversation/conversation.js";

const useInfoStore = defineStore("info", {
  state: () => ({
    conversationMonthList: [],
    conversationWeekList: [],
    conversationMonthCount: 0, // 数组长度.length即可，多余的维护变量
    conversationWeekCount: 0,
  }),
  actions: {
    // 1.按照月周查
    async getMonthConversationList(timeStampArr) {
      const result = await getMonthConversationData(timeStampArr);
      // console.log("后端返回的数据", result);
      this.conversationMonthList = result.data;
      this.conversationMonthCount = result.total;
    },
    async getWeekConversationData(timeStampArr) {
      const result = await getWeekConversationData(timeStampArr);
      // console.log("后端返回的数据", result);
      this.conversationWeekList = result.data;
      this.conversationWeekCount = result.total;
    },
  },
});

export default useInfoStore;
