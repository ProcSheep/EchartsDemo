/**
 * 处理周一到周五的
 */

function classfyDate(monts, character) {
  // console.log("monts chara", monts, character);
  // 计数器，数组依次为周一到周日
  const data = [0, 0, 0, 0, 0, 0, 0];
  const onedayTs = 1000 * 60 * 60 * 24; // 一天的毫秒数
  // 这里的毫秒数都是UTC+0的，所以记得转化成中国时区去计算
  const tsArr = character.tsArr.map((ts) => ts + 1000 * 60 * 60 * 8);
  // 对数组中每一项ts分类
  tsArr.forEach((ts) => {
    const diffTs = ts - monts;
    // 跳过：时间戳在目标周之前（diffTs < 0）或目标周之后（diffTs >= 7天）
    if (diffTs < 0 || diffTs >= 7 * onedayTs) {
      console.warn(`时间戳 ${ts} 不在目标周内，已忽略, ${new Date(ts)}`);
      return;
    }
    const weekdayCount = Math.floor(diffTs / onedayTs); // 向下取整，例如结果2.4，2天余0.4天，今天第三天，周三，数组序列为2
    data[weekdayCount]++;
  });

  // console.log("character Date", character.character_name, data);

  let result = {
    name: character.character_name,
    type: "line",
    stack: "Total",
    areaStyle: {},
    emphasis: {
      focus: "series",
    },
    data: data, // 这周每一天的数据（个数）
  };

  return result;
}

/**
 * @param {Date} mondayStamp 本周星期一时间
 * @param {Array} characterData 数组，这周所有数据的数组
 * @returns 返回option数据格式，主要是lineData
 */
export function formatConversationLineCharts(mondayDate, characterData) {
  // 复用topPieChart的逻辑,这次存储ts数组
  const characterClassify = {};
  characterData.forEach((character) => {
    let characterName = character.character_name;
    let characterTs = character.ts;
    if (!characterClassify[characterName]) {
      characterClassify[characterName] = [];
    }
    characterClassify[characterName].push(characterTs);
  });

  // console.log("classfy", characterClassify);

  const sortList = Object.entries(characterClassify)
    .map(([character_name, tsArr]) => ({ character_name, tsArr }))
    .sort((a, b) => {
      if (a.tsArr.length !== b.tsArr.length) {
        return b.tsArr.length - a.tsArr.length; // 数量降序
      } else {
        // 当count数量相等时，用charactName按照字符串排序
        return a.character_name.localeCompare(b.character_name); // 次之，名字排序
      }
    })
    .slice(0, 5);
  // console.log("sortList", sortList);

  // 根据日期查数据，从前五名中一点点排序
  const monStamp = mondayDate.getTime();
  const series = [];
  sortList.forEach((character) => {
    const data = classfyDate(monStamp, character);
    series.push(data);
  });

  const option = {
    title: {
      text: "周聊天角色Top5",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: sortList.map((item) => item.character_name),
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series,
  };

  return option;
}
