<template>
  <div class="operate-bar">
    <div class="flexjbac">
      <span>{{total}} categorys</span>
      <el-button type="text" @click="handleAddCategory">New Category</el-button>
    </div>
    <div class="categorys">
      <div class="category-item flexjbac" v-for="item in categoryList" :key="item._id" @click="handleEnterCategory(item.title)">
        <div>{{item.title}}</div>
        <div class="flexjbac">
          <div class="total">{{item.artCount}} articles</div>
          <div class="edit" @click.stop="handleUpdateCategory(item)">
            <i class="el-icon-edit-outline"></i>
            <el-button type="text">Edit</el-button>
          </div>
          <div class="delete" @click.stop="handleDeleteCategory(item._id)">
            <i class="el-icon-delete"></i>
            <el-button type="text">Delete</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory
} from '@/api/getData'
export default {
  data () {
    return {
      total: 0,
      categoryList: []
    }
  },
  mounted () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      getCategoryList().then(res => {
        const { code, data, msg } = res
        if (code === 0) {
          this.categoryList = data
          this.total = data.length
          this.$emit('loadingChange')
        } else {
          this.$emit('loadingChange')
          this.$message.error(msg)
        }
      })
    },
    handleAddCategory () {
      this.$msgBox
        .prompt('请输入分类标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(({ value }) => {
          this.$emit('loadingChange')
          return addCategory({
            title: value
          }).then(res => {
            const { code, msg } = res
            if (code === 0) {
              this.getCategories()
              this.$message.success('创建成功')
            } else {
              this.$emit('loadingChange')
              this.$message.error(msg)
            }
          })
        })
    },
    handleEnterCategory (category) {
      this.$router.push('/article/' + category)
    },
    handleUpdateCategory (item) {
      this.$msgBox
        .prompt('请输入分类标题', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: item.title
        })
        .then(({ value }) => {
          this.$emit('loadingChange')
          return updateCategory({
            id: item._id,
            title: value
          }).then(res => {
            const { code, msg } = res
            if (code === 0) {
              this.getCategories()
              this.$message.success('修改成功')
            } else {
              this.$emit('loadingChange')
              this.$message.error(msg)
            }
          })
        })
    },
    handleDeleteCategory (id) {
      this.$emit('loadingChange')
      deleteCategory(id).then(res => {
        const { code, msg } = res
        if (code === 0) {
          this.getCategories()
        } else {
          this.$emit('loadingChange')
          this.$message.error(msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.operate-bar {
  margin-top: 25px;
  background: #ffffff;
  padding: 0 20px;
  border: 1px solid #e2e2e2;
  border-radius: 5px 5px 0 0;
}
.categorys {
  border-radius: 0 0 5px 5px;
  .category-item {
    cursor: pointer;
    height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #e7e7e7;
    background: #ffffff;
    box-shadow: 0 0 5px 0 #aaa;
    margin-top:10px;
    margin-bottom:10px;
    border-radius: 10px;
    &:hover {
    background: rgba(96, 126, 121, 0.18);
    }
    .total {
      margin-right: 10px;
    }
    .edit,
    .delete {
      margin-left: 10px;
      cursor: default;
      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
