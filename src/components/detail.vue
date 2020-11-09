<template>
  <div>
	  <el-button  type="primary"  @click="goBack" style="margin: .2rem ">返回</el-button>
    <div class="swiperWrap">
		 <div class="box">
			<div class="title">
				<div style="height: .29rem"></div>
				<div class="titleItem">产品名称</div>
				<div class="titleItem">折射率</div>
				<div class="titleItem">阿贝数</div>
				<div class="titleItem">膜层</div>
				<div class="titleItem">隐形标记</div>
				<div class="titleItem bigTitle">光度范围</div>
				<div class="titleItem" v-if="customPrice">现片价</div>
				<div class="titleItem" v-if="addLightBelow">下加光</div>
				<div class="titleItem">定制价</div>
			</div>
			<div class="title" v-for="(item, index) in swiperList" style="flex:1;height: 4rem;">
				<el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox>
				<div class="titleItem" style="background: #00aaff;color: #fff;">{{item.name}}</div>
				<div class="titleItem" style="background: #bab9bf">{{item.refractive}}</div>
				<div class="titleItem" style="background: #9ba2ab">{{item.abbe}}</div>
				<div class="titleItem" style="background: #bab9bf">{{item.film}}</div>
				<div class="titleItem" style="background: #9ba2ab">{{item.covert}}</div>
				<div class="titleItem bigTitle" style="background: #bab9bf; flex-direction:row;" >
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
				<div class="titleItem" v-if="item.customPrice">{{item.customPrice}}</div>
				<div class="titleItem" v-if="item.addLightBelow" style="background: #9ba2ab">{{item.addLightBelow}}</div>
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
		 this.id = this.$router.history.current.query.id;
		 this.getSwiper();
		 if(window.localStorage.getItem('selectArr')) {
			 this.selectedArr = window.localStorage.getItem('selectArr').split(',');
			 if(this.selectedArr) {
			 	this.disable = this.selectedArr.length >= 3 ? true: false;
			 }
		 }
		 this.$nextTick(() => {
			this.bannerH = document.body.clientHeight * 0.8;
			this.bannerW = document.body.clientHeight * 0.8  / 2 * 3 
		 })     
       },
	   watch: {
		   getSelectNum: function() {
			   this.selectedArr = window.localStorage.getItem('selectArr').split(',');
		   }
	   },
	   mounted() {
		   window.addEventListener('resize', () => {
		     this.setBannerH()
		   }, false);
		   
	   },
      data() {
        return {
          id: '',
					disable: false,
          swiperList: [],
					bannerH: 0,
					bannerW: 0,
					selectedArr: [],
					addLightBelow: false,
					customPrice: false
          }
        },
      methods: {
		  getChooseItem(id,checked) {  
		  	this.swiperList.forEach((item, index) => {
		  		if(item.id == id) {
					item.checked = !checked;
					    if(item.checked) {
							this.selectedArr.push(item.id)
							localStorage.setItem('selectArr', this.selectedArr)
						}else {
							let index = this.selectedArr.indexOf(item.id);
							this.selectedArr.splice(index, 1)
						}
					   this.disable = this.selectedArr.length >= 3 ? true: false;
				}
		  	})
			
			//一个标签里选择两个系列
			// this.disable = this.selectedArr.length >= 3 ? true: false;
		  },
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
		  setBannerH() {
		      this.bannerH = document.body.clientHeight * 0.8
			  this.bannerW = document.body.clientHeight * 0.8 / 2 * 3
		  },
		  
    getSwiper() {
		 this.openFullScreen()
          let param = new FormData();
          param.append('seriesId', this.id);
          axios({
            method: 'post',
            url: '/lightspace/priceclient/findGlassesBySeries',
            data: param
          }).then(this.handleGetSwiperSucc.bind(this)).catch((err) => {
            console.log(err)
          })
        },
        handleGetSwiperSucc(res) {
				this.closeFullScreen(this.openFullScreen())
          if(res.data.status == 200) {
            this.swiperList = res.data.data;
						this.swiperList.forEach((item, index) => {
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
<style lang="stylus"  scoped>
.swiperWrap
	width: 90vw
	height: 80vh
	padding-left: 5%
	padding-right: 5%
	padding-top: 10vh
	background: #fff
    .box
			display: flex
			.title
				font-weight: bold
				width: 1.8rem
				text-align: center
				.titleItem
					margin: .1rem 
					background: #EAEAEA
					height: .2rem
					line-height: .2rem
					font-size: 0.15rem
					border-radius: .05rem
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
