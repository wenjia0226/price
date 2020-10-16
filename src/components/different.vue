<template>
<div>
	<el-row>
		<el-col :span="6" :offset="9">
			<div class="compare">价格对比</div>
		</el-col>
	</el-row>
	<div  class="imgBox">
	   <div class="itemBox" v-for="(item, index) in differentList" :key="index">				
			 <el-image @dblclick="goBack"  :src="item.pic" fit="contain"  style="border-radius: .2rem"></el-image>
			 <div class="title">{{item.seriesName}}</div>
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
	this.getDifferent()
	},
   data() {
	   return {
		   one: '',
		   two: '',
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
      param.append('one', this.one);
      param.append('two', this.two)
      axios({
        method: 'post',
        url: '/lightspace/priceclient/contrast',
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
	.compare {
		font-size: .3rem
		font-weight:bold;
		text-align: center;
		padding-top: .4rem
	}
	.imgBox {
			display:flex;
			justify-content: space-around;
			align-items :center;
			width: 90%;
			margin-left: 5vw;
			margin-top: .4rem;
		}
	 .itemBox{
			text-align: center;
			width: 49%;
		}
	.title{
		font-size: .2rem;
		margin: .1rem
		font-weight: bold;
	}
</style>
