import Vue from 'vue';
import Popbox from './popbox.js';
Vue.use(Popbox);


new Vue({
	el: '#app',
	data() {
		return {

		}
	},
	created: function() {

	},
	methods:{
		showPop: function() {
			this.$Message({
//				type:"notice", //消息
//				autoClose:false,//是否自动关闭
				type:"error", //错误提出框
//			type:"sccess",	 //成功提示框
//				type:"tips", //普通提示
//				type:"warning",//警告
//				type:"message",//消息
//				buttonOne:{    //按钮--可以设置两个按钮。
//					text:"确认", //文字
//					color:"#409eff", //按钮背景色
//					callback:function(){  //按钮回调
//						alert("我点击了确认")
//					}
//				},
//				buttonTow:{     //同上
//					text:"取消",
//					color:"#409eff",
//					callback:function(){
//						alert("我点击了取消")
//					}
//				},
				delay:10000, //提示框延迟时间默认3秒
				title: "这是一个测试哦", //弹出框标题---注：提示框无标题
				content: "这是一个测试哦这是一个测试哦这是一个测试哦", //内容
				closeCallback: function() { //关闭回调
				alert("关闭")
				}
			});
		}
	}
})