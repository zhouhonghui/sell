<template>
	<div class="seller" ref="seller">
		<div class="seller-box">
			<div class="seller-header-wrap">
				<div class="seller-header-top">
					<h1 class="title">{{seller.name}}</h1>
					<div class="star-wrap">
						<star :size="36" :score="seller.score"></star>
						<span class="ratingCount">（{{seller.ratingCount}}）</span>
						<span class="sellCount">月售{{seller.sellCount}}单</span>
					</div>
					<div class="favorite-wrap" @click="toggleFavorite">
						<span class="icon-favorite" :class="{'active':favorite}"></span>
						<div class="text">{{favoriteText}}</div>
					</div>
				</div>
				<div class="seller-header-bottom">
					<div class="list-text">
						<h2 class="title">起送价</h2>
						<p class="text">{{seller.minPrice}}<span>元</span></p>
					</div>
					<div class="list-text">
						<h2 class="title">商家配送</h2>
						<p class="text">{{seller.deliveryPrice}}<span>元</span></p>
					</div>
					<div class="list-text">
						<h2 class="title">平均配送时间</h2>
						<p class="text">{{seller.deliveryTime}}<span>分钟</span></p>
					</div>
				</div>
			</div>
			<split></split>
			<div class="bulletin-wrap">
				<h2 class="title">公告与活动</h2>
				<div class="bulletin">{{seller.bulletin}}</div>
				<ul v-if="seller.supports" class="cover-supports">
					<li v-for="(item,index) in seller.supports" :key="index">
						<span class="ico" :class="classMap[seller.supports[index].type]"></span><span class="cover-text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h2 class="title">商家实景</h2>
				<div class="pics-box" ref="pics">
					<ul ref="picsBox">
						<li class="pics-item" v-for="(item,index) in seller.pics" :key="index">
							<img :src="item" alt="">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info-wrap">
				<h2 class="title">商家信息</h2>
				<ul>
					<li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import star from '../components/star.vue';
