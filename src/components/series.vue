<template>
  <div>
    <div class="seriesWrap">
      <div class="itemWrap" v-for="item in seriesList" :key="item.id" @click="gotoDetail(item.id)" >
           <!-- <el-image :src="item.path"></el-image> -->
		<img class="imgBox"  :src="item.introduce" style="border-radius: .2rem" ></img>

      <!-- <img class="imgBox" :src="item.introduce"> -->
        <div class="title">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created()  {
      let labelId = window.sessionStorage.getItem('labelId');
	  if(labelId) {
		  
	  }else  {
		labelId = 3;
	  }
      this.getSeries(labelId);
    },
    data() {
      return {
        labelId: ''
      }
    },
    watch: {
      labelId: function(a, b) {
         if(a !== b) {
           this.getSeries(a)
         }
      }
    },
   computed: {
    labelId: function() {
      return this.$store.state.labelId
    }
   },
    data() {
      return {
        seriesList: []
      }
    },
    methods: {
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
      getSeries(labelId) {
				this.openFullScreen()
        let param = new FormData();
        param.append('id', labelId)
        axios({
          method: 'post',
          url: '/lightspace/priceclient/getSeriesByLabel',
          data:param
         }).then(this.handleGetSeriesSucc.bind(this)).catch((err) => {console.log(err)})
     },
     handleGetSeriesSucc(res) {	
       if(res.data.data) {
		 this.closeFullScreen(this.openFullScreen())
         this.seriesList = res.data.data;
       }

     },
     gotoDetail(id) {
       let routeUrl = this.$router.resolve({
         path: '/detail',
         query: {
           id: id,
         }
        });
        window.open(routeUrl.href, '_blank');
     }
    }
  }
</script>

<style lang="stylus" scoped>
  .seriesWrap
    display:flex;
    flex-flow: row wrap;
    .itemWrap
       width: 30%;
       display:flex;
       flex-direction:column;
       justify-content:center;
       align-items:center;
       .imgBox
          width: 80%;
          height: calc(80%);
          margin: 0.2rem;
      .title
        font-size: .16rem
        height: 0.3rem
        width: 100%
        line-height: 0.3rem
        font-weight:bold;
        text-align:center;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        letter-spacing: 0.06rem
</style>
