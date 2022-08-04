<template>
  <view>
    <view class="uni-margin-wrap">
      <view class="warp-info" v-for="item in alarmList" :key="item.id">
       <!-- <image class="image" mode="scaleToFill" :src="item.bannerFileUrl" /> -->
			<view class="item">
				<view class="item_row">告警名称：{{item.alarmTitle}}</view>
				<view class="item_row">告警类型：{{item.alarmTypeName}}</view>
			</view>
			<view class="item">
				<view class="item_row">告警区域Id：{{item.precinctId}}</view>
				<view class="item_row">告警地址：{{item.address}}</view>
			</view>
			<view class="item">
				<view class="item_row">告警时间：{{item.alarmTime}}</view>
			</view>
			<view class="booter">
				<button size="mini" @click="approve(item)">处置</button>
			</view>
		
      </view>
    </view>
	<view style="text-align: center;font-size: 30rpx;">
		<span>暂无数据</span>
	</view>
<!--    <view class="submit" @click="goEmergencyCoures">
      <button>确认</button>
    </view> -->
  </view>
</template>
<script>
// import api from "@/utils/request.js"
export default {
  data() {
    return {
	  alarmList:[],
	  pageNum:1,
	  pageSize:5,
	  isNodata: false
    };
  },
  onShow() {
	  this.alarmList= []
	  this.getList()
  },
  // 我的页面  
  onLoad(){  
		// 监听事件  
		uni.$on('callBack',()=>{  
		this.alarmList= []
		this.pageNum= 1
		this.getList()
		})  
	},
  onUnload() {
	  // 移除监听事件  
	   uni.$off('callBack');  
  },
  onReachBottom: function() {
	// 下拉懒加载
	++this.pageNum;
	this.getList()
	},
	//监听下拉刷新
	onPullDownRefresh() {
		this.alarmList= []
		this.pageNum= 1
		this.getList()
		setTimeout(()=>{
			uni.stopPullDownRefresh();//关闭刷新状态
		},2000);	
	},
  methods: {
	getList(){
		let data={
			pageNum:this.pageNum,
			pageSize:this.pageSize,
			step: '02'
		}
		if(!this.isNodata){
			this.$http.alarmList(data).then((res) => {
				this.alarmList = this.alarmList.concat(res.data.list)
				if(res.data.list && res.data.list.length===0){
				  this.isNodata= true
				}
			});
		}
	},
    approve: function (item) {
		uni.navigateTo({
		  url: "/pages/addInfo/addInfo?data="+ encodeURIComponent(JSON.stringify(item)),
		});
	},
  },
};
</script>

<style lang="scss" scoped>
.uni-margin-wrap {
  width: 100%;
  width: 100%;
}
.warp-info {
  margin: 20rpx;
  padding: 8rpx 0 0 0;
  // border: 1rpx solid #E3E3E3;
  // height:420rpx;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px rgba(100, 100, 100, 0.1);
  
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
  .booter {
	margin-right:20rpx;
	// margin-bottom:20rpx;
	flex:1;
	text-align: right;
  }
	.booter button {
	  // height: 50rpx;
	  // line-height: 50rpx;
	  font-size: 30rpx;
	  background-color: #027aff;
	  color: #fff;
	}
}

.image {
  width: 100%;
  height: 350rpx;
}
.submit {
  margin: 30rpx 20rpx;
}
.submit button {
  height: 120rpx;
  line-height: 120rpx;
  background-color: #027aff;
  color: #fff;
}

</style>
