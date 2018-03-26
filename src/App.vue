<template>
  <div id="app">
    <sellHeader :seller="seller"></sellHeader>
    <!-- nav -->
    <div class="nav">
		<div class="nav-item">
			<router-link to="/goods">商品</router-link>
		</div>
		<div class="nav-item">
			<router-link to="/ratings">评论</router-link>
		</div>
		<div class="nav-item">
			<router-link to="/seller">商家</router-link>
		</div>
    </div>
    <!-- nav -->
    <keep-alive>
		<router-view :seller="seller"></router-view>
	</keep-alive>
  </div>
</template>

<script>
import sellHeader from './components/sellHeader.vue';
import {urlParse} from './assets/js/url.js';
const debug = process.env.NODE_ENV !== 'production';
export default {
  name: 'App',
  data(){
	return{
		seller:{
			id: (() => {
				let queryParam = urlParse();
				return queryParam.id;
			})()
		}
	};
  },
  created(){
	const url = debug ? '/api/seller' : 'http://localhost:85/data.json';
	this.axios.get(url + '?id=' + this.seller.id).then((response) => {
		response = response.data;
		// console.log(response);
		// this.seller = Object.assign({}, this.seller, response.seller);
		// console.log(this.seller);
		if(response.errno === 0){
			this.seller = Object.assign({}, this.seller, response.data);
		}
	});
  },
  components: {
      sellHeader
    }
};
</script>

<style>
@import './assets/css/reset.css';
@import './assets/css/ico.css';
</style>
<style lang="less" scoped>
@import './assets/less/common.less';
	.nav{
		display: flex;
		height: 80/@rem;
		line-height: 80/@rem;
		.border-1px(rgba(7,17,27,0.1));
	}
	.nav-item{
		flex:1;
		text-align: center;
		a{
			font-size:28/@rem;
			color:rgb(77,85,93);
			&.router-link-active{
				color:rgb(240,20,20);
			}
		}
	}
</style>
