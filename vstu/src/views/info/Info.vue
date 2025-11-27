<template>
  <div class="Info">
    <!-- 1.Top5聊天饼图 -->
    <div class="info1">
      <!-- 筛选区 -->
      <div class="query">
        <div>选择月份范围:</div>
        <el-date-picker
          v-model="monthValue"
          type="monthrange"
          unlink-panels
          range-separator="To"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          :shortcuts="shortcuts"
          @change="handleMonth(monthValue)"
        />
      </div>
      <!-- 图标展示区 -->
      <div class="messageCount">
        <div
          v-show="infoStore.conversationMonthCount > 0"
          class="main_messageCount"
          ref="pieCountRef"
        ></div>
        <div v-show="infoStore.conversationMonthCount === 0">没有数据</div>
      </div>
    </div>
    <!-- 2.堆叠折线图 -->
    <div class="demo-date-picker">
      <div class="container">
        <div class="block">
          <span class="demonstration">Week</span>
          <el-date-picker
            v-model="weekValue"
            type="week"
            format="[Week] ww"
            placeholder="Pick a week"
            @change="handleWeek(weekValue)"
          />
        </div>
        <!-- 图标展示区 -->
        <div class="messageCount">
          <div
            v-show="infoStore.conversationWeekCount > 0"
            class="main_messageCount"
            ref="lineCountRef"
          ></div>
          <div v-show="infoStore.conversationWeekCount === 0">没有数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import echarts from "@/assets/config/echarts";
import useInfoStore from "@/store/modules/info";
import { formatToUTCStamp } from "@/utils/formatUTCStamp";
import { formatConversationPieCharts } from "@/utils/conversations/topPieChart";
import { formatConversationLineCharts } from "@/utils/conversations/topLineChart";
import { getMonday } from "@/utils/getMonday";

/** 1.Pie-Top5 */
const pieCountRef = ref(null); // 承载echarts的dom元素div -- pieCountRef
let pieCountChart = null; // 聊天角色并图的echarts实例
const infoStore = useInfoStore();
const now = new Date();
const nowStamp = now.getTime(); // stamp
const lastMonthStamp = new Date(now).setMonth(now.getMonth() - 1); // stamp
const monthValue = ref([lastMonthStamp, now]); // 初始化默认过去一个月 [Date,Date]
const shortcuts = [
  {
    text: "过去1个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 1);
      return [start, end];
    },
  },
  {
    text: "过去3个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      return [start, end];
    },
  },
  {
    text: "过去6个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    },
  },
  {
    text: "本年",
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    },
  },
];

/** 2.Line */
const lineCountRef = ref(null); // 承载echarts的dom元素div -- lineCountRef
let lineCountChart = null; // echarts实例
const weekValue = ref(""); // 当前所在周周一的时间

// 如异步函数，则并行
onMounted(() => {
  initPieData().catch((err) => console.error("initPieData", err));
  initLineData().catch((err) => console.error("initLineData", err));
});

/**
 * 初始化echarts
 */
const initPieData = async () => {
  // 调用网络请求(首次请求”过去一个月“)
  await infoStore.getMonthConversationList([lastMonthStamp, nowStamp]);
  // 整理出切合框架的数据
  const option = formatConversationPieCharts(infoStore.conversationMonthList);
  pieCountChart = echarts.init(pieCountRef.value); // 初始化echarts图标实例
  option && pieCountChart.setOption(option);
};

const initLineData = async () => {
  // 获取当前所在周周一的时间
  weekValue.value = getMonday(now);
  // 7天后的时间
  const weekLateValue = new Date(
    weekValue.value.getTime() + 7 * 24 * 60 * 60 * 1000
  );
  // console.log("weekLateValue", weekLateValue);
  // console.log("week", weekValue.value, weekLateValue);
  const timestampArr = formatToUTCStamp([weekValue.value, weekLateValue]);
  // console.log("Date->stamp", timestampArr);
  await infoStore.getWeekConversationData(timestampArr);
  // 获取有效的option
  const option = formatConversationLineCharts(
    weekValue.value,
    infoStore.conversationWeekList
  );
  // console.log("line-option", option);
  lineCountChart = echarts.init(lineCountRef.value);
  option && lineCountChart.setOption(option);
};

/**
 * 修改echarts
 */

// 修改月份触发 --- change
const handleMonth = async (newMonth) => {
  // console.log("changeMonth", newMonth);
  if (newMonth) {
    const timestampArr = formatToUTCStamp(newMonth);
    try {
      await infoStore.getMonthConversationList(timestampArr);
    } catch (error) {
      console.log("error", error);
    }
  }
  // 确保 pieCountChart 已初始化
  if (infoStore.conversationMonthList.length > 0) {
    const newOption = formatConversationPieCharts(
      infoStore.conversationMonthList
    );
    newOption && pieCountChart.setOption(newOption);
  }
};

// 修改周时触发 --- change
const handleWeek = async (monday) => {
  // console.log("changeWeek(周一)", monday);
  // 7天后的时间
  const weekLateValue = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
  // console.log("week", monday, weekLateValue);
  const timestampArr = formatToUTCStamp([monday, weekLateValue]);
  // console.log("timestampArr", timestampArr);
  // console.log(
  //   "timestamp -> Date",
  //   new Date(timestampArr[0]),
  //   new Date(timestampArr[1])
  // );
  await infoStore.getWeekConversationData(timestampArr);
  const option = formatConversationLineCharts(
    monday,
    infoStore.conversationWeekList
  );
  option && lineCountChart.setOption(option);
};

// 组件卸载时销毁 ECharts 实例
onUnmounted(() => {
  if (pieCountChart.value) {
    pieCountChart.value.dispose();
  }
});
</script>

<style lang="less" scoped>
.Info {
  display: flex;
}
.messageCount {
  .main_messageCount {
    width: 500px;
    height: 500px;
  }
}
</style>
