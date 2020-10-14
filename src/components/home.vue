<template>
  <div>
    <el-container  class="home-container">
      <el-aside  :width="isCollapse ? '0.64rem': '2rem'" style="min-height: 100vh">
        <el-menu
				 :default-active="this.$route.path"
				 class="el-menu-vertical-demo"
				 background-color="#333744"
				 text-color="#fff"
				 active-text-color="#409eff"
				 router
				 :unique-opened="true"
				 :collapse="isCollapse"
				 :collapse-transition="false" >
               <!-- <div class="toggle-button" @click="toggleCollapse"> |||</div> -->
               <el-menu-item :index="'/'+ item.path"   v-for="item in menuList" :key="item.id" @click="saveNavState(item.id, '/' + item.path)">
                 <i class="el-icon-set-up"></i>
                 <span slot="title">{{item.name}}</span>
               </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
        this.getMenuList();
    },
    data() {
      return {
        isCollapse: false,
        activeIndex: '/singleFocus',
        menuList: []
      }
    },
    methods: {
      goto(id) {
        window.sessionStorage.setItem('labelId' ,id);
      },
      getMenuList(){
        let param = new FormData();
        axios({
            method: 'post',
            url: '/lightspace/priceclient/getAllLabel',
            data:param
        }).then(this.handleGetMenuSucc.bind(this)).catch((err) => {console.log(err)})
      },
      handleGetMenuSucc(res) {
        // console.log(res)
        if(res.data.status == 200) {
          this.menuList = res.data.data;
        }
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      //保存链接的激活状态
      saveNavState(labelId, activeIndex) {
         this.activeIndex = activeIndex;
         this.$store.commit('changeLabel', labelId);
         window.sessionStorage.setItem('labelId' ,labelId);
      }
    }
  }
</script>
<style lang="stylus"  scoped>
  .el-menu
    border-right:none
    .toggle-button
      line-height: 0.3rem
      height: 0.3rem
      color: #fff
      text-align:center
  .el-menu-vertical-demo
    min-height: 100%

</style>
