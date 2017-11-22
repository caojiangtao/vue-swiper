## Vue-popbox

一个多功能能弹出框插件

## popbox 有哪些功能

* 消息---可设置自动关闭或者手动关闭 关闭回调
* 提示--- 一般性提示，成功，失败，警告，错误 无回调
* 弹出框---可设置2个或0个按钮 有回调函数
## 使用方式

var popbox = require('popbox');
Vue.use(popbox);

```
<div id="app">
	<button v-on:click="showPop"> Toggle </button>
</div>
<script>
var popbox = require('popbox');
Vue.use(popbox);
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
//				type:"error", //错误提出框
//			type:"success",	 //成功提示框
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
</script>

```
| 功能           | type         | 自动关闭              | 延迟时间        | title |   content   | 关闭回调     |  buttonOne|buttonTow|
| --------------|:-------------:| --------------------:|---------------:|------:|-------------:|------------:|---------:|--------:|
|  消息         | notice        | autoClose：true/false |delay:[number]  | no   |    [String]  |   closeCallback | no    | no|
|   成功提示    | success      |   yes                  |delay:[number]  |  no   |  [String]   | no           |  no      |   no      |
|   错误提示    | error        |   yes                  |delay:[number]  |  no   |  [String]   | no           | no      | no      |
|   警告提示    | warning      |   yes                  |delay:[number]  |  no   |  [String]   | no           | no      | no      |
|   普通提示    | tips         |   yes                  |delay:[number]  |   no  |  [String]   | no           | no      | no      |
|   弹出框    | message        |   no                   |no              |[String]| [String]   | closeCallback|   yes   |   yes    |

###  提示框如下
![消息提示框](http://ohcm6uzn6.bkt.clouddn.com/111.png)
![消息提示框](http://ohcm6uzn6.bkt.clouddn.com/222.png)
![消息提示框](http://ohcm6uzn6.bkt.clouddn.com/333.png)
![消息提示框](http://ohcm6uzn6.bkt.clouddn.com/444.png)




