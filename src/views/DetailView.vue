<template>
  <div class="about">
    <!-- 导航  -->
    <NavBar></NavBar>
    <!-- 电影的基本信息 -->
    <div class="info-box">
      <!-- <span class="title">{{ movieInfo.title }}</span> -->
      <!-- <div class="flex-box">
        <div class="left">
          <div class="top">
            <span v-if="movieInfo.rating && movieInfo.rating.average === 0"
              >暂无评分</span
            >
            <div v-else class="star-box">
              <div v-if="(item, index) in movieInfo.starArr" :key="index">
                <img v-if="item === 1" src="@/assets/imgs/full.png" />
                <img v-else-if="item === 3" src="@/assets/imgs/halfStar.jpg" />
                <img v-else src="@/assets/imgs/empty.png" />
              </div>
            </div>
          </div>
        </div>
        <span class="score">{{
          movieInfo.rating && movieInfo.rating.average
        }}</span>
        <span class="comments">{{ movieInfo.ratings_count }}人评价</span>
      </div> -->
      <!-- bottom -->
      <div></div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, ref, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'
import { getMoveInfo } from '@/api/movie'

import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute()
    const title = ref('正在加载中...')
    provide('title', title)
    const state = reactive({
      movieInfo: [],
    })
    // const getMoveInfodata = async () => {
    //   const res = await getMoveInfo(route.params.id)
    //   state.movieInfo = res.data.videos
    //   title.value = res.data.title
    //   console.log(res.data)
    //   console.log(route.params.id)
    // }

    const getMoveInfodata = async () => {
      const res = await getMoveInfo(route.params.id)
      console.log(route.params.id)

      state.movieInfo = res.data
      console.log(res.data)
    }
    onMounted(() => {
      getMoveInfodata()
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="scss" scoped></style>
