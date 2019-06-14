<template>
  <div class="pageCont">
    <div class="row">
      <div class="col m2">
        <label for>Select DB</label>
        <select @change="readDB()" v-model="SelectedDB" class="browser-default teal lighten-4">
          <option v-for="opt in AppsArr" :key="opt" :value="opt">{{opt}}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div id="treeCont" class="col s12 m6 z-depth-1">
        <div class="vers" v-for="itm in DBObj" :key="itm.vers">
          <div @click="itm.expanded=!itm.expanded" class="clickable blue-grey lighten-5">
            <span v-if="itm.expanded">
              <i class="material-icons tiny">expand_less</i>
            </span>
            <span v-else>
              <i class="material-icons tiny">expand_more</i>
            </span>
            Version: {{itm.vers.replace("_",".")}}
          </div>
          <div v-if="itm.expanded">
            <div class="Categ cont" v-for="(v1, k1, i1)  in itm.lvls" :key="i1">
              <span class="catLbl">{{k1}}</span>
              <div class="SubCats" v-for="(v2, k2, i2) in v1" :key="i2">
                <span class="SubCatLbl">{{k2}}</span>
                <ul
                  class="Recs browser-default"
                  v-for="(rec,k3) in v2"
                  :key="k3"
                  @click="SelectRec(rec,itm.vers,k1,k2,k3)"
                >
                  <li>
                    <div>{{rec.Title}}</div>
                    <div class="descCont">{{rec.descript}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="EditorCont" class="col s12 m6 deep-purple lighten-5">
        Editor
        <div v-if="selctedRec!=null" class="container">
          <div class="row">
            <label>Title</label>
            <textarea v-model="selctedRec.Title"></textarea>
          </div>
          <div class="row">
            <label>Description</label>
            <textarea v-model="selctedRec.descript"></textarea>
          </div>
          <div class="row">
            <div class="btn" @click="UpdateR()">Update</div>
            <div class="btn red right" @click="DeleteR()">
              <i class="material-icons left">delete_forever</i>
              Delete
            </div>
          </div>
        </div>
      </div>
      <!-- add new -->
    </div>
    <div class="navigation">
      <router-link to="/AddNew" class="btn-floating btn-large right waves-effect waves-light blue">
        <i class="material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DataB from "../firebase/init.js";

export default {
  name: "home",
  // props: {
  //   dbName: String
  // },
  data() {
    return {
      version: "",
      SelectedDB: "",
      AppsArr: ["Template"],

      DBObj: [],
      selctedRec: null
    };
  },

  methods: {
    readDB() {
      var vueOBJ = this;

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
    SelectRec(rec, p, p1, p2, p3) {
      this.selctedRec = JSON.parse(JSON.stringify(rec));
      this.selctedRec.id = p + "/" + p1 + "/" + p2 + "/" + p3;
    },
    UpdateR() {
      let vueOBJ = this;
      DataB.ref(vueOBJ.SelectedDB + "/" + vueOBJ.selctedRec.id)
        .update({
          Title: vueOBJ.selctedRec.Title,
          descript: vueOBJ.selctedRec.descript
        })
        .then(stat => {
          console.log("update done");
          vueOBJ.selctedRec = null;
        });
    },
    DeleteR() {
      let vueOBJ = this;
      DataB.ref(vueOBJ.SelectedDB + "/" + vueOBJ.selctedRec.id)
        .remove()
        .then(stat => {
          console.log("update done");
          vueOBJ.selctedRec = null;
        });
    }
  }
};
</script>
<style scoped>
#treeCont {
  padding: 10px 5px;
}
#EditorCont {
  min-height: 80vh;
}
.vers {
  margin-left: 5px;
  margin-bottom: 10px;
}
.Categs {
  margin-left: 10px;
  margin-bottom: 5px;
}
.SubCats {
  margin-left: 15px;
}
.Recs {
  /* margin-left: 20px; */
  cursor: pointer;
}
.Recs:hover {
  background: lightblue;
}
.catLbl {
  font-weight: bolder;
}
.SubCatLbl {
  font-weight: 700;
  color: grey;
}
.descCont {
  font-family: "Courier New", Courier, monospace;
  margin-left: 5px;
  margin-bottom: 5px;
}
.navigation {
  width: 98vw;
}
.clickable {
  cursor: pointer;
}
</style>

