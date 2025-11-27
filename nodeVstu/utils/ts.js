const fs = require("fs");
const path = require("path");

/**
 * 生成 7-12 月的随机 UTC 时间戳（毫秒级）
 * @param {number} [year] - 目标年份（默认当前年份）
 * @returns {number} 随机 UTC 时间戳（13 位数字）
 */
function generateRandomTsInJulToDec(year = new Date().getUTCFullYear()) {
  // 1. 计算 UTC 时间范围：7月1日 00:00:00 ~ 12月31日 23:59:59
  const start = new Date(Date.UTC(year, 6, 1, 0, 0, 0)).getTime(); // 7月是索引 6（UTC 月份 0-11）
  const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59)).getTime(); // 12月是索引 11

  // 2. 在 [start, end] 区间内生成随机整数（时间戳）
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function updateTs() {
  const dir = path.resolve(__dirname, "../config/conversation_test.json");
  const wirdir = path.resolve(
    __dirname,
    "../config/conversation_test_ts_1.json"
  );
  console.log(dir);
  const jsonStr = fs.readFileSync(dir, "utf-8");
  const jsonArr = JSON.parse(jsonStr);
  jsonArr.forEach((ele) => {
    ele.ts = generateRandomTsInJulToDec();
    const { _id, ...eleNoId } = ele;
    ele = eleNoId;
  });
  fs.writeFileSync(wirdir, Buffer.from(JSON.stringify(jsonArr)));
}

updateTs();
