<!--Created by jyq on 2018/1/25.-->
<template>
  <div id="sort-content">
    <ul id="sort-ul">
      <li
        v-for="(h,index) in displayData"
        :style="{ height: h.v+'px' }"
        :class="h.c"
        :key="index"
      >
        {{ h.v }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      displayData: [],
    };
  },
  methods: {
    querySort(arr, start = 0, _end = 0) {
      const end = _end || arr.length - 1;
      if ((end - start) <= 1) {
        return arr;
      }
      const lArr = arr.slice(0, start);
      const rArr = arr.slice(end, arr.length - 1);
      const cArr = arr.slice(start, end);
      const midIndex = Math.floor(arr.length / 2);
      const mid = arr[midIndex];
      const leftArr = [];
      const rightArr = [];
      mid.c = 'mid';
      arr.forEach((v, i) => {
        if (i !== midIndex) {
          if (v.v <= mid.v) {
            leftArr.push(v);
          } else {
            rightArr.push(v);
          }
        }
      });
      mid.c = 'sorted';
      return [
        ...this.querySort(leftArr),
        mid,
        ...this.querySort(rightArr)];
    },
  },
  created() {
    this.displayData = Array.from({ length: 40 }, () => ({ v: Math.floor(Math.random() * 600), c: '' }));
    setTimeout(() => {
      this.displayData = this.querySort(this.displayData);
    }, 3000);
  },
};

</script>

<style lang="less" scoped>
  #sort-content {
    width: 100%;
    height: 600px;
    #sort-ul {
      list-style: none;
      display: flex;
      align-items: flex-end;
      & > li {
        width: 15px;
        background-color: cornflowerblue;
        margin-left: 10px;
        &.mid {
          background-color: green;
        }
        &.sorting {
          background-color: yellow;
        }
        &.sorted {
          background-color: cadetblue;
        }
      }
    }
  }
</style>
