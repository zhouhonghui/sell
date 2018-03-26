<template>
  <div class="sell-header">
	<div class="header-wrap">
		<div class="logo">
			<img :src="seller.avatar" :alt="seller.name">
		</div>
		<div class="text">
			<div class="title">
				<span class="brand"></span>
				<span class="name">{{seller.name}}</span>
			</div>
			<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
			<div v-if="seller.supports" class="supports">
				<span class="ico" :class="classMap[seller.supports[0].type]"></span>
				<span class="supports-description">{{seller.supports[0].description}}</span>
				<span class="supports-num" @click="showDetail">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
			</div>
		</div>
	</div>
	<div class="bulletin">
		<span class="bulletin-img"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right" @click="showDetail"></i>
	</div>
	<div class="wrap-bg">
		<img :src="seller.avatar" :alt="seller.name">
	</div>
	<div v-show="detailShow" class="cover-box">
		<div class="detail-wrap">
			<div class="detail-main">
				<div class="detail-tltle">{{seller.name}}</div>
				<div class="star-wrap">
					<star :size="48" :score="seller.score"></star>
				</div>
				<div class="cover-title">
					<div class="line"></div>
					<div class="cover-text">优惠信息</div>
					<div class="line"></div>
				</div>
				<ul v-if="seller.supports" class="cover-supports">
					<li v-for="(item,index) in seller.supports" :key="index">
						<span class="ico" :class="classMap[seller.supports[index].type]"></span><span class="cover-text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
				<div class="cover-title">
					<div class="line"></div>
					<div class="cover-text">商家公告</div>
					<div class="line"></div>
				</div>
				<div class="cover-bulletin">{{seller.bulletin}}</div>
			</div>
		</div>
		<div class="detail-close">
			<i class="icon-close" @click="hideDetail"></i>
		</div>
	</div>
  </div>
</template>

