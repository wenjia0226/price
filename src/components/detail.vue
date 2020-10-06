<template>
  <div>
    <div class="swiperWrap">
      <el-carousel :height="bannerH+'px'" :autoplay="false">
         <el-carousel-item  v-for="item in swiperList" :key="item.id">
              <img class="imgBox" :src="item.pic" style="border-radius: 30px"  width="100%" height="100%" object-fit="cover">
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
		 this.bannerH = document.body.clientWidth / 8 * 5;
         this.getSwiper();
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
		  bannerH: 0
          }
        },
      methods: {
		  setBannerH() {
		      this.bannerH = document.body.clientWidth / 8 * 5
		  },
		  
        getSwiper() {
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
		height: 90vh
		padding-left: 5%
		padding-right: 5%
		padding-top: 4vh
		background: grey
</style>
