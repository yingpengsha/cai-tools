<template>
  <div
    v-loading="true"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  />
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
div{
  height: 100%;
  width: 100%;
}
</style>


