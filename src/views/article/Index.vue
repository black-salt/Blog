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
      articleList: [],
      showList: []
    }
  },
  methods: {
    getArticlePaged () {
      getArticleList().then(res => {
        const { code, data, msg } = res
        if (code === 0) {
          const tempArr = data.data.map(item => {
            item.created = item.created.split(' ')[0]
            return item
          })
          this.articleList = tempArr
          this.getShowList()
        }
      })
    },
    getShowList () {
      if (this.$route.params.category) {
        this.showList = this.articleList.filter((item) => { return this.$route.params.category === item.category })
        this.$emit('loadingChange')
      } else {
        this.showList = this.articleList
        this.$emit('loadingChange')
      }
    },
    handleDeleteArticle (id) {
      this.$emit('loadingChange')
      deleteArticle(id).then(res => {
        const { code, msg } = res
        if (code === 0) {
          this.getArticlePaged()
          this.$message.success('删除成功！')
        } else {
          this.$emit('loadingChange')
          this.$message.error('删除失败')
        }
      })
    },
    goArticleDetail (id) {
      this.$router.push('/articleDetail?id=' + id)
    }
  },
  mounted () {
    this.getArticlePaged()
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
      color: #7b7b7b;
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
