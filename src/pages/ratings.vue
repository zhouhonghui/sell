<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-box">
			<div class="ratings-top">
				<div class="ratings-top-left">
					<h1 class="number">{{seller.score}}</h1>
					<div class="fen">综合评分</div>
					<div class="top">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="ratings-top-right">
					<div class="serviceScore-wrap">
						<span class="text">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="num">{{seller.serviceScore}}</span>
					</div>
					<div class="serviceScore-wrap">
						<span class="text">商品评价</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="num">{{seller.foodScore}}</span>
					</div>
					<div class="serviceScore-wrap">
						<span class="text">送达时间</span>
						<span class="time">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @select="selectRating" @watch="toggleContent" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
			<div class="ratings-wrap">
				<ul>
					<li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">
						<div class="rating-left">
							<img class="avatar" :src="rating.avatar" :alt="rating.username">
						</div>
						<div class="rating-right">
							<div class="username">{{rating.username}}<span class="time">{{rating.rateTime | formatDate}}</span></div>
							<div class="star-wrap">
								<star :size="24" :score="rating.score"></star>
								<span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">{{rating.text}}</div>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="recommend-item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../components/star.vue';
import split from '../components/split.vue';
import ratingselect from '../components/ratingselect.vue';
import {formatDate} from '../assets/js/date.js';
const debug = process.env.NODE_ENV !== 'production';
const ALL = 2;
export default {
	name: 'ratings',
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			ratings: [],
			selectType: ALL,
			onlyContent: true
		};
	},
	created() {
		const url = debug ? '/api/ratings' : 'http://localhost:85/data.json';
		this.axios.get(url).then((response) => {
			response = response.data;
			if(response.errno === 0){
				this.ratings = response.data;
				this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.ratings, {
						click: true
					});
				});
			}
		});
	},
	components: {
		star,
		split,
		ratingselect
	},
	methods: {
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
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.ratings{
	position: absolute;
	left: 0;
	top: 348/@rem;
	right: 0;
	bottom: 0;
	overflow:hidden;
}
.ratings-top{
	width: 100%;
	padding: 36/@rem 0;
	display: flex;
}
.ratings-top-left{
	flex:0 0 274/@rem;
	padding:12/@rem 0;
	border-right:1/@rem solid rgba(7, 17, 27, .1);
	text-align: center;
	.number{
		font-size:48/@rem;
		color:#f90;
		line-height: 56/@rem;
		padding-bottom: 12/@rem;
	}
	.fen{
		font-size:24/@rem;
		line-height: 24/@rem;
		color:#07111b;
		padding-bottom: 16/@rem;
	}
	.top{
		font-size: 20/@rem;
		line-height: 20/@rem;
		color:#93999f;
	}
}
.ratings-top-right{
	flex:1;
	padding:12/@rem 0/@rem 12/@rem 48/@rem;
	.serviceScore-wrap{
		padding-bottom: 16/@rem;
		font-size:0;
		&:last-child{
			padding-bottom: 0;
		}
		.text{
			display: inline-block;
			padding-right: 24/@rem;
			font-size:24/@rem;
			color:rgb(7,17,27);
			line-height: 36/@rem;
			vertical-align: middle;
		}
		.star{
			display: inline-block;
			padding-right: 24/@rem;
			vertical-align: middle;
		}
		.num{
			font-size:24/@rem;
			line-height: 36/@rem;
			color:#f90;
			vertical-align: middle;
		}
		.time{
			font-size:24/@rem;
			line-height: 36/@rem;
			vertical-align: middle;
			color:#93999f;
		}
	}
}
.ratings-wrap{
	padding:0 36/@rem;
}
.rating-item{
	display: flex;
	padding:36/@rem 0;
	.border-1px(rgba(7,17,27,.1));
}
.rating-left{
	flex:0 0 56/@rem;
	.avatar{
		width: 56/@rem;
		height: 56/@rem;
		border-radius: 50%;
	}
}
.rating-right{
	flex: 1;
	padding-left: 24/@rem;
	.username{
		font-size:20/@rem;
		color:rgb(7,17,27);
		line-height: 24/@rem;
		position: relative;
		padding-bottom: 8/@rem;
		.time{
			position: absolute;
			right: 0;
			top: 0;
			font-size:20/@rem;
			font-weight: 200;
			color:rgb(147,153,159);
			line-height: 24/@rem;
		}
	}
	.star-wrap{
		padding-bottom: 12/@rem;
		font-size: 0;
		.star{
			display: inline-block;
			vertical-align: middle;
		}
		.deliveryTime{
			font-size:20/@rem;
			font-weight: 200;
			color:rgb(147,153,159);
			line-height: 24/@rem;
			padding-left: 12/@rem;
			vertical-align: middle;
		}
	}
	.text{
		font-size:24/@rem;
		color:rgb(7,17,27);
		line-height: 36/@rem;
	}
	.recommend{
		padding-top: 16/@rem;
		.icon-thumb_up{
			font-size:24/@rem;
			line-height: 32/@rem;
			color:rgb(0,160,220);
			margin-right: 16/@rem;
		}
		.recommend-item{
			display: inline-block;
			padding:0 12/@rem;
			border:1/@rem solid rgba(7, 17, 27, .1);
			background: rgb(255,255,255);
			border-radius: 4/@rem;
			font-size:18/@rem;
			color:rgb(147,153,159);
			line-height: 32/@rem;
			margin-right: 16/@rem;
			margin-bottom: 8/@rem;
		}
	}
}
</style>
