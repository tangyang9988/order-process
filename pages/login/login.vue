<template>
  <view class="content">
    <view class="login_image">
      <image
        mode="scaleToFill"
        @click="previewImg(0)"
        src="@/static/login/login.png"
      />
    </view>
    <view class="login_title">闭环管理平台</view>
    <view class="login_en">CLOSED LOOP MANAGEMENT PLATFORM</view>
<!--    <view class="content_message_success"
      ><image mode="scaleToFill" src="@/static/login/rightLogin3x.png" /><text
        class="message_success"
        >申请获得您的公开信息（昵称、头像等）</text
      ></view
    > -->
	<view class="login-form">
		<view class="login-form-items">
			<view class="login-form-items-title">用户名:</view>
			<input type="text" class="login-input" v-model="userName" placeholder="请输入用户名"/>
			<!-- <input type="text" class="login-input" placeholder="请输入用户名" />	 -->
		</view>
		<view class="login-form-items">
			<view class="login-form-items-title">密码:</view>
			<input type="password" class="login-input" v-model="userPassword" placeholder="请输入密码" />
		</view>
	</view>
    <view class="submit">
      <button @click="login()">
<!--        <image
          mode="scaleToFill"
          src="@/static/login/wechat3x.png"
        /> -->
		登录
      </button>
    </view>
<!--    <view class="tab_icon">
      <view class="tab_icon_all" style="position: relative; left: 30rpx">
        <view
          ><image
            mode="scaleToFill"
            @click="previewImg(0)"
            src="@/static/login/green.png"
        /></view>
        <view>车辆事故</view>
      </view>
      <view class="tab_icon_all">
        <view
          ><image
            mode="scaleToFill"
            @click="previewImg(0)"
            src="@/static/login/orange.png"
        /></view>
        <view>车辆事故</view>
      </view>
      <view class="tab_icon_all" style="position: relative; right: 30rpx">
        <view
          ><image
            mode="scaleToFill"
            @click="previewImg(0)"
            src="@/static/login/blue.png"
        /></view>
        <view>车辆事故</view>
      </view> -->
    </view>
  </view>
</template>
<script>
// import api from "../../request/request.js"
export default {
  data() {
    return {
		userName:'',
		userPassword:''
      // indicatorDots: true,
      // autoplay: true,
      // interval: 4000,
      // duration: 500,
    };
  },

  methods: {
    login: function () {
		let req = {
				username:this.userName,
				password: this.userPassword,
				verifyCode:"1",
				verifyKey:'2222'
		};
		uni.request({
			url:"https://mbh.kdisi.com:8200/system/login",
			method:"POST",
			data:req,
			success: (res) => {
				if(res.data.code=== 0){//如果请求失败,不等于200状态码
                    setTimeout(() => { // setTimeout处理了showToast和showLoading冲突的问题
                        uni.showToast({
                            title: "登录成功！",
                            icon: "none",
                            duration: 1000
                        });
                    }, 0);
					//数据请求成功
					uni.navigateTo({
					  url: "/pages/index/index",
					});
					uni.setStorageSync("token", res.data.data.token);
					uni.setStorageSync("username", this.userName);
				}else{
					setTimeout(() => { // setTimeout处理了showToast和showLoading冲突的问题
						uni.showToast({
							title: "登录失败!",
							icon: "none",
							duration: 1000
						});
					}, 0);
				}
			},
			fail:(error)=>{
				setTimeout(() => { // setTimeout处理了showToast和showLoading冲突的问题
					uni.showToast({
						title: error.res,
						icon: "none",
						duration: 2000
					});
				}, 0);
			}
		})
      
      // this.$http.login(req).then((data) => {

      // });
    },
    previewImg: function () {
      uni.navigateTo({
        url: "/pages/rescue/rescueAdd",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  // text-align: center;
  // padding: 20rpx;
}
.login-form {
	margin: 20px 10px 20px 15px;
	background: #FFFFFF;
	font-size: 34rpx;

	.login-form-items {
		padding: 15px 10px;
		border-bottom: 1px solid #F3F4F5;
		position: relative;
		display: -webkit-flex;
		display: flex;
		justify-content: flex-start;
		width: 100%;

		.login-form-items-title {
			width: 20%;
			line-height: 22px;
			height: 22px;
			flex-shrink: 0;
		}

		.login-input {
			width: 100%
		}

		img {
			width: auto;
			height: auto;
			max-width: 100%;
			max-height: 100%;
		}
	}
}
.login_image {
  text-align: center;
  margin: 0 auto;
  margin-top: 100rpx;
  image {
    width: 160rpx;
    height: 140rpx;
  }
}
.login_title {
	text-align: center;
  font-size: 54rpx;
  font-weight: bold;
  padding-top: 38rpx;
  color: rgba(0, 0, 0, 0.8);
}
.login_en {
	text-align: center;
  font-size: 22rpx;
  padding-top: 10rpx;
  color: rgba(0, 0, 0, 0.2);
}
.content_message_success {
  text-align: center;
  padding: 20% 0 0 40rpx;
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  color: rgba(0, 0, 0, 0.4);
  font-family: "思源黑体 CN Medium";
  font-size: 28rpx;
  align-items: center;
}
.content_message_success image {
  text-align: center;
  padding-right: 6rpx;
  width: 32rpx;
  height: 32rpx;
}
.submit {
  margin: 20rpx 20rpx;
  border-radius: 8rpx;
}
.submit button {
  background-color: #1bac1a;
  color: #ffffff;
  height: 100rpx;
  line-height: 100rpx;
  font-size: 36rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  image {
    width: 48rpx;
    height: 40rpx;
    padding-right: 20rpx;
  }
}
.tab_icon {
  display: flex;
  position: fixed;
  bottom: 150rpx;
  background: rgb(248, 248, 248);
  width: 100%;
}
.tab_icon_all {
  flex: 1;
  image {
    width: 80rpx;
    height: 80rpx;
  }
  view {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.6);
  }
}
</style>


<style lang="scss">
	page {
		background: #F4F5F6;
	}

	.login {
		.content-wrapper {
			width: 100%;

			.title {
				margin-top: 35rpx;
				width: 100%;
				margin-bottom: 10px;

				h1 {
					border: 0px;
					width: 50%;
					margin: 0 auto;
					text-align: center;
					border-bottom: 1px solid #E3E3E3;
					height: 50px;
					line-height: 50px;
					font-size: 17px;
					overflow: hidden;
					font-weight: 400;
				}
			}

			.login-form {
				margin: 20px 10px 20px 15px;
				background: #FFFFFF;

				.login-form-items {
					padding: 15px 10px;
					border-bottom: 1px solid #F3F4F5;
					position: relative;
					display: -webkit-flex;
					display: flex;

					.login-form-items-title {
						width: 30%;
						line-height: 22px;
						height: 22px;
						flex-shrink: 0;
					}

					.login-input {
						width: 100%
					}

					img {
						width: auto;
						height: auto;
						max-width: 100%;
						max-height: 100%;
					}
				}
			}
		}

		.submit-wrapper {
			padding: 10px;
			padding-top: 10px;
		}

	}
</style>
