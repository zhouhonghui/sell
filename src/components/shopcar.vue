<template>
<div>
	<div class="shopcar">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="car-wrap">
					<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
					<span class="num" v-show="totalCount>0">{{totalCount}}</span>
				</div>
				<div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
				<div class="dec">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" @click.stop.prevent="pay" :class="payClass">{{payDesc}}</div>
			</div>
		</div>
		<div class="ball-container">
			<div v-for="(ball,index) in balls" :key="index">
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
					<div class="ball" v-show="ball.show">
						<div class="inner inner-hook"></div>
					</div>
				</transition>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcar-list" v-show="listShow">
				<div class="shopcar-list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="shopcar-list-content" ref="listWrap">
					<ul>
						<li v-for="(food,index) in selectFoods" :key="index" class="food">
							<div class="name">{{food.name}}</div>
							<div class="price">￥{{food.price*food.count}}</div>
							<div class="cartcontrol-wrap">
								<div class="inner-wrap">
									<cartcontrol @add="add" :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
	<transition name="fade">
		<div @click="listHide" class="cover-wrap" v-show="listShow"></div>
	</transition>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from './cartcontrol.vue';
export default {
  name: 'shopcar',
  props: {
	deliveryPrice: {
		type: Number,
		default: 0
	},
	minPrice: {
		type: Number,
		default: 0
	},
	selectFoods: {
		type: Array,
		default() {
		return [
			{
			price: 10,
			count: 6
			}
		];
		}
	}
  },
	data() {
		return {
			balls: [
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				},
				{
					show: false
				}
			],
			dropBalls: [],
			fold: true
		};
	},
  computed: {
	totalPrice() {
		let total = 0;
		this.selectFoods.forEach((food) => {
			total += food.price * food.count;
		});
		return total;
	},
	totalCount() {
		let count = 0;
		this.selectFoods.forEach((food) => {
			count += food.count;
		});
		return count;
	},
	payDesc() {
		if(this.totalPrice === 0) {
			return `￥${this.minPrice}元起送`;
		}else if(this.totalPrice < this.minPrice){
			let diff = this.minPrice - this.totalPrice;
			return `还差￥${diff}元起送`;
		} else {
			return '去结算';
		}
	},
	payClass() {
		if(this.totalPrice < this.minPrice){
			return 'pay-active';
		}else{
			return 'active';
		}
	},
	listShow() {
		if(!this.totalCount) {
			this.fold = true;
			return false;
		}
		let show = !this.fold;
		if (show) {
			this.$nextTick(() => {
				if (!this.scroll) {
					this.scroll = new BScroll(this.$refs.listWrap, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			});
		}
		return show;
	}
  },
  methods: {
	drop(el) {
		// console.log(el);
		for(let i = 0; i < this.balls.length; i++){
			let ball = this.balls[i];
			if(!ball.show){
				ball.show = true;
				ball.el = el;
				this.dropBalls.push(ball);
				return;
			}
		}
	},
	beforeDrop(el) {
		let count = this.balls.length;
		while(count--){
			let ball = this.balls[count];
			if (ball.show){
				let rect = ball.el.getBoundingClientRect();
				let x = rect.left - 32;
				let y = -(window.innerHeight - rect.top - 22);
				el.style.display = '';
				el.style.webkitTransform = `translate3d(0,${y}px,0)`;
				el.style.transform = `translate3d(0,${y}px,0)`;
				let inner = el.getElementsByClassName('inner-hook')[0];
				inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
				inner.style.transform = `translate3d(${x}px,0,0)`;
			}
		}
	},
	dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
	toggleList() {
		if(!this.totalCount){
			return;
		}
		this.fold = !this.fold;
	},
	add(target) {
		this.drop(target);
	},
	listHide() {
		this.fold = true;
	},
	pay() {
		if(this.totalPrice < this.minPrice){
			return;
		}
		window.alert(`支付${this.totalPrice}元`);
	},
	empty() {
		this.selectFoods.forEach((food) => {
			food.count = 0;
		});
	}
  },
	components: {
		cartcontrol
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.shopcar{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 96/@rem;
	z-index: 50;
}
.content{
	display: flex;
	background:#141d27;
}
.content-left{
	flex: 1;
	font-size:0;
	.price{
		display: inline-block;
		margin:24/@rem 0;
		padding-right: 24/@rem;
		font-size:32/@rem;
		color:rgba(255,255,255,.4);
		font-weight: 700;
		line-height: 48/@rem;
		vertical-align: top;
		border-right:1/@rem solid rgba(255, 255, 255, 0.1);
		&.highlight{
			color:#fff;
		}
	}
	.dec{
		display: inline-block;
		vertical-align: top;
		padding-left: 24/@rem;
		font-size:24/@rem;
		color:rgba(255,255,255,.4);
		line-height: 48/@rem;
		padding-top: 24/@rem;
	}
}
.car-wrap{
	display: inline-block;
	width: 112/@rem;
	height: 112/@rem;
	position: relative;
	top:-20/@rem;
	background:#141d27;
	margin:0 24/@rem;
	border-radius: 50%;
	padding:12/@rem;
	box-sizing: border-box;
	.icon-shopping_cart{
		display: inline-block;
		width: 100%;
		height: 100%;
		background:#2b343c;
		border-radius: 50%;
		font-size:48/@rem;
		line-height: 88/@rem;
		text-align: center;
		color: rgba(255,255,255,.4);
		&.highlight{
			background:#00a0dc;
			color:#fff;
		}
	}
	.num{
		display: inline-block;
		position: absolute;
		top:0;
		right:0;
		background:#f01414;
		color:#fff;
		width: 48/@rem;
		height: 32/@rem;
		font-size:20/@rem;
		text-align: center;
		line-height: 32/@rem;
		border-radius: 32/@rem;
		box-shadow: 0 8/@rem 16/@rem 0 rgba(0,0,0,.4);
		font-weight: 700;
	}
}
.content-right{
	flex: 0 0 210/@rem;
	.pay{
		width: 100%;
		height: 100%;
		background:#2b333b;
		font-size:24/@rem;
		font-weight:700;
		color:rgba(255,255,255,.4);
		text-align: center;
		line-height: 96/@rem;
		&.active{
			background:#00b43c;
			color:#fff;
		}
	}
}
.ball-container{
	.ball{
		position: fixed;
		left:64/@rem;
		bottom: 44/@rem;
		z-index: 200;
		transition:all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
		.inner{
			width: 32/@rem;
			height: 32/@rem;
			border-radius: 50%;
			background:rgb(0,160,220);
			transition:all 0.4s linear;
		}
	}
}
.shopcar-list{
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
	transform: translate3d(0, -100%, 0);
}
.shopcar-list-header{
	width: 100%;
	height: 80/@rem;
	background:#f3f5f7;
	padding:0 36/@rem;
	box-sizing: border-box;
	line-height: 80/@rem;
	border-bottom: 1/@rem solid rgba(7, 17, 27, 0.1);
	.title{
		float: left;
		font-size: 28/@rem;
		font-weight: 200;
		color: rgb(7,17,27);
	}
	.empty{
		float: right;
		font-size:24/@rem;
		color:rgb(0,160,220);
	}
}
.shopcar-list-content{
	width: 100%;
	padding:0 36/@rem;
	box-sizing: border-box;
	background:#fff;
	max-height: 434/@rem;
	overflow:hidden;
	.food{
		display: flex;
		height: 96/@rem;
		line-height: 96/@rem;
		.border-1px(rgba(7,17,27,.1));
		align-items:center;
		.name{
			flex:1;
			font-size:28/@rem;
			color: rgb(7,17,27);
		}
		.price{
			font-size:28/@rem;
			font-weight:700;
			color: rgb(240,20,20);
			padding-right: 24/@rem;
		}
		.cartcontrol-wrap{
			height: 96/@rem;
			flex:0 0 168/@rem;
			overflow:hidden;
			position: relative;
			.inner-wrap{
				position: absolute;
				right:0;
				top:-12/@rem;
			}
		}
	}
}
.fold-enter-active, .fold-leave-active {
  transition: all 0.5s;
}
.fold-enter, .fold-leave-to{
  transform: translate3d(0, 0, 0);
}
.cover-wrap{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 40;
	opacity: 1;
	background:rgba(7,17,27,.6);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
</style>
