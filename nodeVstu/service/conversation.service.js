const ConversationModel = require("../models/conversation.model");

class ConversationService {
  // 根据时间获取数据
  async getData(tsArr) {
    const [startTs, endTs] = tsArr;
    const query = {
      ts: {
        $gte: startTs,
        $lte: endTs,
      },
    };
    // console.log("service", typeof startTs, typeof endTs);
    // console.log(startTs, endTs);
    try {
      const result = await ConversationModel.find(query) // 查询条件
        .select("_id character_name ts") // 保留字段
        .sort({ ts: 1 }) // 排序
        .lean(); // 转为纯 JS 对象（比 Mongoose Document 更轻量，性能更好）

      return {
        success: true,
        data: result,
        total: result.length,
      };
    } catch (error) {
      console.error("查询数据失败：", error.message);
      return {
        success: false,
        message: error.message,
        data: [],
      };
    }
  }
}

module.exports = new ConversationService();
