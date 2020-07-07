<template>
  <vx-card title="员工打卡">
  
      <p>当定位在公司范围之内才可打卡哦</p>
        <vs-list>
          <vs-list-header title="打卡状态"></vs-list-header>
          <vs-list-item title="上班啦" subtitle="只能在早上9点~12点间打卡">
            <vs-button :disabled="workFlag" color="success" @click="gotowork">上班啦</vs-button>
          </vs-list-item>
          <vs-list-item title="下班啦" subtitle="只能在下午4点~8点间打卡">
            <vs-button :disabled="homeFlag" color="success" @click="backhome">下班啦</vs-button>
          </vs-list-item>
      </vs-list>
      <div class="mt-5">
        
        <el-amap  vid="amapDemo" :plugin="plugin"  :center="center" :zoom="zoom"  class="amap-demo" style="width: 100%; height: 400px">
          <el-amap-marker :position="officeMarker.postion" :label="{content:officeMarker.label,offset: [10, 10]}"></el-amap-marker>
          <el-amap-circle :center="officeMarker.postion" :radius="2000" :fill-opacity="0.5" ></el-amap-circle>
        </el-amap>
      </div>
  </vx-card>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import userAPI from '../../../../http/requests/api/user/index.js'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '66e5986aed3a1a56064e9793f326d18d',
  plugin: [
    'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
    'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation', 'AMap.Geocoder', 'AMap.GeometryUtil'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})  

export default {
 
  data () {
    const vm = this
    return {
      center: [0, 0],
      zoom: 15,
      userOffice: '',
      officeMarker:{
        label: '公司地址',
        postion: [0, 0]
      },
      address: null,
      clockInAddress: null,
      lng: 0,
      lat: 0,
      lngOffice: 0,
      latOffice: 0,
      officeStatus: false,
      locationStatus: false,
      workFlag: true,
      homeFlag: true,
      clockInRecord: [],
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  vm.lng = result.position.lng
                  vm.lat = result.position.lat
                  vm.center = [vm.lng, vm.lat]
                  vm.address = result.formattedAddress
                  vm.locationStatus = true
                  vm.$nextTick()
                }
              })
            }
          }  
        },
        {
          pName: 'Geocoder',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getLocation(vm.userOffice, (status, result) => {
                if (result && result.geocodes[0].location) {
                  vm.lngOffice = result.geocodes[0].location.lng
                  vm.latOffice = result.geocodes[0].location.lat
                  vm.officeMarker.postion = [vm.lngOffice, vm.latOffice]
                  vm.officeStatus = true
                  console.log(vm.getDistance(vm.lng, vm.lat, vm.lngOffice, vm.latOffice))
                  vm.$nextTick()
                }
              })
            }
          }  
        }
      ]          
    }
  },
  methods: {
    getHour () {
      const now = new Date()
      // 获取当前日期与当前时间
      return now.getHours()
    },
    gotowork () {
      if (this.getHour() >= 9 && this.getHour() < 12) {
        this.clockin()
      } else if (this.getHour() < 9) {
        this.$vs.notify({
          title: '不在打卡时间内',
          text: '还没到打卡时间先歇歇！',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
      } else if (this.getHour() >= 12 &&  this.getHour() < 16) {
        this.$vs.notify({
          title: '不在打卡时间内',
          text: '已经过了打卡时间，明天请准时打卡！',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
      } else {
        this.$vs.notify({
          title: '不在打卡时间内',
          text: '都下班了，明天请记得打卡！',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
      }
    },
    backhome () {
      if (this.getHour() >= 16 && this.getHour() < 20) {
        this.clockin()
      } else if (this.getHour() < 16) {
        this.$vs.notify({
          title: '不在打卡时间内',
          text: '还没到点就想下班，是想要扣工资吗？',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        })
      } else {
        this.$vs.notify({
          title: '不在打卡时间内',
          text: '还是明天早点上班吧！',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'warning'
        }) 
      }
    },
    clockin () {
      if (this.officeStatus && this.locationStatus) {
        if (this.getDistance(this.lng, this.lat, this.lngOffice, this.latOffice) < 2) {
          this.$vs.loading()
          const userInfo = JSON.parse(localStorage.getItem('userInfo'))
          const clockInObj = {
            user_id: userInfo.user_id,
            clockin_path: this.address,
            clockin_lng: this.lng,
            clockin_lat: this.lat
          }
          this.$store.dispatch('user/clockIn', clockInObj)
            .then(response => { 
              if (response.data.status === true) {
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Success',
                  text: '打卡成功',
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'success'
                })
                this.buttonStatus()
              } else {
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Error',
                  text: response.data.errorMsg,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
                })
              }
            })
            .catch(error => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })
        }   else {
          this.$vs.notify({
            title: 'Error',
            text: '定位不在公司范围',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
        
      }      
    },
    getDistance (longitude1, latitude1, longitude2, latitude2) {
      const d1 = 0.01745329251994329  
      let d2 = longitude1
      let d3 = latitude1
      let d4 = longitude2
      let d5 = latitude2
      d2 *= d1
      d3 *= d1
      d4 *= d1
      d5 *= d1
      const d6 = Math.sin(d2)
      const d7 = Math.sin(d3)
      const d8 = Math.cos(d2)
      const d9 = Math.cos(d3)
      const d10 = Math.sin(d4)
      const d11 = Math.sin(d5)
      const d12 = Math.cos(d4)
      const d13 = Math.cos(d5)
      const arrayOfDouble1 = []
      const arrayOfDouble2 = []
      arrayOfDouble1.push(d9 * d8)
      arrayOfDouble1.push(d9 * d6)
      arrayOfDouble1.push(d7)
      arrayOfDouble2.push(d13 * d12)
      arrayOfDouble2.push(d13 * d10)
      arrayOfDouble2.push(d11)
      const d14 = Math.sqrt(((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0])) +
          ((arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1])) +
          ((arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2])))
      return (Math.asin(d14 / 2.0) * 12742001.579854401) / 1000
    },
    async buttonStatus () {
      await userAPI.getTodayClockInList(this.$store.state.AppActiveUser.user_id).then(response => {
        this.clockInRecord = response.data
        if (response.data.length === 0) {
          this.workFlag = false
          this.homeFlag = false
        } else if (response.data.length === 1) {
          if (this.clockInRecord[0].clockin_type === 'morning') {
            this.workFlag = true
            this.homeFlag = false
          } else {
            this.homeFlag = true
            this.workFlag = false
          }
        } else {
          this.workFlag = true
          this.homeFlag = true
        }
      })
    }
  },
  created () {
    this.userOffice = this.$store.state.AppActiveUser.user_office
    this.buttonStatus()
  }
}    
</script>
<style>
</style>
