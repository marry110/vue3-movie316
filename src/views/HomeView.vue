<template>
  <div class="home">
    <NavBar />
    <!-- 正在热映 -->
    <div class="section">
      <div class="type-title">
        <span>正在热映</span>
        <div class="more" @click="goToList('in_theaters')">更多</div>
      </div>

      <div class="scroll-view">
        <div class="item" v-for="item in inTheaters" :key="item.id">
          <router-link :to="'/detail/' + item.id">
            <img :src="item.images.small" class="imgs" /><br />
            <span class="title">{{
              item.title.length > 6
                ? item.title.substr(0, 6) + '...'
                : item.title
            }}</span>
            <span v-if="item.rating.average == 0" class="no-score"
              >暂无评分</span
            >
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
    <!-- 即将上映 -->
    <div class="section">
      <div class="type-title">
        <span>即将上映</span>
        <div class="more" @click="goToList('coming_soon')">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in comingSoon" :key="item.id">
          <router-link :to="'/detail/' + item.id">
            <img :src="item.images.small" class="imgs" /><br />
            <span class="title">{{
              item.title.length > 6
                ? item.title.substr(0, 6) + '...'
                : item.title
            }}</span
            ><br />
            <span v-if="item.rating.average == 0" class="no-score"
              >暂无评论</span
            >
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
    <!-- 排行250  -->
    <div class="section">
      <div class="type-title">
        <span>Top250</span>
        <div class="more" @click="goToList('top250')">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in top250" :key="item.id">
          <router-link :to="'/detail/' + item.id">
            <img :src="item.images.small" class="imgs" /><br />
            <span class="title">{{
              item.title.length > 6
                ? item.title.substr(0, 6) + '...'
                : item.title
            }}</span>
            <br />
            <span v-if="item.rating.average == 0" class="no-score"
              >暂无评论</span
            >

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
  </div>
</template>

<script lang="ts">
import {
  reactive,
  toRefs,
  onMounted,
  provide,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue'
import { getInTheaters, getComingSoon, getTop250 } from '@/api/movie'
import NavBar from '@/components/NavBar.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'HomeView',
  components: {
    NavBar,
  },
  setup() {
    const state = reactive({
      inTheaters: [], // 正在热映
      comingSoon: [], // 即将上映
      top250: [], // top250
    })
    provide('title', '黑马电影')

    const router = useRouter()
    const store = useStore()

    const getInTheatersdata = async () => {
      const res = await getInTheaters({ start: 0, count: 10 })
      res.data.subjects.forEach(
        (v: { startArr: number[]; rating: { stars: number } }) => {
          // v增加一个字段 纯数字无法循环
          // 必须弄成数组
          // v.startArr=Math.floor(v.rating.starts/10)
          v.startArr = []
          // 计算星星个数
          const starNum = Math.floor(v.rating.stars / 10)
          // 遍历赋值即可 根据星星的个数 赋值 (黄星1 灰星0)
          // index 从0 开始 0 1 2 3 4
          // 假设星星的个数为4
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        }
      )
      state.inTheaters = res.data.subjects

      console.log(res.data)
      console.log(res.data.subjects)
    }
    const getComingSoondata = async () => {
      const res = await getComingSoon({ start: 0, count: 10 })
      res.data.subjects.forEach(
        (v: { startArr: number[]; rating: { starts: number } }) => {
          v.startArr = []
          const starNum = Math.floor(v.rating.starts / 10)
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        }
      )
      console.log(res.data)
      state.comingSoon = res.data.subjects
    }
    const getTop250data = async () => {
      const res = await getTop250({ start: 0, count: 10 })
      res.data.subjects.forEach(
        (v: { startArr: number[]; rating: { starts: number } }) => {
          v.startArr = []
          const starNum = Math.floor(v.rating.starts / 10)
          for (let i = 0; i < 5; i++) {
            v.startArr[i] = starNum > i ? 1 : 0
          }
        }
      )
      console.log(res.data)
      state.top250 = res.data.subjects
    }
    onMounted(() => {
      getInTheatersdata()
      getComingSoondata()
      getTop250data()
    })

    // 跳转到类表页面
    const goToList = (type: any) => {
      // vue2 this.$router.push(`/list/${type}`)
      router.push(`/list/${type}`)
    }

    onBeforeMount(() => {
      console.log('隐藏NavBar返回按钮')
      // vue2 this.$store.commit('setIsShowBack',true)
      store.commit('setShowBack', false)
    })
    onBeforeUnmount(() => {
      console.log('显示Navbar返回按钮')
      store.commit('setShowBack', true)
    })

    return {
      ...toRefs(state),
      goToList,
    }
  },
}
</script>
<style lang="scss" scoped>
.imgs {
  width: 85px;
  height: 123px;
}
.home {
  padding-bottom: 15px;
  padding-top: 10px;
  .section {
    padding-top: 44px;
    .type-title {
      height: 20px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
      .more {
        font-size: 13px;
        color: #43c74d;
      }
    }

    .scroll-view {
      margin-top: 10px;
      /* 要能够滚动 */
      width: 100%;
      display: flex;
      overflow: auto;
      white-space: nowrap;
      height: 100%;
      // margin-left: 5px;
      // margin-right: 5px;
      .item a {
        width: 85px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
        img {
          width: 85px;
          height: 123px;
        }
        .imgs {
          width: 85px;
          height: 123px;
        }
        .title {
          margin-top: 2px;
          font-size: 12px;
        }
      }
    }
    .scroll-view::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
