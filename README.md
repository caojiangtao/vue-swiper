## vueSwiper
一个走马灯效果

## install

npm install vueswiper007
## Usage

``` 

import Vue from 'vue';
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})//需要先使用vue-touchs
import Swiper from 'vueswiper007'
new Vue({
    el: 'body',
    components: {Swiper},
    data(){
    return{
    swiperdata:{
		"title": "swiper-list",
		"list": [{
			"name": "流年似水",
			"href": "http://mp3.flash127.com/music/30351.mp3",
			"tag":"华语/音乐",
			"content":"这是哎呦不错哦行榜的最好听的手歌曲",
			"src": "../../static/img/one.jpg"
		}
	]},
    	porp:{
			time:2000, //切换时间
			loop:true, //是否循环自动播放
			delay:3000,//延迟时间
			height:300, //高度
			background:'orange' //背景色
		}
    }}
    
});

<Swiper :pics='swiperdata' :swiperPorp='porp' ></Swiper>

```


