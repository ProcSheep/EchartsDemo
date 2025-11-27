<template>
  <div class="aside">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="/info"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><location /></el-icon>
              <span>Conversation</span>
            </template>
            <el-menu-item index="/home">home</el-menu-item>
            <el-menu-item index="/info">message</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <span>Navigator Two</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="less" scoped></style>
