<template>
  <div>
	  <el-button  type="primary"  @click="goBack" style="margin: .2rem ">返回</el-button>
    <div class="swiperWrap" @dblclick="goBack">
			<div class="box">
				<div class="title">
					<div style="height: .29rem"></div>
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
				<div class="title" style="flex:1;height: 4rem;"v-for="(item, index) in swiperList">
					<el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox>
					<div class="titleItem" style="background: #00b9ed;color: #fff;">{{item.name}}</div>
					<div class="titleItem" style="background: #efefef">{{item.refractive}}</div>
					<div class="titleItem" style="background:#c9c9c9">{{item.abbe}}</div>
					<div class="titleItem" style="background: #efefef" v-if="film">{{item.film}}</div>
					<div class="titleItem" style="background: #c9c9c9" v-if="covert">{{item.covert}}</div>
					<div  class="titleItem" style="height: 3rem;background: #efefef">
						<el-image :src="item.picture" fit="contain"></el-image>
					</div>
					<div class="titleItem" v-if="passageway">{{item.passageway}}</div>
					<div class="titleItem" v-if="item.addLightBelow">{{item.addLightBelow}}D</div>
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
					customPrice: false,
					presentPrice: false,
					polarizing: false,
					passageway: false,
					pricepol: false,
					bluray: false,
					film: false,
					covert: false,
					addLightBelow3: false,
					customPrice3: false,
					presentPrice3: false,
					polarizing3: false,
					passageway3: false,
					pricepol3: false,
					bluray3: false,
					film3: false,
					covert3: false
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
<style lang="stylus"  scoped>
.swiperWrap
	width: 90vw
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
					height: 0.2rem
					line-height: 0.2rem
					font-size: 0.15rem
					border-radius: .05rem
					display: flex
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
							border-right-color: transparent;
							border-bottom-color: transparent;
							border-left-color: transparent;
							// border-color: #a2daee transparent transparent  transparent;
							width: 0px;
							height: 0px;
						.des
							height: 0.2rem
							line-height: 0.2rem
							font-size: 0.14rem
					 .leftWrap
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
						top: 1.02rem
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
