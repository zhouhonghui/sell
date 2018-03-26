<template>
<div>
  <div class="goods">
    <div class="menu-wrap" ref="menuWrapper">
		<ul>
			<li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index}" @click="seletMune(index,$event)">
				<span class="text">
					<span class="ico" :class="classMap[item.type]" v-if="item.type>0"></span>{{item.name}}
				</span>
			</li>
		</ul>
    </div>
    <div class="foods-wrap" ref="foodsWrapper">
		<ul>
			<li class="foods-list" v-for="(item,index) in goods" :key="index" ref="foodsList">
			<h1 class="title">{{item.name}}</h1>
			<ul>
				<li @click="selectFood(foods, $event)" class="foods-item" v-for="(foods,index) in item.foods" :key="index">
					<div class="foods-img">
						<img :src="foods.icon" :alt="foods.name">
					</div>
					<div class="foods-right">
						<h2 class="name">{{foods.name}}</h2>
						<p class="description" v-if="foods.description">{{foods.description}}</p>
						<div class="extra">
							<span class="sellCount">月售{{foods.sellCount}}份</span><span class="rating">好评率{{foods.rating}}%</span>
						</div>
						<div class="price">
							<span class="newprice">￥{{foods.price}}</span><span class="oldprice" v-if="foods.oldPrice">￥{{foods.oldPrice}}</span>
						</div>
						<div class="cartcontrol-wrap">
							<cartcontrol @add="add" :food="foods"></cartcontrol>
						</div>
					</div>
				</li>
			</ul>
			</li>
		</ul>
    </div>
    <shopcar ref="shopcar" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
  </div>
  <food @add="add" :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcar from '../components/shopcar.vue';
import cartcontrol from '../components/cartcontrol.vue';
import food from '../components/food.vue';
const debug = process.env.NODE_ENV !== 'production';
export default {
  name: 'goods',
  props: {
	seller: {
		type: Object
	}
  },
  data() {
	return{
		goods: [],
		listHeight: [],
		scrollY: 0,
		selectedFood: {}
	};
  },
  computed: {
	currentIndex() {
		for (let i = 0; i < this.listHeight.length; i++){
			let height1 = this.listHeight[i];
			let height2 = this.listHeight[i + 1];
			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
				return i;
			}
			// console.log(i);
		}
		return 0;
	},
	selectFoods() {
		let foods = [];
		this.goods.forEach((good) => {
			good.foods.forEach((food) => {
				if(food.count){
					foods.push(food);
				}
			});
		});
		return foods;
	}
  },
  created() {
	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	const url = debug ? '/api/goods' : 'http://localhost:85/data.json';
	this.axios.get(url).then((response) => {
	response = response.data;
	if(response.errno === 0){
		this.goods = response.data;
		// console.log(this.goods);
		this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
	}
	});
  },
  methods: {
	_initScroll() {
		this.meunScroll = new BScroll(this.$refs.menuWrapper, {
			click: true
		});
		this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
			click: true,
			probeType: 3
		});
		this.foodsScroll.on('scroll', (pos) => {
			this.scrollY = Math.abs(Math.round(pos.y));
		});
	},
	_calculateHeight() {
		let foodlist = this.$refs.foodsList;
		let height = 0;
		this.listHeight.push(height);
		for(let i = 0; i < foodlist.length; i++){
			let item = foodlist[i];
			height += item.clientHeight;
			this.listHeight.push(height);
		}
		// console.log(this.listHeight);
	},
	seletMune(index, event) {
		if(!event._constructed){
			return;
		}
		let foodlist = this.$refs.foodsList;
		let el = foodlist[index];
		this.foodsScroll.scrollToElement(el, 300);
		// console.log(index);
	},
	add(target) {
		this._drop(target);
	},
	_drop(target) {
		this.$nextTick(() => {
			this.$refs.shopcar.drop(target);
		});
	},
	selectFood(food, event) {
		if(!event._constructed){
			return;
		}
		this.selectedFood = food;
		this.$refs.food.show();
	}
  },
	components: {
		shopcar,
		cartcontrol,
		food
	}
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.goods{
	display: flex;
	position: absolute;
	top: 348/@rem;
	left: 0;
	right: 0;
	bottom:92/@rem;
	overflow:hidden;
}
.menu-wrap{
	flex:0 0 160/@rem;
}
.foods-wrap{
	flex: 1;
}
.menu-item{
	display: table;
	width: 112/@rem;
	height: 108/@rem;
	font-size:24/@rem;
	background:#f3f5f7;
	font-weight:200;
	line-height: 28/@rem;
	padding:0 24/@rem;
	&.current{
		background:#fff;
		position: relative;
		margin-top: -2/@rem;
		.text{
			&:after{
				border-bottom: none;
			}
		}
	}
	.text{
		display: table-cell;
		vertical-align: middle;
		.border-1px(rgba(7,17,27,.1));
	}
	.ico{
			display: inline-block;
			width:24/@rem;
			height:24/@rem;
			margin-right: 4/@rem;
			vertical-align: top;
			background-size:cover;
			background-repeat:no-repeat;
			&.decrease{
				.bg-image(decrease_3);
			}
			&.discount{
				.bg-image(discount_3);
			}
			&.guarantee{
				.bg-image(guarantee_3);
			}
			&.invoice{
				.bg-image(invoice_3);
			}
			&.special{
				.bg-image(special_3);
			}
		}
}
.foods-list{
	.title{
		font-size:24/@rem;
		color:rgb(147,153,159);
		line-height: 52/@rem;
		border-left: 4/@rem solid #d9dde1;
		background:#f3f5f7;
		padding-left: 28/@rem;
	}
}
.foods-item{
	display: flex;
	margin:36/@rem;
	position: relative;
	padding-bottom: 36/@rem;
	&:last-child{
		margin-bottom: 0;
		&:after{border-bottom: none;}
	}
	.border-1px(rgba(7,17,27,.1));
	.foods-img{
		flex:0 0 114/@rem;
		img{
			width: 114/@rem;
			height: 114/@rem;
		}
	}
	.foods-right{
		flex:1;
		padding-left: 20/@rem;
		.name{
			font-size:28/@rem;
			padding-top: 4/@rem;
			color:rgb(7,17,27);
			line-height: 28/@rem;
		}
		.description{
			padding-top: 16/@rem;
			font-size:20/@rem;
			color:rgb(147,153,159);
			line-height: 28/@rem;
		}
		.extra{
			padding-top: 16/@rem;
			font-size:20/@rem;
			color:rgb(147,153,159);
			line-height: 20/@rem;
			.rating{
				padding-left: 24/@rem;
			}
		}
		.price{
			line-height: 48/@rem;
			.newprice{
				font-size:20/@rem;
				color:#f01414;
			}
			.oldprice{
				font-size:20/@rem;
				color:#93999f;
				text-decoration:line-through;
				margin-left: 16/@rem;
			}
		}
	}
}
.cartcontrol-wrap{
	position: absolute;
	right: 0;
	bottom: 24/@rem;
}
</style>
