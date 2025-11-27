const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // 需要安装uuid库：npm install uuid

/**
 * 生成指定时间范围的随机UTC时间戳（毫秒级）
 * @param {number} startMonth - 开始月份（0-11）
 * @param {number} endMonth - 结束月份（0-11）
 * @param {number} [year] - 目标年份（默认当前年份）
 * @returns {number} 随机UTC时间戳
 */
function generateRandomTsInRange(
  startMonth,
  endMonth,
  year = new Date().getUTCFullYear()
) {
  const start = new Date(Date.UTC(year, startMonth, 1, 0, 0, 0)).getTime();
  const end = new Date(Date.UTC(year, endMonth, 31, 23, 59, 59)).getTime();
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function generateFakeData() {
  const sourcePath = path.resolve(
    __dirname,
    "../config/conversation_test.json"
  );
  const targetPath = path.resolve(
    __dirname,
    "../config/fake_conversations_4.json"
  );

  // 读取源数据
  const sourceStr = fs.readFileSync(sourcePath, "utf-8");
  const sourceArr = JSON.parse(sourceStr);

  // 生成100条假数据
  const fakeData = [];
  for (let i = 0; i < 100; i++) {
    // 随机选择源数据中的一条作为模板
    const template = sourceArr[Math.floor(Math.random() * sourceArr.length)];

    // 复制数据并移除原有_id，生成新的唯一id（或直接删除_id）
    const { _id, ...dataWithoutId } = template;

    // 生成新的时间戳（这里示例生成1-6月的时间戳，可根据需要修改范围）
    const newTs = generateRandomTsInRange(10, 11); // 例如：1-6月（0是1月，5是6月）

    // 添加新数据（如果需要_id可添加uuid）
    fakeData.push({
      ...dataWithoutId,
      ts: newTs,
      // 如需生成新id可取消注释下面一行
      // _id: uuidv4() // 使用uuid确保唯一性
    });
  }

  // 写入目标文件
  fs.writeFileSync(targetPath, JSON.stringify(fakeData, null, 2));
  console.log(`已生成100条假数据到 ${targetPath}`);
}

generateFakeData();
