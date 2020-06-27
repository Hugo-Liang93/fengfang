<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <vx-card title="资讯轮播" class="swiper-container">
        <swiper :options="swiperOption" class="swiper-wrapper">
            <swiper-slide class="swiper-slide" v-for="(item,index) in attachPic" :key="index" >
              <img alternating="true" :key="`index${item.fileName}`" :src="`/images/${item.fileName}`" @click="navTo(item.detail_type,item.type_id)" />
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div> 
            <div class="swiper-button-next" slot="button-next"></div> 
          </swiper>
      </vx-card>
    </div>
    <br />
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">
        <vx-card title="项目资讯">
          <div slot="no-body" class="mt-4">
            <vs-table :data="projectsData" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>项目ID</vs-th>
                <vs-th>项目名称</vs-th>
                <vs-th>明细</vs-th>
              </template>
      
              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].project_id">
                    <span>#{{data[indextr].project_id}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].project_name">
                    <span>{{data[indextr].project_name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].project_id">
                    <router-link :to="{name:'project-viewdetail',params:{projectId: data[indextr].project_id}}">详情</router-link>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td></vs-td>
                  <vs-td></vs-td>
                  <vs-td>
                    <router-link to="/project/list-project">查看全部</router-link>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
      
        </vx-card>
      </div>
      <div class="vx-col w-full md:w-1/2">
        <vx-card title="集团热点">
          <div slot="no-body" class="mt-4">
            <vs-table :data="activitiesData" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>热点ID</vs-th>
                <vs-th>标题</vs-th>
                <vs-th>范围</vs-th>
                <vs-th>开始时间</vs-th>
                <vs-th>明细</vs-th>
              </template>
      
              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <span>#{{data[indextr].id}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].title">
                    <span>{{data[indextr].title}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].company">
                    <span v-if="data[indextr].company=='admin'">全集团</span>
                    <span v-else>{{data[indextr].company}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].startDate}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <router-link :to="{name:'activity-view',params:{activityId: data[indextr].id}}">详情</router-link>
                  </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td></vs-td>
                  <vs-td></vs-td>
                  <vs-td></vs-td>
                  <vs-td></vs-td>
                  <vs-td>
                    <router-link to="/activity/activityList">查看全部</router-link>
                  </vs-td>
                </vs-tr>
              </template>
              
            </vs-table>
          </div>
      
        </vx-card>
      </div>
    </div>
   
   </div> 
  
</template>

<script>
import 'swiper/dist/css/swiper.css'    //在全局没引入，这里记得要！
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import projectAPI from '../http/requests/api/project/index.js'

export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      attachPic: [],
      swiperOption: {
        // 所有的参数同 swiper 官方 api 参数一样
        // 
        pagination: {
          el: '.swiper-pagination'
        },
        //设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev'
        },
        //自动轮播
        autoplay: {
          delay: 2000,
          //当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        //开启循环模式
        loop: true,
        centeredSlides : true
      }
    }
  },
  methods: {
    navTo (detail_type, type_id) {
      if (detail_type === 'activity') {
        this.$router.push(`/activity/activity-view/${type_id}`).catch(() => {})
      } else if (detail_type === 'project') {
        this.$router.push(`/project/project-view/${type_id}`).catch(() => {})
      }
    }
  },
  computed: {
    activitiesData () {
      return this.$store.state.activity.activityList.slice(0, 6)
    },
    projectsData () {
      return this.$store.state.project.projectList.slice(0, 6)
    }
  },
  created () {
    projectAPI.getDetail().then(response => {
      this.attachPic = response.data
    })
    this.$store.dispatch('activity/getActivityByCompany', this.$store.state.AppActiveUser.user_company).catch(err => { console.error(err) })
    this.$store.dispatch('project/listProject').catch(err => { console.error(err) })
  }
}
</script>

<style lang="scss">
  /*! rtl:begin:ignore */
  #dashboard-analytics {
    .greet-user{
      position: relative;
  
      .decore-left{
        position: absolute;
        left:0;
        top: 0;
      }
      .decore-right{
        position: absolute;
        right:0;
        top: 0;
      }
    }
  
    @media(max-width: 576px) {
      .decore-left, .decore-right{
        width: 140px;
      }
    }
  }
  /*! rtl:end:ignore */
 .swiper-container {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .swiper-wrapper {
    height: 500px;
  }

  .swiper-slide img {
    max-width: 100%;
  }

  .swiper-slide {
    text-align: center;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
