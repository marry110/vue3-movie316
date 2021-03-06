import request from '@/utils/request'

// 获取正在热映的数据
export const getInTheaters = ({ start = 0, count = 5 }) => {
  return request({
    url: `in_theaters?start=${start}&count=${count}`,
  })
}

// 获取即将上映的数据
export const getComingSoon = ({ start = 0, count = 5 }) => {
  return request({
    url: `coming_soon?start=${start}&count=${count}`,
  })
}

// 获取top250的数据
export const getTop250 = ({ start = 0, count = 5 }) => {
  return request({
    url: `top250?start=${start}&count=${count}`,
  })
}

// 根据类型，获取电影列表
type type = any
export const getMovieList = ({
  type = '',
  start = 0,
  count = 5,
}: {
  type: any
  start: number
  count: number
}) => {
  return request({
    url: `${type}?start=${start}&count=${count}`,
  })
}
// type Girl = {
//   type: string
//   start: number
//   count: number
// }
// const girl : {
//   type : '',
//   start : 0,
//   count :5,
// }
// export const getMovieList1 :()=>(girl: Girl) => {
//   return  request({
//     url: `${type}?start=${start}&count=${count}`,
//   })
// }

// 根据电影id获取电影信息
export const getMoveInfo = (id: any) => {
  return request({
    url: `/subject/${id}`,
  })
}