<script>
import star from './star.vue';
export default {
  name: 'sellHeader',
  props: {
	seller: {
		type: Object
	}
  },
  data() {
      return {
        detailShow: false
      };
    },
    methods: {
		showDetail() {
			this.detailShow = true;
		},
		hideDetail() {
			this.detailShow = false;
		}
    },
	created() {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	components: {
      star
    }
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
	.sell-header{
		width:100%;
		overflow:hidden;
		background:rgba(7,17,27,.5);
		color:#fff;
		position: relative;
	}
	.header-wrap{
		padding:48/@rem 24/@rem 36/@rem 48/@rem;
		vertical-align: top;
		font-size:0;
		position: relative;
	}
	.logo{
		display:inline-block;
		vertical-align: top;
		img{
			width: 128/@rem;
			height: 128/@rem;
		}
	}
	.text{
		display: inline-block;
		vertical-align: top;
		margin-left: 32/@rem;
		color:#ffffff;
	}
	.title{
		vertical-align: top;
		span{
			vertical-align: top;
		}
		margin-top: 4/@rem;
	}
	.brand{
		display: inline-block;
		width:60/@rem;
		height: 36/@rem;
		.bg-image(brand);
		background-size:cover;
		background-repeat: no-repeat;
		background-position: center;
	}
	.name{
		display: inline-block;
		line-height: 36/@rem;
		font-size:32/@rem;
		font-weight:bold;
		margin-left: 12/@rem;
	}
	.description{
		font-size:24/@rem;
		font-weight:200;
		line-height: 24/@rem;
		margin-top: 16/@rem;
		margin-bottom: 20/@rem;
	}
	.supports{
		.ico{
			display: inline-block;
			width:24/@rem;
			height:24/@rem;
			vertical-align: middle;
			background-size:cover;
			background-repeat:no-repeat;
			&.decrease{
				.bg-image(decrease_1);
			}
			&.discount{
				.bg-image(discount_1);
			}
			&.guarantee{
				.bg-image(guarantee_1);
			}
			&.invoice{
				.bg-image(invoice_1);
			}
			&.special{
				.bg-image(special_1);
			}
		}
		.supports-description{
			display: inline-block;
			font-size:20/@rem;
			line-height: 24/@rem;
			font-weight:200;
			vertical-align: middle;
			margin-left: 8/@rem;
		}
		.supports-num{
			display: inline-block;
			height: 48/@rem;
			font-size:20/@rem;
			color:#ffffff;
			line-height: 48/@rem;
			font-weight: 200;
			background:rgba(0,0,0,.2);
			padding:0 16/@rem;
			border-radius: 28/@rem;
			position: absolute;
			right: 24/@rem;
			bottom: 24/@rem;
			i{
				font-size:20/@rem;
				margin-left: 4/@rem;
				line-height: 48/@rem;
			}
		}
	}
	.bulletin{
		height: 56/@rem;
		line-height: 56/@rem;
		padding:0 44/@rem 0 24/@rem;
		background:rgba(7,17,27,.2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
		.bulletin-img{
			display: inline-block;
			width: 44/@rem;
			height: 24/@rem;
			.bg-image(bulletin);
			background-size:cover;
			background-repeat:no-repeat;
			margin-top: 16/@rem;
		}
		.bulletin-text{
			font-size:20/@rem;
			vertical-align: top;
			margin-left: 8/@rem;
		}
		i{
			position: absolute;
			right: 24/@rem;
			font-size: 20/@rem;
			bottom: 16/@rem;
		}
	}
	.wrap-bg{
		position: absolute;
		left:0;
		top:0;
		right: 0;
		bottom: 0;
		z-index:-1;
		filter: blur(20/@rem);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.cover-box{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background:rgba(7,17,27,.8);
		z-index: 1000;
		overflow: auto;
	}
	.detail-wrap{
		width:100%;
		min-height:100%;
	}
	.detail-main{
		padding-top: 128/@rem;
		padding-bottom: 128/@rem;
	}
	.detail-tltle{
		font-size:32/@rem;
		font-weight:700;
		line-height: 32/@rem;
		color:#ffffff;
		text-align: center;
	}
	.detail-close{
		position: relative;
		width: 64/@rem;
		height:64/@rem;
		margin:-128/@rem auto 0;
		font-size:64/@rem;
	}
	.star-wrap{
		padding-top: 32/@rem;
		padding-bottom: 56/@rem;
		text-align: center;
	}
	.cover-title{
		display:flex;
		width: 80%;
		margin:0 auto;
		padding-bottom: 48/@rem;
		.line{
			flex:1;
			border-bottom:1/@rem solid rgba(255, 255, 255, 0.2);
			position: relative;
			top: -12/@rem;
		}
		.cover-text{
			padding:0 24/@rem;
			font-size:28/@rem;
			line-height: 28/@rem;
			font-weight:700;
		}
	}
	.cover-supports{
		width: 80%;
		margin:0 auto;
		li{
			padding-left: 24/@rem;
			padding-bottom: 24/@rem;
			&:last-child{
				padding-bottom: 56/@rem;
			}
		}
		.ico{
			display: inline-block;
			vertical-align: middle;
			width: 32/@rem;
			height: 32/@rem;
			background-size:100% 100%;
			&.decrease{
				.bg-image(decrease_2);
			}
			&.discount{
				.bg-image(discount_2);
			}
			&.guarantee{
				.bg-image(guarantee_2);
			}
			&.invoice{
				.bg-image(invoice_2);
			}
			&.special{
				.bg-image(special_2);
			}
		}
		.cover-text{
			display: inline-block;
			padding-left: 12/@rem;
			font-size:24/@rem;
			vertical-align: middle;
			font-weight:200;
			line-height: 24/@rem;
			color:rgb(255,255,255);
		}
	}
	.cover-bulletin{
		width: 80%;
		padding:0 24/@rem;
		margin:0 auto;
		font-size:24/@rem;
		font-weight:200;
		color:#ffffff;
		line-height: 48/@rem;
	}
</style>
