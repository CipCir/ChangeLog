<template>
  <div id="app">
     <div class="row">
      <div class="col m2">
        <label for>Select DB</label>
        <select @change="readDB()" v-model="SelectedDB" class="browser-default teal lighten-4">
          <option v-for="opt in AppsArr" :key="opt" :value="opt">{{opt}}</option>
        </select>
      </div>
    </div>
    <router-view 
    v-if="SelectedDB!=''"
    :SelectedDB="SelectedDB"
    :DBObj="DBObj"/>
  </div>
</template>
<script>
import DataB from "./firebase/init.js";

export default {
  name: "App",
  data() {
    return {
      AppsArr: ["Template"],
      SelectedDB: "",
      DBObj: [],
    };
  },
  methods:{
    readDB() {
      var vueOBJ = this;
      this.$emit("")
      function sortVers(a, b) {
        if (a.vers > b.vers) return -1;
        if (a.vers < b.vers) return 1;
        return 0;
      }

      DataB.ref(vueOBJ.SelectedDB).on("value", snapshot => {
        vueOBJ.DBObj = [];
        const SnapObj = snapshot.val();
        for (var prop in SnapObj) {
          const Data = {
            vers: prop,
            lvls: SnapObj[prop],
            expanded: false
          };
          vueOBJ.DBObj.push(Data);
        }
        vueOBJ.DBObj.sort(sortVers);
        //expand the first element
        vueOBJ.DBObj[0].expanded = true;
        // vueOBJ.DBObj = JSON.parse(JSON.stringify(snapshot.val()));
      });
    },
  }
};
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 10px;
}
</style>
