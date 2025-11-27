const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 嵌套的消息子 Schema（对应 messages 数组）
const MessageSchema = new Schema({
  _id: { type: String, required: true }, // 消息唯一ID
  role: { type: String, required: true }, // 角色（assistant/user 等）
  content: { type: String, required: true }, // 消息内容
  ts: { type: Number, required: true }, // 时间戳（毫秒）
});

const ConversationType = {
  _id: { type: String, required: true }, // 主文档唯一ID
  user_id: { type: String, required: true }, // 用户UUID
  uuid: { type: String, required: true }, // 唯一标识UUID
  character_uuid: { type: String, required: true }, // 角色UUID
  character_name: { type: String, required: true }, // 角色名称
  character_bio: { type: String, default: "" }, // 角色简介（默认空）
  user_name: { type: String, required: true }, // 用户名
  user_bio: { type: String, default: "" }, // 用户简介（默认空）
  model_id: { type: String, required: true }, // 模型ID
  ts: { type: Number, required: true }, // 时间戳（毫秒）
  description: { type: String, default: "" }, // 角色详细描述
  messages: { type: [MessageSchema], required: true }, // 消息数组（嵌套子Schema）
  createdAt: { type: String, required: true }, // 创建时间（ISO格式）
  updatedAt: { type: String, required: true }, // 更新时间（ISO格式）
  __v: { type: Number, default: 0 }, // MongoDB版本号（默认0）
};

// 连接conversations集合
const ConversationModel = mongoose.model(
  "conversation",
  new Schema(ConversationType)
);

module.exports = ConversationModel;
