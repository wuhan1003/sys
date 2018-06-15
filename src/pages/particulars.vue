<template>
  <section class="pages-particulars">
    <ul class="particularsList clearfix">
      <li class="title clearfix">
        <p class="com">APPID：</p>
        <p class="com">{{tableData.id}}</p>
      </li>
      <li class="title clearfix">
        <p class="com">兑换比例：</p>
        <p class="com">{{tableData.exchangeRatio}}</p>
      </li>
      <li class="title clearfix">
        <p class="com">消费接口：</p>
        <p class="com">{{tableData.consumeCallBackUrl}}</p>
      </li>
      <li class="liLast">
        <el-button type="primary" onClick="javascript:history.back()" class="last">返回</el-button>
      </li>

    </ul>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {}
      }
    },
    methods: {
      //获取列表数据
      getList(id) {
        this.$http({
          url: `/api/app/getById?id=${id}`,
          method: 'get'
        }).then(res => {
          if (res.data.code === 100001) {
            console.log(res.data.data.appInfo);
            this.tableData = res.data.data.appInfo
          }
        }).catch(err => console.log(err))
      }
    },
    created() {
      const num = this.$route.params.id
      this.getList(num)
    }
  }
</script>

<style scoped>
  .particularsList {
    width: 600px;
    margin: 10px auto;
    /* border:1px solid #e1e1e1;  */
    margin-top:5rem;
  }
  .com {
    line-height: 36px;
    font-size: 14px;
    float: left;
    padding-left: 10px;
  }
  .liLast{
    text-align: center;
    margin: 6px 0;
    margin-top:3rem;
}
</style>
