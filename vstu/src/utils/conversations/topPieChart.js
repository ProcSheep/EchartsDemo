// 按月份整理conversation数据，Top5，饼状图第一个实例
/**
 *
 * @param {*} characterData 数组，这个月所有数据的数组
 * @returns 返回option数据格式，主要是pieData
 */
function formatConversationPieCharts(characterData) {
  // console.log("characterData", characterData);
  const characterClassify = {};
  characterData.forEach((characterItem) => {
    let characterName = characterItem.character_name;
    characterClassify[characterName] =
      (characterClassify[characterName] || 0) + 1;
  });

  const sortList = Object.entries(characterClassify)
    .map(([characterName, count]) => ({ characterName, count }))
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count; // 数量降序
      } else {
        // 当count数量相等时，用charactName按照字符串排序
        return a.characterName.localeCompare(b.characterName); // 名字生序
      }
    });

  const topSortList = sortList.slice(0, 5);
  // console.log("分类数据", characterClassify);
  // console.log("Top5分类数据", topSortList);
  // 调整为echart需要的框架类型样式
  const pieData = topSortList.map((item) => ({
    name: item.characterName,
    value: item.count,
  }));

  let option = {
    title: {
      text: "聊天角色Top5",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "数据",
        type: "pie",
        radius: "50%",
        data: pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return option;
}

export { formatConversationPieCharts };
