<template>
  <div>
    <div class="tableContainer">
      <div class="tableItem">
        <table>
          <thead>
            <th v-for="(item,index) in 10" :key="index">{{item}}</th>
          </thead>
          <tbody>
            <td v-for="(item,index) in 10" :key="index">{{item}}</td>
          </tbody>
        </table>
      </div>
      <div class="tableItem">
        <table>
          <thead>
            <th v-for="(item,index) in 20" :key="index">{{item}}</th>
          </thead>
          <tbody>
            <td v-for="(item,index) in 20" :key="index">{{item}}</td>
          </tbody>
        </table>
      </div>
      <div class="tableItem">
        <table>
          <thead>
            <th v-for="(item,index) in 20" :key="index">{{item}}</th>
          </thead>
          <tbody>
            <td v-for="(item,index) in 20" :key="index">{{item}}</td>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Test",
    data () {
      return {}
    },
    methods:{}
  }
</script>

<style scoped>
  .tableContainer {
    width: 100vw;
    height: 80vh;
    border: 4px solid #d81;
    display: flex;
    flex-direction: row;
  }
  .tableItem:nth-child(1) {
    width: 20vw;
    height: 100%;
    border: 1px solid #7d1;
    overflow-x: scroll;
  }
  .tableItem:nth-child(2) {
    width: 50vw;
    height: 100%;
    border: 1px solid #711;
    overflow-x: scroll;
  }
  .tableItem:nth-child(3) {
    width: 30vw;
    height: 100%;
    border: 1px solid #2d4;
    overflow-x: scroll;
  }
</style>