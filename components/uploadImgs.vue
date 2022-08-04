
<template>
	<view class="container">
		<view class="image-content">
			<view class="list-item" v-for="(item,key) in Images">
				<image class="imgs" :src="item" @click="refundPicPreView(item)" />
				<image class="closePic" src="../static/login/close.png" @click="deleteImg(key)" />
			</view>

			<view class="list-item" @click="uploadImg">
				<image class="imgs" :src="defaultImg" />
			</view>
		</view>
		<view class="small">最多可以上传 1 张图片</view>
	</view>
</template>

<script>
	import defaultImg from '../static/login/upload.png'
	import utils from '@/utils/utils.js'
	export default {
		name: 'uploadImgs',
		props: {
			defaultImg: {
				type: String,
				default: defaultImg,
			}
		},

		data() {
			return {
				Images: [],
				maxlenth: 1,
				isChoose: false
			}
		},
		methods: {
			uploadImg() {
				var that = this;
				if (that.Images.length >= that.maxlenth) {
					that.showToast("最多可以上传 " + that.maxlenth + " 张图片");
					return;
				}
				// if (that.isChoose === true) {
				// 	that.showToast("图片上传中...");
				// 	return ;
				// }
				that.isChoose = true;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: async (res) =>{
						that.Images.push(res.tempFilePaths[0]),
						uni.$emit("imgBack",res.tempFilePaths[0])
					}
				});
				// uni.chooseImage({
				// 	// count: that.maxlenth - that.Images.length, // 选择数量限制
				// 	sizeType: ['original', 'compressed'], // 原图、压缩图
				// 	sourceType: ['album', 'camera'], // 相册、拍照选择
				// 	success: async (res) => {
				// 		// console.log(‘img’,res)
				// 		const tempFilePaths = res.tempFiles;
				// 		uni.showLoading({
				// 			title: '图片上传中...'
				// 		});
				// 		for (var i = 0; i < tempFilePaths.length; i++) {
				// 			uni.uploadFile({
				// 				url: that.$host + 'api/common/upload',
				// 				filePath: tempFilePaths[i].path,
				// 				name: 'file',
				// 				header: {
				// 					'Content-Type': 'multipart/form-data',
				// 					'token': uni.getStorageSync('token')
				// 				},
				// 				success: function(res) {
				// 					const Upres = JSON.parse(res.data)
				// 					if (Upres.code == 1) {
				// 						that.Images.push(Upres.data.fullurl);
				// 					}
				// 				},

				// 			});
				// 		}
				// 		uni.hideLoading();
				// 		setTimeout(() => {
				// 			that.$emit('upload', {
				// 				images: that.Images
				// 			})
				// 		}, 200)
				// 	},
				// 	complete () {
				// 		that.isChoose = false;
				// 	}
				// })
			},
			//删除图片
			deleteImg(key) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '您确定要删除这张图片吗',
					success: (res) => {
						if (res.confirm) {
							that.Images.splice(key, 1);
							that.isChoose = false;
							setTimeout(() => {
								that.$emit('upload', {
									images: that.Images
								})
							}, 200)
						}
					}
				})
			},
			// 预览图片
			refundPicPreView(currentImage) {
				uni.previewImage({
					current: currentImage,
					urls: this.Images
				})
			},
			// showToast 提示框
			showToast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					position: 'top'
				})
			}
		},
	}
</script>
<style>
	.container{
		border: 1px solid #EFEFEF;
		border-radius: 10rpx;
	}
	.list-item {
		position: relative;
		padding: 10rpx;
	}

	.imgs,
	.list-item {
		width: 120rpx;
		height: 120rpx;
	}

	.image-content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
	}

	.closePic {
		width: 34rpx;
		height: 34rpx;
		position: absolute;
		z-index: 99;
		top: 0;
		right: 0;
	}

	.small {
		font-size: 24rpx;
		color: rgb(0, 0, 0, 0.5);
		/* color: #EFEFEF; */
		text-align: right;
	}
</style>


