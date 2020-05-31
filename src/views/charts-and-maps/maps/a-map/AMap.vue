<template>
  <vx-card title="Basic">
  
      <p>Creating basic google map</p>
  
      <div class="mt-5">
        <el-amap  vid="amapDemo"  :center="center" :zoom="zoom"  class="amap-demo" style="width: 100%; height: 400px">
              </el-amap>
      </div>
  </vx-card>
</template>

<script>

export default {
  data () {
    return {
      zoom: 12,
      center: [121.59996, 31.197646]
    }
  },
  methods: {

  }
}    
</script>

<style>
</style>
