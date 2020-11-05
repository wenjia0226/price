<template>
  <div>
	<!--  <el-button  type="primary"  @click="goBack" style="margin: .2rem ">返回</el-button> -->
    <div class="swiperWrap">
	 <div class="box">
		<div class="title">
			<div style="height: .29rem"></div>
			<div class="titleItem">产品名称</div>
			<div class="titleItem">折射率</div>
			<div class="titleItem">阿贝数</div>
			<div class="titleItem">膜层</div>
			<div class="titleItem">隐形标记</div>
			<div class="titleItem">光度范围</div>
			<div class="titleItem">下加光</div>
			<div class="titleItem">定制价</div>
		</div>
		<div class="conBox" v-for="(item, index) in swiperList" style="flex:1;">
			<el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox>
			<div class="titleItem" style="background: #00aaff;color: #fff;">{{item.name}}</div>
			<div class="titleItem" style="background: #bab9bf">{{item.refractive}}</div>
			<div class="titleItem" style="background: #9ba2ab">{{item.abbe}}</div>
			<div class="titleItem" style="background: #bab9bf">{{item.film}}</div>
			<div class="titleItem" style="background: #9ba2ab">{{item.covert}}</div>
			<div class="titleItem" style="background: #bab9bf">{{item.photometric1}}</div>
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
		 this.id = this.$router.history.current.query.id;
		 this.getSwiper();
		 if(window.localStorage.getItem('selectArr')) {
			 this.selectedArr = window.localStorage.getItem('selectArr').split(',');
			 console.log(this.selectedArr,88)
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
	   computed: function() {
		   
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
		  selectedArr: []
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
		  height: .3rem
		  line-height: .3rem
		  font-size: 0.18rem
		  border-radius: .05rem
	 .conBox
		font-weight: bold
		text-align: center
</style>
