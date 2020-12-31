<template>
<div>
	<el-row>
		<el-col :span="2" >
		<el-button  type="primary"  @click="goBack" style="margin: .2rem ">返回</el-button>
		</el-col>
		<el-col :span="6" :offset="7" >
			<div style="text-align: center;margin-top: .3rem" >价格对比</div>
		</el-col>
	</el-row>
	<div class="swiperWrap" @dblclick="goBack">
		<div class="box">
			<div class="title">
				<div class="titleItem">产品名称</div>
				<div class="titleItem">折射率</div>
				<div class="titleItem">阿贝数</div>
				<div class="titleItem" v-if="film">膜层</div>
				<div class="titleItem" v-if="covert">隐形标记</div>
				<div class="titleItem" style="height: 3rem">光度范围</div>
				<div class="titleItem" v-if="passageway">通道</div>
				<div class="titleItem" v-if="addLightBelow">下加光</div>
				<div class="titleItem" v-if="presentPrice">现片价</div>
				<div class="titleItem" v-if="customPrice">定制价</div>
				<div class="titleItem" v-if="polarizing">偏光价</div>
				<div class="titleItem" v-if="pricepol">偏光定制价</div>
				<div class="titleItem" v-if="bluray">蓝光片价</div>
			</div>
			<div class="title" style="flex:1;height: 4rem;"v-for="(item, index) in differentList">
			<!-- 	<el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox> -->
				<div class="titleItem" style="background: #00b9ed;color: #fff;">{{item.name}}</div>
				<div class="titleItem" style="background: #efefef">{{item.refractive}}</div>
				<div class="titleItem" style="background:#c9c9c9">{{item.abbe}}</div>
				<div class="titleItem" style="background: #efefef" v-if="film">{{item.film}}</div>
				<div class="titleItem" style="background: #c9c9c9" v-if="covert">{{item.covert}}</div>
				<div  class="titleItem" style="height: 3rem;background: #efefef">
					<el-image :src="item.picture" fit="contain"></el-image>
				</div>
				<div class="titleItem" v-if="passageway">{{item.passageway}}</div>
				<div class="titleItem" v-if="item.addLightBelow">{{item.addLightBelow}}</div>
				<div class="titleItem" v-if="item.presentPrice"style="background: #66c6e9">{{item.presentPrice}} </div>	
				<div class="titleItem" v-if="item.customPrice" style="background: #66c6e9">{{item.customPrice}}</div>
				<div class="titleItem" v-if="polarizing" style="background: #66c6e9">{{item.polarizing}}</div>
				<div class="titleItem" v-if="pricepol" style="background: #66c6e9">{{item.pricepol}}</div>
				<div class="titleItem" v-if="bluray" style="background: #66c6e9">{{item.bluray}}</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from 'axios'
export default {
   created() {
    this.one = this.$router.history.current.query.one;
    this.two = this.$router.history.current.query.two;
		if(this.$router.history.current.query.three)
		 {
			 this.three = this.$router.history.current.query.three;
		 }
	this.concatNum = this.one + ','+  this.two + ','+  this.three;
	this.getDifferent()
	},
   data() {
	   return {
		   one: '',
		   two: '',
		   three: '',
		   concatNum: '',
		   differentList: [],
			 addLightBelow: false,
			 customPrice: false,
			 presentPrice: false,
			 polarizing: false,
			 passageway: false,
			 pricepol: false,
			 bluray: false,
			 film: false,
			 covert: false
	   }
   },
   methods: {
	   goBack() {
	     window.close()
	   },
	   //加载转圈
	   openFullScreen() {
	     const loading = this.$loading({
	     lock: true,
	     text: 'Loading',
	     spinner: 'el-icon-loading',
	     background: 'rgba(0,0,0,0.7)'
	     })
	     return loading;
	   },
	   closeFullScreen(loading) {
	     loading.close()
	   },
	getDifferent() {
		this.openFullScreen()
      let param = new FormData();
      param.append('glasses', this.one + ',' + this.two + ','  + this.three);
      axios({
        method: 'post',
        url: '/lightspace/priceclient/contrastGlasses',
        data:param
       }).then(this.handleGetDiffrentSucc.bind(this)).catch((err) => {console.log(err)})
	 },
	handleGetDiffrentSucc(res) {
		this.closeFullScreen(this.openFullScreen())
		if(res.data.status == 200) {
		    this.differentList = res.data.data;
				this.differentList.forEach((item, index) => {
					item.disable = false;
					if(!item.film) {
							item.film = '无'
					}
					if(!item.covert) {
							item.covert = '无'
					}
					if(!item.addLightBelow) {
						item.addLightBelow = '无'
					} 
					if(!item.customPrice) {
						item.customPrice = '无'
					}
					if(!item.presentPrice) {
						item.presentPrice = '无'
					}
					if(!item.polarizing) {
						item.polarizing = '无'
					}
					if(!item.passageway) {
						item.passageway = '无'
					}
					if(!item.pricepol) {
						item.pricepol = '无'
					}
					if(!item.bluray) {
						item.bluray = '无'
					}
					if(item.film) {
							this.film = true
					}
					if(item.covert) {
							this.covert = true
					}
					if(item.addLightBelow) {
						this.addLightBelow = true
					} 
					if(item.customPrice) {
						this.customPrice = true
					}
					if(item.presentPrice) {
						this.presentPrice = true
					}
					if(item.polarizing) {
						this.polarizing = true
					}
					if(item.passageway) {
						this.passageway = true
					}
					if(item.pricepol) {
						this.pricepol = true
					}
					if(item.bluray) {
						this.bluray = true
					}
					
					})			
		}
	 }
 }
}
</script>

