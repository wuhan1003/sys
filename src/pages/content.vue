<template>
  <div class="container">
    <div>
      <div class="title">{{titleName}}</div>
      <el-button type="primary" @click="add()"   size="mini" style="margin: 6px">创建新项目</el-button>
    </div>
    <el-table
      v-loading="loading"
      border
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="项目名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="id"
        label="APPID">
      </el-table-column>
      <el-table-column
        prop="regDate"
        label="创建时间"
       >
        <template slot-scope="scope">
          {{dataFormate(scope.row.regDate)}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
          <!--</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
          <el-button
            size="mini"
            @click="handleCheck(scope.$index, scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="objType"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form label-width="80px" :model="EditObj" label-position="left">
        <el-form-item label="项目名称">
          <el-input v-model="EditObj.name"></el-input>
        </el-form-item>
        <el-form-item label="兑换比例">
          <el-input v-model="EditObj.exchangeRatio"></el-input>
        </el-form-item>
        <el-form-item label="消费接口">
            <el-input v-model="EditObj.consumeCallBackUrl"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editConfirm()" v-if="objType == '编辑'">确 定</el-button>
    <el-button type="primary" @click="addConfirm()" v-else>确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import changeDate from '../util/changDate/changeDate'

  export default {
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        objType: '新增',
        indexId: null,
        EditObj: {},
        titleName:'',
        loading:true
      }
    },
    methods: {
      // 新增
      add() {
        this.EditObj = {}
        this.dialogVisible = true
        this.objType = '新增'
      },
      // 新增确定
      addConfirm() {
        const params = {
          clientId: JSON.parse(sessionStorage.getItem('userInfo')).userInfo.id,
          name:this.EditObj.name,
          exchangeRatio: this.EditObj.exchangeRatio,
          consumeCallBackUrl:this.EditObj.consumeCallBackUrl
        }
        this.dialogVisible = false
        this.$http({
          url: './api/app/add',
          method: 'post',
          data: params
        }).then(res => {
          if( res.data.code === 100001){
            this.getList()
          }
        }).catch(err => console.log(err))
      },
      //查看
      handleCheck(index, row) {
        this.$router.push({name: 'particulars', params: {id:row.id}})
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      dataFormate(time) {
        return changeDate(time)
      },
      //获取列表数据
      getList() {
        const userInfo = JSON.parse(sessionStorage.getItem('userInfo')).userInfo;
        const params = {
          clienName: userInfo.clientName,
          phone: userInfo.phone
        }
        this.$http({
          url: './api/app/list',
          method: 'post',
          data: params
        }).then(res => {
          if (res.data.code === 100001) {
            this.loading = false
              this.tableData = res.data.data.list;
              this.titleName = userInfo.clientName
          }
        }).catch(err => console.log(err))
      }
    },
    created() {
      this.getList();
    }
  }
</script>
<style scoped>
  .el-table__header-wrapper tr th{
    background: #e8e8e8;
  }
  .title{
    display: inline-block;
    width: 100px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 16px;
    background-color: #f5f5f5;
  }
</style>
