<template>
  <div>
	  <el-row style="margin-bottom: .2rem">
		  <el-col :span="4" :offset="20">
			  <el-button type="primary" size="mini" @click="seeDifferent">查看对比</el-button>
			  <el-button type="success" size="mini"@click="clearChoose">清空选项</el-button>
		  </el-col>
		 
	  </el-row>
    <div class="seriesWrap">
		
      <div class="itemWrap" v-for="item in seriesList" :key="item.id">			
		  <!-- <img class="imgBox"  :src="item.introduce" style="border-radius: .2rem" ></img> -->
		  <el-checkbox :checked="item.checked" @change="getChooseItem(item.id, item.checked)" :disabled="disable">选择对比</el-checkbox>
		  <el-image @click="gotoDetail(item.id)" class="imgBox"  :src="item.introduce" style="border-radius: .2rem" fit="contain"></el-image>
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
	  this.selectedOne = window.sessionStorage.getItem('oneSelected');
	  // if(this.selectedOne) {
		 //  this.selectedArr.push(selectedOne)
	  // }
	  if(labelId) {
		  
	  }else  {
		labelId = 3;
	  }
      this.getSeries(labelId);
    },
    data() {
      return {
		checked: true,
		num: 0,
		selectedOne: '',
		seriesList: [],
		selectedArr: [],
		disable: false
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
    methods: {
		seeDifferent() {
			let routeUrl = this.$router.resolve({
			  path: '/different',
			  query: {
			    one:this.selectedArr[0],
				two: this.selectedArr[1]
			  }
			 });
			 window.open(routeUrl.href, '_blank');
		     this.clearChoose()
		},
		clearChoose() {
			this.$router.go(0);
			this.disable = false;
			window.sessionStorage.setItem('oneSelected', '')
		},
		getChooseItem(id,checked) {
			if(this.selectedOne) {
				this.selectedArr = []
			}
			this.seriesList.forEach((item, index) => {
				if(item.id == id) {
					item.checked = !checked
					// // 如果选中就存入
					if(item.checked) {
						this.selectedArr.push(item.id)
					}
				}	
			})
			// 一个标签一个
			if(this.selectedArr.length == 1) {
				window.sessionStorage.setItem('oneSelected', this.selectedArr[0])
			}
			//一个标签里选择两个系列
			
			this.disable = this.selectedArr.length >=2 ? true: false;
			
			// window.sessionStorage.setItem('chooseId', JSON.stringify(this.selectedArr))
			// this.seriesList = seriesList;
			 
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
		 this.seriesList.forEach((item, index) => {
			 item.checked = false
		 })
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
		position: relative
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
		.choose
			position: absolute;
			top: 0;
			right: 0;
			width: .2rem
			height: .2rem
			background: red
			border-radius: .06rem
</style>
