<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  name: 'star',
  props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
};
</script>

<style lang="less" scoped>
@import '../assets/less/common.less';
.star{
	.star-item{
		display: inline-block;
		background-size:100% 100%;
	}
	&.star-48{
		.star-item{
			width: 40/@rem;
			height: 40/@rem;
			margin-right: 44/@rem;
			&:last-child{
				margin-right: 0;
			}
			&.on{
				.bg-image(star48_on);
			}
			&.half{
				.bg-image(star48_half);
			}
			&.off{
				.bg-image(star48_off);
			}
		}
	}
	&.star-36{
		.star-item{
			width: 30/@rem;
			height: 30/@rem;
			margin-right: 12/@rem;
			&:last-child{
				margin-right: 0;
			}
			&.on{
				.bg-image(star36_on);
			}
			&.half{
				.bg-image(star36_half);
			}
			&.off{
				.bg-image(star36_off);
			}
		}
	}
	&.star-24{
		.star-item{
			width: 20/@rem;
			height: 20/@rem;
			margin-right: 6/@rem;
			&:last-child{
				margin-right: 0;
			}
			&.on{
				.bg-image(star24_on);
			}
			&.half{
				.bg-image(star24_half);
			}
			&.off{
				.bg-image(star24_off);
			}
		}
	}
}
</style>
