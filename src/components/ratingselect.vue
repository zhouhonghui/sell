<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="watch">
			<span @click="watch" class="icon-check_circle" :class="{'on':onlyContent}"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
	name: 'ratingselect',
	props: {
		ratings: {
			type: Array,
			default() {
				return [];
			}
		},
		selectType: {
			type: Number,
			default: ALL
		},
		onlyContent: {
			type: Boolean,
			default: true
		},
		desc: {
			type: Object,
			default() {
				return{
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		}
	},
	methods: {
		select(type, $event) {
			if(!event._constructed){
				return;
			}
			this.$emit('select', type);
		},
		watch($event) {
			if(!event._constructed){
				return;
			}
			this.$emit('watch');
		}
	},
	computed: {
		positive() {
			return this.ratings.filter((rating) => {
				return rating.rateType === POSITIVE;
			});
		},
		negative() {
			return this.ratings.filter((rating) => {
				return rating.rateType === NEGATIVE;
			});
		}
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.ratingselect{
	.rating-type{
		margin:0 36/@rem;
		padding:36/@rem 0;
		font-size: 0;
		.border-1px(rgba(7,17,27,.1));
		.block{
			padding:16/@rem 24/@rem;
			font-size:24/@rem;
			color:rgb(77,85,93);
			line-height: 32/@rem;
			border-radius: 4/@rem;
			margin-right: 16/@rem;
			.count{
				font-size:20/@rem;
				margin-left: 4/@rem;
			}
		}
		.positive{
			background: rgba(0,160,220,.2);
			&.active{
				background: rgba(0,160,220,1);
				color:#fff;
			}
		}
		.negative{
			background: rgba(77,85,93,.2);
			&.active{
				background: rgba(77,85,93,1);
				color:#fff;
			}
		}
	}
	.watch{
		padding:24/@rem 36/@rem;
		line-height: 48/@rem;
		.border-1px(rgba(7,17,27,.1));
		.icon-check_circle{
			font-size:48/@rem;
			color:rgb(147,153,159);
			vertical-align: middle;
			&.on{
				color:#00c850;
			}
		}
		.text{
			font-size:24/@rem;
			color:rgb(147,153,159);
			vertical-align: middle;
		}
	}
}
</style>
