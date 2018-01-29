<!--Created by jyq on 2018/1/25.-->
<template>
  <div id="sort-content">
    <ul id="sort-ul">
      <li
        v-for="(h,index) in displayData"
        :style="{ height: h+'px' }"
        :key="index"
      >
        {{ h }}
      </li>
    </ul>
    <ul id="other-ul">
      <li v-for="text in texts">{{ text }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      displayData: [],
      texts: []
    };
  },
  methods: {
    querySort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
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
    bubbleSort(arr) {
      let reg = arr.length;
      const tempArr = arr.slice(0);
      while (reg) {
        let breakIndex = 0;
        for (let j = 0; j < reg - 1; j += 1) {
          if (tempArr[j].v > tempArr[j + 1].v) {
            [tempArr[j].v, tempArr[j + 1].v] = [tempArr[j + 1].v, tempArr[j].v];
            breakIndex = j + 1;
          }
        }
        reg = breakIndex;
      }
      return tempArr;
    },
    merge(left, right) {
      const result = [];
      while (left.length > 0 || right.length > 0) {
        result.push(left[0] < right[0] ? left.shift() : right.shift());
      }
      return result.concat(left).concat(right);
    },
    guibingSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);
      return this.merge(this.guibingSort(left), this.guibingSort(right));
    },
    extendExample() {
      function Super(name, age) {
        this.name = name;
        this.age = age;
        this.reg = 'super';
      }
      Super.prototype.sayName = function () {
        this.texts.push(this.name);
      };
      function sub(name, age) {
        this.name = name;
        this.age = age;
        this.subproperty = false;
      }


      function JQ(filter) {
        return new JQ.fn.Init(filter);
      }
      JQ.fn = JQ.proptotype = {
        constructor: JQ,
        Init(filter) {
          this.filter = filter;
        },
      };
      JQ.fn.Init.prototype = JQ.fn;
      JQ.fn.show = function () {
        console.log(`show:${this.filter}`);
      };
      JQ('123').show();
    },
  },
  created() {
    this.displayData = Array.from({ length: 40 }, () => Math.floor(Math.random() * 600));
    setTimeout(() => {
      this.extendExample();
      this.displayData = this.bubbleSort(this.displayData);
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
