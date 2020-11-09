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
				<div class="titleItem" style="height: 5rem">光度范围</div>
				<div class="titleItem" v-if="customPrice">现片价</div>
				<div class="titleItem" v-if="addLightBelow">下加光</div>
				<div class="titleItem">定制价</div>
			</div>
			<div class="title" v-for="(item, index) in swiperList" style="flex:1;height: 4rem;">
				<el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox>
				<div class="titleItem" style="background: #00b9ed;color: #fff;">{{item.name}}</div>
				<div class="titleItem" style="background: #efefef">{{item.refractive}}</div>
				<div class="titleItem" style="background:#c9c9c9">{{item.abbe}}</div>
				<div class="titleItem" style="background: #efefef">{{item.film}}</div>
				<div class="titleItem" style="background: #c9c9c9">{{item.covert}}</div>
				<div class="titleItem" style="height: 5rem; background: #bab9bf;display: flex; flex-direction: column;justify-content: center;">
					<div class="topWrap" style="display: flex; flex-direction:row;line-height: 0.2rem;">
						<div class="leftWrap" style="position: relative" :style="{height: 2.5+ item.photometric1[3] + 'rem'}" >
							<div v-if="item.photometric1.length" style="position: absolute;top: -.2rem;right: 0">{{item.photometric1[0]}}D</div>
							<!-- 第二个框上半部分 -->
							<div v-if="item.photometric2[0]< 0" style="position: absolute;right: 0;"
							 :style="{top: item.photometric2[4] + 'rem'}">{{item.photometric2[0]}}D</div>
							<div v-if="item.photometric2[0] >=  0"  style="position: absolute;right: 0;"
							 :style="{top: 1-item.photometric1[5] + 'rem'}">
							 {{item.photometric2[0]}}D
							 </div>
							<div style="position: absolute;right: 0;top: 0.8rem">0.00D</div>
							<!-- 第二个框下半部分 -->
							<div v-if="item.photometric2[0] >= 0" style="position: absolute;right: 0" 
							:style="{top: item.photometric2[3] + 0.81 + 'rem'}">
							{{item.photometric2[2]}}D</div>
							<div v-if="item.photometric2[0] < 0" style="position: absolute;right: 0"
							:style="{top: item.photometric2[4] + 0.81 + 'rem'}">
							{{item.photometric2[2]}}D</div>
							<div v-if="item.photometric3.length && item.photometric2[0] > 0" style="position: absolute;right: 0;" 
							:style="{top: item.photometric3[4]- 0.1 + 'rem'}">{{item.photometric3[2]}}D</div>
							<div v-if="item.photometric3.length && item.photometric2[0] <0" style="position: absolute;right: 0;"
							:style="{top: item.photometric3[4]- 0.1 + 'rem'}">{{item.photometric3[2]}}D</div>
							<div style="position: absolute;right: 0;top: 2.41rem">{{item.benchmark}}D</div>
							<div v-if="item.photometric1.length" style="position: absolute;right: 0;" :style="{top: 2.4 + item.photometric1[3] + 'rem'}">{{item.photometric1[2]}}D</div>
						</div>
						<div class="centerWrap" style="position: relative">
						<!-- 	参数1 -->
							<div class="box1"></div>
							<div style="width: 2rem;border: 0.01rem solid red;position:absolute;top: 1rem"></div>
							<div class="box2" ></div>
							<div style="width: 2rem;border: 0.01rem dotted red;position:absolute;top:2.5rem"></div>
							<div class="triangle" :style="{borderTopWidth:item.photometric1[3] + 'rem'}"></div>
							<!-- 参数二 -->
							<div class="twoTopBox" v-bind:style="{height: item.photometric1[5] + 'rem', top: 1-item.photometric1[5] + 'rem'}"></div>
							<div v-if="item.photometric2.length" class="twoBox" v-bind:style="{height: item.photometric2[3] + 'rem', top: item.photometric2[4] + 'rem'}"></div>
								<!-- 参数三 -->
							<div v-if="item.photometric3.length && item.photometric2[0] > 0" 
							class="threeBox" v-bind:style="{height: item.photometric3[3] + 'rem', top: 1.01 + item.photometric2[3] + 'rem'}">
							</div>
							<!-- 参数三 -->
							<div v-if="item.photometric3.length && item.photometric2[0] < 0" 
							class="threeBox" v-bind:style="{height: item.photometric3[3] + 'rem', top: item.photometric3[4] - item.photometric3[3]+ 'rem'}">
							</div>
							<div v-if="item.photometric2.length && item.photometric2[0] > 0" 
							style="position: absolute;left: 0.33rem;top: 0.8rem">{{item.photometric2[1]}}D</div>
							<div v-if="item.photometric2.length && item.photometric2[0] < 0"
							style="position: absolute;left: 0.33rem;" :style="{top: item.photometric2[4] + 'rem'}">{{item.photometric2[1]}}D</div>
						</div>
						<div class="leftWrap" style="position: relative" >
							<div v-if="item.photometric1.length" style="position: absolute;left: 0.1rem;top: 0.8rem">{{item.photometric1[1]}}D</div>
						</div>
						
					</div>
					<div class="bottomWrap">
						<div class="des">{{item.sphericalMirror}}</div>
						<div class="des">{{item.colonoscope}}</div>
						<div class="des">{{item.onTheSpot}}</div>
					</div>
				</div>
				<div class="titleItem" style="background: #66c6e9">{{item.presentPrice}} </div>	
				<div class="titleItem" v-if="item.addLightBelow" style="background: #66c6e9">{{item.addLightBelow}}</div>
				<div class="titleItem" v-if="item.customPrice" style="background: #66c6e9">{{item.customPrice}}</div>
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
							//上面的高度 动态
							if(item.photometric1.length) {
								item.photometric1[5] = item.photometric2[0] * 1 /  item.photometric1[0]; // 第二个方块的高度
							}
							if(item.photometric2.length) { 
								// 第二个广度范围下负数 广度范围
								if(item.photometric2[0] > 0) {
								item.photometric2[3] = 1.5 * item.photometric2[2] / item.benchmark;  //高度
								item.photometric2[4] = 1.01; // 距离顶部距离
								}else {
									item.photometric2[3] = 1.5 * (item.photometric2[2] - item.photometric2[0])/ item.benchmark;  //高度
									item.photometric2[4] = 1.5 * item.photometric2[0] / item.benchmark + 1.01; //  第二个光度范围下半部分矩形
								}
							}
							
							// 三角形的高度
							if(item.photometric1.length) {
								 item.photometric1[3] = 0.6* item.photometric1[2] / -15
							}
							// 第三个的高度
							if(item.photometric3.length) {
								item.photometric3[3] =  1.5 * (item.photometric3[2] - item.photometric3[0])  / item.benchmark //第三个的高度
								item.photometric3[4] = 1.5 * item.photometric3[2]  / item.benchmark + 1.01;
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
					background: #e5e5e5
					height: 0.3rem
					line-height: 0.3rem
					font-size: 0.15rem
					border-radius: .05rem
					display: flex
					flex-direction: column
					justify-content: center
					align-items: center
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
</style>
