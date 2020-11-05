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
			<div class="titleItem" >{{item.seriesName}}</div>
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
    this.one = this.$router.history.current.query.one;
    this.two = this.$router.history.current.query.two;
	this.three = this.$router.history.current.query.three;
	this.concatNum = this.one + ','+  this.two + ','+  this.three;
	this.getDifferent()
	},
   data() {
	   return {
		   one: '',
		   two: '',
		   three: '',
		   concatNum: '',
		   differentList: []
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
