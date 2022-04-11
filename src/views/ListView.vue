<template>
  <div class="list-box">
    <NavBar />
    <div class="items">
      <div class="item" v-for="item in MovieList" :key="item.id">
        <router-link :to="'/detail/' + item.id">
          <img :src="item.images.small" alt="" />
          <span class="title"
            >{{
              item.title.length > 6
                ? item.title.substr(0, 6) + '...'
                : item.title
            }}
          </span>
          <span v-if="item.rating.average == 0" class="no-score">暂无评论</span>

          <div v-else class="start-box">
            <div v-for="(subitem, index) in item.startArr" :key="index">
              <span v-if="subitem === 1" class="orange">★</span>
              <span v-else class="gray">★</span>
            </div>
            {{ item.rating.average }}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, provide, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { getMovieList } from '@/api/movie'
export default {
  components: {
    NavBar,
  },
  setup() {
    const route = useRoute()

    const typeTitle = computed(() => {
      switch (route.params.type) {
        case 'in_theaters':
          return '正在热映'
        case 'coming_soon':
          return '即将上映'
        case 'top250':
          return 'Top250'
      }
    })
    console.log(route.params)

    provide('title', typeTitle)

    const state = reactive({
      MovieList: [],
    })

    const getMovieListdata = async () => {
      const res = await getMovieList({
        type: route.params.type,
        start: 0,
        count: 20,
      })
      res.data.subjects.forEach(
        (v: { startArr: number[]; rating: { starts: number } }) => {
          v.startArr = []
          const starNum = Math.floor(v.rating.starts / 10)
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        }
      )
      state.MovieList = res.data.subjects
      console.log(res.data.subjects)
    }

    onMounted(() => {
      getMovieListdata()
    })
    return {
      ...toRefs(state),
      typeTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
/* 底部区域布局 */
.list-box {
  padding-bottom: 15px;
  .items {
    padding-top: 44px;
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-top: 5px;
      width: 33.33%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-align: center;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 170px;
      }
      .title {
        margin-top: 2px;
        font-size: 12px;
      }
    }
  }
}
</style>
