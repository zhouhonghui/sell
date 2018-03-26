<template>
  <div class="split"></div>
</template>

<script>
export default {
  name: 'split'
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.split{
	width: 100%;
	height: 32/@rem;
	border-top:1/@rem solid rgba(7, 17, 27, .1);
	border-bottom:1/@rem solid rgba(7, 17, 27, .1);
	background:#f3f5f7;
}
</style>
