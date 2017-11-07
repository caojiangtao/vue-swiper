<template>
	<div id="swiper" ref="mybox" v-on:mouseover="clearAuto" v-on:mouseout="moveAuto" :style="{height:swiperPorp.height+'px',background:swiperPorp.background}">
		<v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight" class="swiperbox" :style="{width:windoWidth+'px',
                'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)',
                'transition-duration': transitionDuration + 'ms'
            }">

			<div v-for=" item in imgall">
				<div class="content">
					<h3>{{item.name}}</h3>
					<span>{{item.tag}}</span>
					<p>{{item.content}}</p>
				</div>
				<img :src="item.src" />
			</div>

		</v-touch>
		<div class="navbox">
			<span v-for=" (item,index) in imgall" v-if="index>0 && index<=imgall.length-2" :class="{'active':index===total}" v-on:click="thisSpn(index)"> {{index}}</span>
		</div>
		<div class="pro" v-on:click="onSwipeLeft" v-show="showorhaden"> <span class="left-arrow"></span></div>
		<div class="next" v-on:click="onSwipeRight"  v-show="showorhaden"><span class="right-arrow"></span></div>
	</div>

</template>

<script type="text/babel">
	var VueTouch = require('vue-touch');
	Vue.use(VueTouch, {name: 'v-touch'});
	import './vue-swiper.scss';
	export default {
		name:"vueSwiper",
		props: {
			swiperPorp: Object,
			default: {
				time: 4000,
				loop: true,
				delay: 3000,
				background: '#000',
				height: 300
			},
			pics: {
				type: Array,
				default: [{
						"name": "1.VUE swiper",
						"href": "#",
						"tag": "组件",
						"content": "这是一个组件",
						"src": "https://cn.vuejs.org/images/logo.png"
					},
					{
						"name": "2.VUE swiper",
						"href": "#",
						"tag": "组件",
						"content": "这是一个组件",
						"src": "https://cn.vuejs.org/images/logo.png"
					}
				]

			}
		},
		data() {
			return {
				imgall: this.pics,
				translateX: -document.body.clientWidth,
				translateY: 0,
				total: 1,
				transitionDuration: 0,
				inTerval: null,
				lock: true,
				showorhaden:false,
				widowWidth: document.body.clientWidth
			}
		},
		watch: {
			"pics": function(n) {
				var len = n.length;
				this.imgall = [...n];
				this.imgall.push(n[0]);
				this.imgall.unshift(n[len - 1]);
				console.log(this.imgall)
			}
		},
		created: function() {},
		mounted: function() {
			this.$nextTick(() => {
				this.moveAuto();
				console.log("this.imgall==" + this.imgall);
			})
		},
		computed: {
			windoWidth: function() {
				return document.body.clientWidth * (this.imgall.length);
			}
		},
		methods: {
			thisSpn: function(index) {
				this.clearAuto();
				this.translateX = -document.body.clientWidth * index;
				this.transitionDuration = this.swiperPorp.time;
				this.total = index;
				console.log(this.showorhaden )
			},
			moveAuto: function() { //自动播放
				this.showorhaden = false;
				this.inTerval = setInterval(() => {
					this.leftFunc();
				}, this.swiperPorp.time + this.swiperPorp.delay)
				console.log(this.showorhaden )
			},
			clearAuto: function() { //清除播放，
				clearInterval(this.inTerval);
				this.showorhaden = true;
			},
			onSwipeRight: function() { //右滑动
				if(this.lock == false) return;
				this.lock = false;
				var that = this;
				this.clearAuto();
				if(this.total == 1) {
					this.translateX = 0;
					this.transitionDuration = this.swiperPorp.time;
					setTimeout(function() {
						that.translateX = -document.body.clientWidth * (that.imgall.length - 2);
						that.transitionDuration = 0;
						that.total = that.imgall.length - 2;
					}, that.transitionDuration)
				} else {
					this.total--;
					this.translateX = -(document.body.clientWidth * this.total);
					this.transitionDuration = this.swiperPorp.time;
				};
				setTimeout(() => {
					this.lock = true;
				}, this.transitionDuration)

			},
			onSwipeLeft: function() { //左滑动
				if(this.lock == false) return;
				this.lock = false;
				this.clearAuto();
				this.leftFunc();
				setTimeout(() => {
					this.lock = true;
				}, this.transitionDuration);
			},
			leftFunc: function() {
				var that = this;
				console.log("this.total=" + this.total);
				if(this.total >= this.imgall.length - 2) {
					this.translateX = -(document.body.clientWidth) * (this.total + 1);
					this.transitionDuration = this.swiperPorp.time;
					this.total = 1;
					var that = this;
					setTimeout(function() {
						that.translateX = -(document.body.clientWidth);
						that.transitionDuration = 0;
					}, this.transitionDuration);
					console.log("yes");
				} else {
					this.translateX = -(document.body.clientWidth) * (this.total + 1);
					this.transitionDuration = this.swiperPorp.time;
					this.total++;
				}
			}
		}

	}
</script>