import split from '../components/split.vue';
import {saveToLocal, loadFromLocal} from '../assets/js/store.js';
export default {
	name: 'seller',
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			favorite: (() => {
				return loadFromLocal(this.seller.id, 'favorite', false);
			})()
		};
	},
	computed: {
		favoriteText() {
			return this.favorite ? '已收藏' : '收藏';
		}
	},
	watch: {
		'seller'(){
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			});
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll();
			this._initPics();
		});
	},
	methods: {
		_initScroll() {
			if(!this.scroll){
				this.scroll = new BScroll(this.$refs.seller, {
					click:true
				});
			}else{
				this.scroll.refresh();
			}
		},
		_initPics(){
			if(this.seller.pics){
				let width = 240;
				let margin = 12;
				let boxWidth = (width + margin) * this.seller.pics.length - margin;
				this.$refs.picsBox.style.width = boxWidth / 30 + 'rem';
				this.$nextTick(() => {
					if(!this.picScroll){
						this.picScroll = new BScroll(this.$refs.pics, {
							scrollX: true,
							eventPassthrough: 'vertical'
						});
					}else{
						this.picScroll.refresh();
					}
				});
			}
		},
		toggleFavorite(event){
			if(!event._constructed){
				return;
			}
			this.favorite = !this.favorite;
			saveToLocal(this.seller.id, 'favorite', this.favorite);
		}
	},
	components: {
		star,
		split
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.seller{
	position: absolute;
	left: 0;
	top: 348/@rem;
	right: 0;
	bottom: 0;
	overflow:hidden;
}
.seller-header-wrap{
	padding:36/@rem;
}
.seller-header-top{
	position: relative;
	.title{
		font-size:28/@rem;
		color:rgb(7,17,27);
		line-height: 28/@rem;
		padding-bottom: 16/@rem;
	}
	.star-wrap{
		font-size: 0;
		padding-bottom: 36/@rem;
		.border-1px(rgba(7,17,27,.1));
		.star{
			display: inline-block;
			vertical-align: middle;
		}
		.ratingCount,.sellCount{
			display: inline-block;
			vertical-align: middle;
			font-size:20/@rem;
			color:rgb(77,85,93);
			line-height: 36/@rem;
		}
		.ratingCount{
			padding:0 24/@rem 0 16/@rem;
		}
	}
	.favorite-wrap{
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
		width: 80/@rem;
		.icon-favorite{
			display:block;
			font-size: 48/@rem;
			line-height: 48/@rem;
			color:#d4d6d9;
			padding-bottom:8/@rem;
			&.active{
				color:rgb(240,20,20);
			}
		}
		.text{
			display:block;
			font-size:20/@rem;
			line-height: 20/@rem;
			color:rgb(77,85,93);
		}
	}
}
.seller-header-bottom{
	display: flex;
	padding-top: 36/@rem;
	.list-text{
		flex:1;
		text-align: center;
		border-right:1/@rem solid rgba(7, 17, 27, .1);
		&:last-child{
			border-right:none;
		}
		.title{
			font-size:20/@rem;
			color:rgb(147,153,159);
			line-height: 20/@rem;
			padding-bottom: 8/@rem;
		}
		.text{
			font-size:48/@rem;
			font-weight:200;
			color:rgb(7,17,27);
			line-height: 48/@rem;
			span{
				font-weight: normal;
				font-size:20/@rem;
			}
		}
	}
}
.bulletin-wrap{
	padding:36/@rem 36/@rem 0;
	.title{
		font-size:28/@rem;
		color:rgb(7,17,27);
		line-height: 28/@rem;
		padding-bottom: 16/@rem;
	}
	.bulletin{
		padding:0 24/@rem 32/@rem;
		font-size:24/@rem;
		font-weight:200;
		color:rgb(240,20,20);
		line-height: 48/@rem;
		.border-1px(rgba(7,17,27,.1));
	}
	.cover-supports{
		li{
			padding:32/@rem 24/@rem;
			.border-1px(rgba(7,17,27,.1));
			&:last-child{
				&:after{
					display: none;
				}
			}
			.ico{
				display: inline-block;
				vertical-align: middle;
				width: 32/@rem;
				height: 32/@rem;
				background-size:100%;
				margin-right: 12/@rem;
				&.decrease{
					.bg-image(decrease_4);
				}
				&.discount{
					.bg-image(discount_4);
				}
				&.guarantee{
					.bg-image(guarantee_4);
				}
				&.invoice{
					.bg-image(invoice_4);
				}
				&.special{
					.bg-image(special_4);
				}
			}
			.cover-text{
				display: inline-block;
				vertical-align: middle;
				font-size:24/@rem;
				font-weight:200;
				color:rgb(7,17,27);
				line-height: 32/@rem;
			}
		}
	}
}
.pics{
	padding:36/@rem;
	.pics-box{
		width: 100%;
		overflow:hidden;
	}
	.title{
		font-size: 28/@rem;
		color: #07111b;
		line-height: 28/@rem;
		padding-bottom: 24/@rem;
	}
	.pics-item{
		width: 240/@rem;
		height: 180/@rem;
		overflow:hidden;
		margin-right: 12/@rem;
		display: inline-block;
		&:last-child{
			margin-right: 0;
		}
		img{
			width: 100%;
		}
	}
}
.info-wrap{
	padding:36/@rem 36/@rem 0;
	.title{
		font-size: 28/@rem;
		color: #07111b;
		line-height: 28/@rem;
		padding-bottom: 24/@rem;
		.border-1px(rgba(7,17,27,.1));
	}
	.info-item{
		padding:32/@rem 24/@rem;
		font-size:24/@rem;
		font-weight: 200;
		color:rgb(7,17,27);
		line-height: 32/@rem;
		.border-1px(rgba(7,17,27,.1));
		&:last-child{
			&:after{
				display: none;
			}
		}
	}
}
</style>