<style lang='stylus' scoped>
	.swiperWrap
		width: 90vw
		height: 80vh
		padding-left: 5%
		padding-right: 5%
		padding-top: 10vh
		background: #fff
		.box
			display: flex
			font-weight: bold
		 .title
				font-weight: bold
				width: 1.8rem
				text-align: center
			 .conBox
					flex: 1
				 .titleItem
						display: flex
						margin: 0.1rem 
						background: #e5e5e5
						height: 0.3rem
						line-height: 0.3rem
						font-size: 0.15rem
						border-radius: 0.1rem
						flex-direction: column
						justify-content: center
						align-items: center
						padding: 0.2rem
						box-sizing: border-box
						.topWrap
						 .centerWrap
								display:flex
								justify-content: center
								flex-direction: column
								align-items: center
								.box1
									height: 1rem
									width: 1rem
									background: #a2daee
								.box2
									height: 1.5rem
									width: 1rem
									background:#a2daee
								.triangle  
									border-style: solid;
									border-right-width: 1rem;
									border-bottom-width: 0;
									border-left-width: 0;
									border-color: #a2daee transparent transparent  transparent;
									width: 0px;
									height: 0px;
								.des
									height: 0.2rem
									line-height: 0.2rem
									font-size: 0.14rem
							.leftWrap
								height: 3.1rem
								.num
									height: 1rem
									padding-top: .75rem
									box-sizing: border-box
								.num1
									height: 1.5rem
									padding-top: 1.2rem
									box-sizing: border-box
								.num2
									flex: 1
									padding-top: .5rem
									box-sizing: border-box
							.twoBox
								width: 0.33rem
								background: #00b8ec
								position: absolute
								left: 0
								top: 1.01rem
							.twoTopBox
									position: absolute;
									left: 0;
									width: 0.33rem
									background: #00b8ec
							.threeBox
								 width: 0.18rem
								 background: #00b8ec
								 position: absolute
								 left: 0
						.bottomWrap
							margin-top: 0.1rem
							.des
								height: 0.2rem
								line-height: 0.2rem
				.titleItemSecond
					margin: .1rem
					background: #e5e5e5
					height: 0.2rem
					line-height: 0.2rem
					font-size: 0.15rem
					border-radius: .05rem
					display: flex
					justify-content: center
					align-items: center
					.secondCenterWrap
						.secondBox1
							width: 1rem
							height: 1rem
							background: #00b8ec
						.secondBox2
							width: 1rem
							height: 0.8rem
							background: #00b8ec;
						.smBox1
							width: 0.3rem
							height: 1rem;
							background: #00b8ec;
						.secondTrigger
							border-style: solid;
							border-width: 0px 100px 50px 0;
							border-color:transparent transparent #00b8ec;
							width: 0px;
							height: 0px;
						.mask1
							width: 63px;
							height: 0;
							border-top: 33px solid #00b8ec;
							border-right: 37px solid transparent;
						.mask2
							width: 63px;
							height: 0;
							border-bottom: 33px solid #00b8ec;
							border-right: 37px solid transparent; 
				.titleItemThird
					margin: .1rem
					background: #e5e5e5
					height: 5rem
					line-height: 0.2rem
					font-size: 0.15rem
					border-radius: .05rem
					display: flex
					justify-content: center
					align-items: center
				 .thirdCenter
					 .thirdBox
							height: 2.5rem
							width: 1rem
							background: #00b8ec
	</style>
