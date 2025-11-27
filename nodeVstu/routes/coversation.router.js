const express = require("express");
const router = express.Router();
const ConversationController = require("../controllers/conversation.controller");

// 聊天相关处理函数
router.get("/monthData", ConversationController.getData); // 按照月划分数据
router.get("/weekData", ConversationController.getData); // 按照周划分数据，和月份一样的逻辑思路

module.exports = router;
