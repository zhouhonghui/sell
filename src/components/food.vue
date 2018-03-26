<template>
	<transition name="food">
		<div v-show="flagShow" class="food" ref="food">
			<div class="food-box">
				<div class="food-header">
					<img class="food-img" :src="food.image" :alt="food.name" />
					<span @click="hide" class="icon-arrow_lift"></span>
				</div>
				<div class="food-content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="newspriec">￥{{food.price}}</span><span class="oldprice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<transition name="fade">
						<div @click="fistAdd" class="join" v-show="!food.count || food.count === 0">加入购物车</div>
					</transition>
					<div class="cartcontrol-wrap">
						<cartcontrol @add="add" :food="food"></cartcontrol>
					</div>
				</div>
				<split v-if="food.info"></split>
				<div class="info" v-if="food.info">
					<h1 class="info-title">商家介绍</h1>
					<div class="info-desc">{{food.info}}</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect @select="selectRating" @watch="toggleContent" :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent" :desc="desc"></ratingselect>
					<div class="ratings-warp">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(item.rateType,item.text)" v-for="(item, index) in food.ratings" :key="index" class="rating-item">
								<div class="time">{{item.rateTime | formatDate}}</div>
								<p class="text"><span :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></span>{{item.text}}</p>
								<div class="user">
									<span class="username">{{item.username}}</span>
									<img class="avatar" :src="item.avatar" :alt="item.username">
								</div>
							</li>
						</ul>
						<div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import BScroll from 'better-scroll';
import Vue from 'vue';
import cartcontrol from './cartcontrol.vue';
import split from './split.vue';
import ratingselect from './ratingselect.vue';
import {formatDate} from '../assets/js/date.js';
const ALL = 2;
export default {
	name: 'food',
	props: {
		food: {
			type: Object
		}
	},
	data() {
		return {
			flagShow: false,
			selectType: ALL,
			onlyContent: true,
			desc:{
				all: '全部',
				positive: '推荐',
				negative: '吐槽'
			}
		};
	},
  methods: {
	show() {
		this.flagShow = true;
		this.selectType = ALL;
		this.onlyContent = true;
		this.$nextTick(() => {
		if (!this.scroll) {
			this.scroll = new BScroll(this.$refs.food, {
				click: true
			});
		} else {
			this.scroll.refresh();
		}
		});
	},
	hide() {
		this.flagShow = false;
	},
	add(target) {
		this.$emit('add', target);
	},
	fistAdd(event) {
		if(!event._constructed){
			return;
		}
		this.$emit('add', event.target);
		Vue.set(this.food, 'count', 1);
	},
	needShow(type, text) {
		if(this.onlyContent && !text){
			return false;
		}
		if(this.selectType === ALL){
			return true;
		}else{
			return type === this.selectType;
		}
	},
	selectRating(type) {
		this.selectType = type;
		this.$nextTick(() => {
			this.scroll.refresh();
		});
	},
	toggleContent() {
		this.onlyContent = !this.onlyContent;
		this.$nextTick(() => {
			this.scroll.refresh();
		});
	}
  },
	filters: {
		formatDate(time) {
			let date = new Date(time);
			return formatDate(date, 'yyyy-MM-dd hh:mm');
		}
	},
	components: {
		cartcontrol,
		split,
		ratingselect
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.food-enter-active, .food-leave-active {
  transition: all .2s linear;
}
.food-enter, .food-leave-to{
  transform:translate3d(100%,0,0);
}
.food{
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 96/@rem;
	z-index: 30;
	background:#fff;
}
.food-header{
	width: 100%;
	height: 0;
	padding-top: 100%;
	position: relative;
	.food-img{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.icon-arrow_lift{
		display: inline-block;
		position: absolute;
		top: 20/@rem;
		left: 10/@rem;
		z-index: 20;
		font-size:40/@rem;
		color:#fff;
		padding:20/@rem;
		background: rgba(0,0,0,.2);
	}
}
.food-content{
	padding:36/@rem;
	position: relative;
	.title{
		font-size:28/@rem;
		font-weight:700;
		color:rgb(7,17,27);
		line-height: 28/@rem;
		padding-bottom: 16/@rem;
	}
	.detail{
		font-size:20/@rem;
		line-height: 20/@rem;
		color:rgb(147,153,159);
		padding-bottom: 36/@rem;
		.sellCount{
			display: inline-block;
			padding-right: 24/@rem;
		}
	}
	.price{
		line-height: 48/@rem;
		font-weight:700;
		.newspriec{
			font-size:28/@rem;
			color:rgb(240,20,20);
			padding-right: 16/@rem;
		}
		.oldprice{
			font-size:20/@rem;
			color:rgb(147,153,159);
			text-decoration: line-through;
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
	}
	.join{
		position: absolute;
		padding:12/@rem 24/@rem;
		border-radius:24/@rem;
		background:rgb(0,160,220);
		font-size:20/@rem;
		color:#fff;
		right: 36/@rem;
		bottom: 36/@rem;
		z-index: 20;
	}
	.cartcontrol-wrap{
		position: absolute;
		right: 36/@rem;
		bottom: 20/@rem;
		z-index: 10;
	}
}
.info{
	padding:36/@rem;
	.info-title{
		font-size:28/@rem;
		color:#07111b;
		line-height: 28/@rem;
		padding-bottom: 12/@rem;
	}
	.info-desc{
		padding:0 16/@rem;
		font-size:24/@rem;
		color:rgb(77,85,93);
		line-height: 48/@rem;
		font-weight:200;
	}
}
.rating{
	padding-top: 36/@rem;
	.title{
		font-size:28/@rem;
		color:#07111b;
		line-height: 28/@rem;
		padding-left: 36/@rem;
	}
}
.ratings-warp{
	padding:0/@rem 36/@rem;
	.rating-item{
		padding:32/@rem 0;
		position: relative;
		.border-1px(rgba(7,17,27,.1));
		.time{
			font-size: 20/@rem;
			color:rgb(147,153,159);
			line-height: 24/@rem;
			padding-bottom: 12/@rem;
		}
		.text{
			font-size:24/@rem;
			line-height: 48/@rem;
			color:rgb(7,17,27);
			.icon-thumb_up{
				color:rgb(0,160,220);
				margin-right: 8/@rem;
			}
			.icon-thumb_down{
				color:rgb(147,153,159);
				margin-right: 8/@rem;
			}
		}
		.user{
			position: absolute;
			top: 32/@rem;
			right: 0;
			font-size: 0;
			.username{
				font-size: 20/@rem;
				color:rgb(147,153,159);
				line-height: 24/@rem;
				margin-right: 12/@rem;
				vertical-align: middle;
			}
			.avatar{
				width: 24/@rem;
				height: 24/@rem;
				border-radius: 50%;
				vertical-align: middle;
			}
		}
	}
	.no-rating{
		padding:32/@rem 0;
		font-size:24/@rem;
		line-height: 48/@rem;
		color:#93999f;
	}
}
</style>
