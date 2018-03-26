<template>
  <div class="cartcontrol">
	<transition name="move">
		<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
			<span class="inner icon-remove_circle_outline"></span>
		</div>
	</transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
	name: 'cartcontrol',
	props: {
		food: {
			type: Object
		}
	},
	methods: {
		addCart(event) {
			if(!this.food.count){
				Vue.set(this.food, 'count', 1);
			}else{
				this.food.count++;
			}
			this.$emit('add', event.target);
		},
		decreaseCart(){
			this.food.count--;
		}
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.cartcontrol{
	font-size:0;
	.move-enter-active,.move-leave-active{
		transition: all 0.4s linear;
		opacity: 1;
		transform: translate3d(0, 0, 0);
		.inner{
			display: inline-block;
			transition: all 0.4s linear;
		}
	}
	.move-enter,.move-leave-active{
		opacity: 0;
		transform: translate3d(48/@rem, 0, 0);
		.inner{
			transform: rotate(180deg);
		}
	}
	.cart-decrease{
		display: inline-block;
		font-size:48/@rem;
		color:#00a0dc;
		vertical-align: middle;
		padding:12/@rem;
	}
	.cart-count{
		display: inline-block;
		width: 24/@rem;
		font-size: 20/@rem;
		color:rgb(147,153,159);
		line-height: 48/@rem;
		text-align: center;
		vertical-align: middle;
	}
	.icon-add_circle{
		display: inline-block;
		font-size:48/@rem;
		color:#00a0dc;
		vertical-align: middle;
		padding:12/@rem;
	}
}
</style>
