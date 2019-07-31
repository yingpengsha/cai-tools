<template>
  <div id="app">
		<nav-menu></nav-menu>
    <keep-alive exclude="Setting">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu';
export default {
  name: 'cai-tools',
  components: {
    NavMenu,
  },
};
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app{
	display: flex;
	justify-content: flex-start;
	height: 100%;
}
</style>
