<template>
  <div>
	<!--  <el-button  type="primary"  @click="goBack" style="margin: .2rem ">返回</el-button> -->
    <div class="swiperWrap">
      <el-carousel :height="bannerH+'px'"  :width= "bannerW + 'px'"  :autoplay="false">
         <el-carousel-item   trigger="hover" v-for="item in swiperList" :key="item.id">
              <img  @dblclick="goBack" class="imgBox" :src="item.pic" style="border-radius: 0.3rem"  width="100%" height="100%" object-fit="cover">
		 </el-carousel-item>
       </el-carousel>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
     created() {
     this.id = this.$router.history.current.query.id;
		 this.getSwiper();
		 this.$nextTick(() => {
			this.bannerH = document.body.clientHeight * 0.8;
			this.bannerW = document.body.clientHeight * 0.8  / 2 * 3 
		 })     
       },
	   mounted() {
		   window.addEventListener('resize', () => {
		     this.setBannerH()
		   }, false);
	   },
      data() {
        return {
          id: '',
          swiperList: [],
		  bannerH: 0,
		  bannerW: 0
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
		  setBannerH() {
		      this.bannerH = document.body.clientHeight * 0.8
			  this.bannerW = document.body.clientHeight * 0.8 / 2 * 3
		  },
		  
        getSwiper() {
		 this.openFullScreen()
          let param = new FormData();
          param.append('id', this.id);
          axios({
            method: 'post',
            url: '/lightspace/priceclient/getProduceBySeries',
            data: param
          }).then(this.handleGetSwiperSucc.bind(this)).catch((err) => {
            console.log(err)
          })
        },
        handleGetSwiperSucc(res) {
         // console.log(res)
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
		background: grey
</style>
