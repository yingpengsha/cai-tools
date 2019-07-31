<template>
  <div id="console">
    <header>指令控制台</header>
    <workspace />
    <command />
  </div>
</template>

<script>
import Workspace from '@/components/Workspace';
import Command from '@/components/Command';
export default {
  name: 'Console',
  data() {
    return {
      activeNames: ['1', '2'],
    };
  },
  components: {
    Workspace,
    Command,
  },
};
</script>

<style lang="scss" scoped>
#console{
  width: 100%;
  height: 100%;
  header{
    width: 100%;
    height: 39px;
    line-height: 39px;
    text-align: center;
    color: #606266;
    border-bottom: 1px solid #DCDFE6;
    background: #F0F2F5;
    font-size: 14px;
  }
}
</style>

