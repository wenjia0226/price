<template>
<div>
	<el-row>
		<el-col :span="6" :offset="9">
			<div class="compare">价格对比</div>
		</el-col>
	</el-row>
	<div class="swiperWrap">
	 <div class="box">
		<div class="conBox" v-for="(item, index) in differentList" style="flex:1;">
			<div class="titleItem" style="background: #00aaff;color: #fff;">{{item.labelName}}</div>
			<div class="titleItem" >{{item.seriesName}}</div>
			<div class="titleItem" style="background: #00aaff;color: #fff;">{{item.name}}</div>
			<div class="titleItem" style="background: #bab9bf">{{item.refractive}}</div>
			<div class="titleItem" style="background: #9ba2ab">{{item.abbe}}</div>
			<div class="titleItem" style="background: #bab9bf">{{item.film}}</div>
			<div class="titleItem" style="background: #9ba2ab">{{item.covert}}</div>
			<div class="titleItem" style="height: 4rem;background: #bab9bf; flex-direction:row;" >
				<div class="leftWrap" style="position: relative" :style="{height: 2.5+ item.photometric1[3] + 'rem'}" >
					<div v-if="item.photometric1.length" style="position: absolute;top: -.2rem;right: 0">{{item.photometric1[0]}}D</div>
					<div v-if="item.photometric2.length" style="position: absolute;right: 0;top: 0.4rem">{{item.photometric2[0]}}D</div>
					<div style="position: absolute;right: 0;top: 0.8rem">0.00D</div>
					<div v-if="item.photometric2.length" style="position: absolute;right: 0" :style="{top: item.photometric2[4] + 'rem'}">{{item.photometric2[2]}}D</div>
					<div v-if="item.photometric3.length" style="position: absolute;right: 0;" :style="{top: item.photometric3[4] + 'rem'}">{{item.photometric3[2]}}D</div>
					<div style="position: absolute;right: 0;top: 2.41rem">{{item.benchmark}}D</div>
					<div v-if="item.photometric1.length" style="position: absolute;right: 0;" :style="{top: 2.4 + item.photometric1[3] + 'rem'}">{{item.photometric1[2]}}D</div>
				</div>
				<div class="centerWrap" style="position: relative">
				<!-- 	参数1 -->
					<div class="box1"></div>
					<div style="width: 2rem;border: 0.01rem solid red;position:absolute;top: 1rem"></div>
					<div class="box2"></div>
					<div style="width: 2rem;border: 0.01rem dotted red;position:absolute;top:2.5rem"></div>
					<div class="triangle" :style="{borderTopWidth:item.photometric1[3] + 'rem'}"></div>
					<!-- 参数二 -->
					<div v-if="item.photometric2.length" class="twoBox" v-bind:style="{height: item.photometric2[3] + 'rem'}"></div>
						<!-- 参数三 -->
					<div v-if="item.photometric3.length" class="threeBox" v-bind:style="{height: item.photometric3[3] + 'rem', top: 0.5 + item.photometric2[3] + 'rem'}"></div>
					<div v-if="item.photometric2.length" style="position: absolute;left: 0.33rem;top: 0.8rem">{{item.photometric2[1]}}D</div>
				</div>
				<div class="leftWrap" style="position: relative" >
						<div v-if="item.photometric1.length" style="position: absolute;left: 0.1rem;top: 0.8rem">{{item.photometric1[1]}}D</div>
				</div>	
			</div>
			<div class="titleItem" style="background: #9ba2ab">{{item.addLightBelow}}</div>
			<div class="titleItem" style="background:  #00aaff;color: #fff;">{{item.customPrice}}</div>
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
			 customPrice: false
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
		if(res.data.data) {
			this.differentList = res.data.data;
			this.differentList.forEach((item, index) => {
				if(item.addLightBelow) {
					this.addLightBelow = true
				} 
				if(item.customPrice) {
					this.customPrice = true
				}
				if(item.photometric2.length) {
					//console.log(item.photometric2)
					item.photometric2[3] = 2 * item.photometric2[2] / item.benchmark;  //高度
					item.photometric2[4] = 2 * item.photometric2[2] / item.benchmark + 0.4; // 距离顶部距离
				}
				
				// 三角形的高度
				if(item.photometric1.length) {
					 item.photometric1[3] = 0.6* item.photometric1[2] / -15
				}
				// 第三个的高度
				if(item.photometric3.length) {
					item.photometric3[3] =  2 * (item.photometric3[2] - item.photometric3[0])  / -15
					item.photometric3[4] = item.photometric3[3] + item.photometric2[3] + 0.4
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
				.titleItem
					margin: 0.1rem 
					background: #EAEAEA
					height: 0.2rem
					line-height: 0.2rem
					font-size: 0.15rem
					border-radius: 0.05rem
					display: flex
					flex-direction: column
					justify-content: center
					align-items: center
				.bigTitle
					height: 4rem
				 .centerWrap
						display:flex
						justify-content: center
						flex-direction: column
						align-items: center
					  .box1
							height: 1rem
							width: 1rem
							background: #00aaff
						.box2
							height: 1.5rem
							width: 1rem
							background:#00aaff
						.triangle  
							border-style: solid;
							border-right-width: 1rem;
							border-bottom-width: 0;
							border-left-width: 0;
							border-color:  #00aaff transparent transparent  transparent;
							width: 0px;
							height: 0px;
					.leftWrap
						height: 3.1rem
					.twoBox
						width: 0.33rem
						background: red
						position: absolute
						left: 0
						top: 0.5rem
					.threeBox
						 width: 0.18rem
						 background: red
						 position: absolute
						 left: 0
</style>
