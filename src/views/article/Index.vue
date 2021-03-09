<template>
  <div>
    <div class="article-list" v-for="item in showList" :key="item.id" @click="goArticleDetail(item.id)">
      <div class="head flexjbac">
        <div class="title">{{item.title}}</div>
        <div class="date">{{item.created}}</div>
      </div>
      <div class="body">
        <div class="category"><i class="el-icon-price-tag">Tag：</i>{{item.category}}</div>
        <div class="description">{{item.description}}</div>
      </div>
      <div class="operate">
        <i class="el-icon-edit-outline" @click.stop="$router.push(`/addOrEditArticle/${item.id}?type=edit`)"></i>
        <i class="el-icon-delete" @click.stop="handleDeleteArticle(item.id)"></i>
      </div>
    </div>
    <div class="loading">...</div>
  </div>
</template>
<script>
import {
  getArticleList,
  deleteArticle
} from '@/api/getData'
export default {
  data () {
    return {
      articleList: []
    }
  },
  methods: {
    handleDeleteArticle (id) {
      deleteArticle(id).then(res => {
        const { code, msg } = res
        if (code === 0) {
          this.getArticlePaged()
          this.$message.success('删除成功！')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    goArticleDetail (id) {
      this.$router.push('/articleDetail?id=' + id)
    },
    checkInPage () {
      const el = document.querySelector('.loading')
      const pageHeight = document.documentElement.clientHeight
      const contentTop = el.getBoundingClientRect().top
      const contentHeight = el.offsetHeight
      if ((contentTop < pageHeight && contentTop >= 0) || (contentTop < 0 && (contentTop + contentHeight > 0))) {
        getArticleList({ pageNum: this.pageNum }).then(res => {
          const { code, data, msg } = res
          if (code === 0) {
            const tempArr = data.data.map(item => {
              item.created = item.created.split(' ')[0]
              return item
            })
            tempArr.forEach(element => {
              this.articleList.push(element)
            })
            if (this.articleList.length < (data.totalSize)) {
              this.$nextTick(this.checkInPage)
            }
          }
        })
      }
    }
  },
  computed: {
    showList () {
      if (this.$route.params.category) {
        return this.articleList.filter((item) => { return this.$route.params.category === item.category })
      } else {
        return this.articleList
      }
    },
    pageNum () {
      return Math.floor(this.articleList.length / 10) + 1
    }
  },
  mounted () {
    var totalSize = 1
    var intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (this.articleList.length < (totalSize)) {
            getArticleList({ pageNum: this.pageNum }).then(res => {
              const { code, data, msg } = res
              if (code === 0) {
                const tempArr = data.data.map(item => {
                  item.created = item.created.split(' ')[0]
                  return item
                })
                tempArr.forEach(element => {
                  this.articleList.push(element)
                })
                totalSize = data.totalSize
                if (this.articleList.length === (totalSize)) {
                  intersectionObserver.unobserve(document.querySelector('.loading'))
                  console.log('qvchu')
                } else {
                  if (this.articleList.length < (totalSize)) {
                    this.$nextTick(this.checkInPage)
                  }
                }
              }
            })
          } else {
            intersectionObserver.unobserve(document.querySelector('.loading'))
          }
        }
      }
    )
    // 开始观察
    intersectionObserver.observe(
      document.querySelector('.loading')
    )
  }
}
</script>

<style lang="less" scoped>
.tags {
  margin-top: 20px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
.article-list {
  margin-top: 25px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #aaa;
  width: 100%;
  position: relative;
  cursor: pointer;
  .head {
    height: 50px;
    padding: 0 25px;
    box-shadow: 0 5px 5px -5px #aaa;
    .title {
      flex: 1;
      font-size: 25px;
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .date {
      color: #7b7b7b;
      margin-left: 10px;
      font-size: 12px;
    }
  }
  .body {
    padding: 0 25px;
    .category {
      font-size: 14px;
      color: #3dc279;
      margin-top: 10px;
    }
    .description {
      padding: 12px 0 20px;
      color: #7b7b7b;
    }
  }
  .operate {
    position: absolute;
    top: 0;
    right: -40px;
    i {
      display: block;
      font-size: 28px;
      color: #607e79;
      margin: 20px 0;
    }
  }
  &:hover {
    background: rgba(96, 126, 121, 0.18);
    color:#7d9cf0;
  }
}
</style>
