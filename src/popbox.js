import './popbox.scss';
var popbox = {};
popbox.popall = []; //pop列表
popbox.key = 0; //实例key值
popbox.notifyOffsetTop = 16; //首个通知距离浏览器顶部高度
popbox.install = function(Vue, options) {
	Vue.prototype.$Message = (tips) => {
		let opt = {
			delay:3000,     //延迟关闭时间控制
			type: "message",//默认类型
			buttonOne: null,	//按钮1
			buttonTow: null, //按钮2
			title: "这是插件的头部",
			content: "这是插件的内容",
			closeCallback: function() {
				return false;
			}
		};
		for(let property in tips) {
			opt[property] = tips[property]
		}
		var initTemplate;
		switch(opt.type) {
			case 'tips':
				initTemplate = `<transition  name="tips"   v-on:after-leave="afterLeave"><div  ref="poptips" id="pop-tips" v-if="isShow"><i></i><p>${opt.content}</p></div></transition>`;
				break;
			case 'warning':
				initTemplate = `<transition  name="tips"   v-on:after-leave="afterLeave"><div  ref="poptips" id="pop-tips" class="pop-warning" v-if="isShow"><i></i><p>${opt.content}</p></div></transition>`;
				break;
			case 'success':
				initTemplate = `<transition  name="tips"  v-on:after-leave="afterLeave"><div  ref="poptips" id="pop-tips" class="pop-sccess" v-if="isShow"><i></i><p>${opt.content}</p></div></transition>`;
				break;
			case 'error':
				initTemplate = `<transition  name="tips"   v-on:after-leave="afterLeave"><div  ref="popnotice" id="pop-tips" class="pop-error" v-if="isShow"><i></i><p>${opt.content}</p></div></transition>`;
				break;
			case 'notice':
				initTemplate = `<transition  name="notice" v-on:enter="afterEnter" v-on:after-leave="afterLeave(${popbox.key})">
					<div ref="poptips"  class="pop-notice" v-if="isNotice" v-bind:style="{top:noticeHeight+'px'}">
					<span class='close' v-on:click='closebox()'></span>
					<p>
						${opt.content}
					</p>
					</div>
				</transition>`;
				break;
			case 'message':
				if(opt.buttonOne != null) {
					if(opt.buttonOne.color != undefined) {
						var mycolor = "#fff";
					}
					var mybuttonOne = `<span  v-on:click='buttonOneFunc' class='pop-button' style='background:${opt.buttonOne.color};color:${mycolor}'>${opt.buttonOne.text}</span>`;
				} else {
					var mybuttonOne = "";
				};
				if(opt.buttonTow != null) {
					if(opt.buttonTow.color != undefined) {
						var mycolor = "#fff";
					}
					var mybuttonTow = `<span v-on:click='buttonTowFunc' class='pop-button'>${opt.buttonTow.text}</span>`;
				} else {
					var mybuttonTow = "";
				};
				initTemplate = `<transition name='popfade'>
							<div id='popupbc-mask' v-if='popshow' v-bind:style='styleObject'>
								<div class='popup-box' v-bind:style='popboxPosition'>
									<h3>${opt.title}</h3>
									<p>${opt.content}</p>
									<span class='close' v-on:click='closebox()'></span><div class="bottombox">` + mybuttonOne + `` + mybuttonTow + `</div>
									
								</div>
							</div>
						</transition>`;
				break;
		}
		let popTpl = Vue.extend({
			template: initTemplate,
			data() {
				return {
					key: 0,
					noticeHeight: popbox.notifyOffsetTop,
					marginLeft: 0,
					isNotice: false, //notice 显示、删除
					isShow: false, //tips显示、删除
					popshow: false, //message 显示、删除
					styleObject: {
						height: 0
					},
					popboxPosition: {
						left: document.documentElement.clientWidth / 2 - 150 + "px",
						top: document.documentElement.clientHeight / 2 - 75 + "px"
					}
				}
			},
			updated: function() {
				this.$nextTick(() => {
				})
			},
			watch: {
				noticeHeight: function(val, oldVal) {
				}
			},
			created: function() {
			},
			mounted: function() {
				this.$nextTick(() => {
					this.popshow = true;
					this.styleObject.height = document.body.scrollHeight + "px";
					this.isShow = true;
					this.isNotice = true;
					setTimeout(() => {
						this.isShow = false;
					}, opt.delay);
					if(opt.autoClose) {
						setTimeout(() => {
							this.isNotice = false;
						}, opt.delay);
					}

				})
			},
			methods: {
				closebox: function() { //点圆点关闭回调
					opt.closeCallback();
					this.popshow = false;
					this.isNotice = false;
				},
				buttonOneFunc: function() {
					opt.closeCallback();
					this.popshow = false;
					if(opt.buttonOne != null) {
						opt.buttonOne.callback();
					}
				},
				buttonTowFunc: function() {
					opt.closeCallback();
					this.popshow = false;
					if(opt.buttonTow != null) {
						opt.buttonTow.callback();
					}
				},
				afterEnter: function() {
					if(this.isNotice) {
						popbox.notifyOffsetTop += this.$refs.poptips.offsetHeight + 16;
					}

				},
				afterLeave: function(_key) {
					this.popshow = false;
					if(typeof(_key)=="number"){
						popbox.notifyOffsetTop = 16;
						var instanceArr = popbox.popall.filter(item => item.key !== _key); //清除对应数据
						instanceArr.forEach(function(item) {
							item.noticeHeight = popbox.notifyOffsetTop;
							popbox.notifyOffsetTop += item.$el.offsetHeight + 16;
						});
						popbox.popall = instanceArr;
					}
				}

			}
		});

		let tpl = new popTpl();
		tpl.key = popbox.key;
		tpl.vm = tpl.$mount();
		document.body.appendChild(tpl.vm.$el);
		if(!tpl.isShow){
			popbox.popall[popbox.key] = tpl;
			popbox.key++;
		}
	}
}
module.exports = popbox;