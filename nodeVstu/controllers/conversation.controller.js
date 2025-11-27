const ConversationService = require("../service/conversation.service");

class ConversationController {
  // 获取所有的数据
  async getData(req, res) {
    const tsStr = req.query;
    const startTs = Number(tsStr.startTs);
    const endTs = Number(tsStr.endTs);

    const result = await ConversationService.getData([startTs, endTs]);
    res.send(result);
  }
}

module.exports = new ConversationController();
