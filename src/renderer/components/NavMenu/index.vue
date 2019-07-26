<template>
  <div id="nav">
    <router-link
      tag="div"
      v-for="item in menuList"
      :key="item.route"
      :to="item.route"
      :class="item.route === $route.path ? 'item focus' : 'item'">
      <i :class="item.icon"/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      menuList: [
        { route: '/terminals', icon: 'el-icon-set-up' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
#nav{
  width: 60px;
  background: #011529;
  padding: 10px 0px;
  font-size: 18px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: flex-start;
  .item{
    width: 100%;
    height: 40px;
    line-height: 42px;
    text-align: center;
    font-size: 24px;
    color: #1890ff;
  }
  .focus{
    background: #1890ff;
    color: white;
  }
  .el-button{
    font-size: 24px;
    margin: 0px;
  }
}
</style>

