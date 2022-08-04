<template>
	<view class="container">
		<view class="new-list-item">
			<view style="display: flex;">
				<view class="title_left_line"></view>
				 <view class="title">告警信息</view>
			</view>
			<view class="warp-info">
			<view class="item">
				<view class="item_row">告警名称：{{detailObj.alarmTitle}}</view>
				<view class="item_row">告警类型：{{detailObj.alarmTypeName}}</view>
			</view>
			<view class="item">
				<view class="item_row">告警区域Id：{{detailObj.precinctId}}</view>
				<view class="item_row">告警地址：{{detailObj.address}}</view>
			</view>
			<view class="item">
				<view class="item_row">告警时间：{{detailObj.alarmTime}}</view>
			</view>
			<view class="item">
				<view class="item_row">告警图片：
					<image :src="detailObj.alarmUrl" style="width:120rpx;height:120rpx;"  mode="aspectFill" @click="preview(detailObj.alarmUrl)"></image>
				</view>
			</view>
			</view>
		</view>
		<view class="new-list-item">
			<view style="display: flex;">
				<view class="title_left_line"></view>
				 <view class="title">告警处置</view>
			</view>
			<view>
				<uploadImgs @upload="upload"></uploadImgs>
			</view>
	<radio-group @change="conclusionChange" v-model="radioValue" class="labelbox" style="margin:20rpx 10rpx;">
		<label class="radio">
			<radio value="完成" :checked="conclusionRadio==0" /> 完成
		</label>
		<label class="radio" style="margin-left: 20px;">
			<radio value="未完成" :checked="conclusionRadio==1" /> 未完成
		</label>
	</radio-group>
			<view>
				<!-- <input type="text" class="" v-model="form.advice" placeholder="请输入用户名"/> -->
			<textarea class="login-input" v-model="form.advice" placeholder="请输入备注"></textarea>
			</view>
		</view>
		<view class="new-list-item">
			<button type="primary" @click="confirm">提交</button>
		</view>
	</view>
</template>

<script>
	import uploadImgs from '@/components/uploadImgs.vue'
	export default {
		components: {
			uploadImgs,
		},
		data() {
			return {
				conclusionRadio:0,
				radioValue:"完成",
				isLoad: false,
				form: {
					images: '',
					advice:''
				},
				detailObj: {},
				imageHandle:''
			}
		},
		onLoad(option){
		uni.$on('imgBack',(img)=>{
			this.imageHandle= img
		})  
		 this.detailObj =JSON.parse(decodeURIComponent(option.data))
		 
		},
	  onUnload() {
		  // 移除监听事件  
		   uni.$off('imgBack');  
	  },
		methods: {
			conclusionChange(e){
				this.radioValue = e.detail.value
				console.log(this.radioValue)
			},
		preview(e) {
			let array = [];
			array.push(e);
			uni.previewImage({
				urls: array,
				current: array[0]
			});
		},
			//获取子组件的图片url
			upload(e) {
				this.form.images = e.images.join(',');
			},
			confirm() {
				if(this.form.advice==='' || this.imageHandle ===''){
					uni.showToast({
							title: '图片、备注为必填信息！',
							icon: "none",
							duration: 1500
						});
					return
				}
				let data={
					id:this.detailObj.id,
					finish:uni.getStorageSync("username"),
					finishTime:this.dateTimeStr('y-m-d h:i:s'),
					step:"03" , //已处理  必填
					resultInfo: this.radioValue+"#"+this.form.advice, //处理结果内容
					imageHandle: this.imageHandle ,//处理的离线图片
				}
				// this.$http.approveAdvice(data).then((res) => {
				// 	if(res.code===0){
				// 		uni.$emit("callBack")
				// 	}
				// 	setTimeout(() => { // setTimeout处理了showToast和showLoading冲突的问题
				// 		uni.showToast({
				// 			title: res.msg,
				// 			icon: "none",
				// 			duration: 1000
				// 		});
				// 	}, 0);
				// });
				
				uni.request({
				  url: 'https://mbh.kdisi.com:8200/system/alarm/edit',
					method:'PUT',
					data: data,
					header: {
						'Authorization': "Bearer " + uni.getStorageSync("STATE_KEY"),
						'content-type': "application/x-www-form-urlencoded",
					},
					success: (res) => {
						setTimeout(() => {
							uni.showToast({
								title: res.data.data,
								icon: "none",
								duration: 2000
							});
						}, 0);
					// uni.navigateBack({
					// 		delta:1,//返回层数，2则上上页
					// })
					uni.navigateTo({
					  url: "/pages/index/index",
					});
					// uni.$emit("callBack")
					}
				}); 
			},
			dateTimeStr(str){
				var date = new Date(),
				year = date.getFullYear(), //年
				month = date.getMonth() + 1, //月
				day = date.getDate(), //日
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(), //时
				minute = date.getMinutes() < 10 ? date.getMinutes() : date.getMinutes(), //分
				second = date.getSeconds() < 10 ? date.getSeconds() : date.getSeconds(); //秒
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				hour >= 0 && hour <= 9 ? hour : "";
				minute >= 0 && minute <= 9 ? (minute = "0" + minute) : "";
				second >= 0 && second <= 9 ? (second = "0" + second) : "";
				if(str.indexOf('y') != -1){
					str = str.replace('y', year)
				}
				if(str.indexOf('m') != -1){
					str = str.replace('m', month)
				}
				if(str.indexOf('d') != -1){
					str = str.replace('d', day)
				}
				if(str.indexOf('h') != -1){
					str = str.replace('h', hour)
				}
				if(str.indexOf('i') != -1){
					str = str.replace('i', minute)
				}
				if(str.indexOf('s') != -1){
					str = str.replace('s', second)
				}
				return str;
			}
		},

	}
</script>

<style lang="scss" scoped>
.warp-info {
  // border: 1rpx solid #E3E3E3;
  // height:420rpx;
  
  .item{
	  display: flex;
	  flex-wrap: nowrap;
	  justify-content: space-between;
	  margin: 20rpx;  
	  font-size: 35rpx;
	  .item_row{
		  width:100%;
		  margin: 10rpx 0;
		  font-size: 30rpx;
		  color:grey;
	  }
}
}
	.container {
		padding: 20rpx;
	}

	.new-list-item {
		margin: 20rpx 0;
		font-size: 34rpx;
		padding-bottom: 20rpx;
	}

	.title {
		margin-left:15rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 36rpx !important;
	}
	.title_left_line{
		height: 50rpx;
		line-height: 50rpx;
		width: 10rpx;
		margin-top:10rpx;
		background-color: #027aff;
	}
	.login-input{
		background: #FFFFFF;
		height: 200rpx;
		width:100%;
		border-radius: 10rpx;
		margin:0 10rpx;
	}
	
</style>