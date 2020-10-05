<template>
  <div>
    <div class="swiperWrap">
      <el-carousel indicator-position="outside">
         <el-carousel-item  v-for="item in swiperList" :key="item.id">
           <div class="imgBox">
              <img  :src="item.pic">
           </div>
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
       },
      data() {
        return {
          id: '',
          swiperList: []
          }
        },
      methods: {
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
          console.log(res)
          if(res.data.status == 200) {
            this.swiperList = res.data.data;
          }
        }
      }
      }
</script>

<style lang="stylus" scoped>
  .swiperWrap
     width: 100vw;
     height: 100vh;
     background:  #dcdcdc;
 >>>.el-carousel__container
    height: 90vh;
    line-height: 90vh;
    width: 80%;
    margin-left: 10vw;
    margin-top: 5vh;
   .imgBox
     width: 100%;
     height: 100%
     text-align: center;
     img
       width: auto;
       height: 80%;
</style>
