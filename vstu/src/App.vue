<template>
  <div class="App">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "@/components/aside/aside.vue";
import Header from "@/components/header/header.vue";
</script>

<style lang="less" scoped></style>
