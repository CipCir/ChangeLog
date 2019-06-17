<template>
  <div class="pageCont">
   
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
      <div id="EditorCont" class="col s12 m6 deep-purple lighten-5 z-depth-1">
        
        <EditSel
         v-if="Editor=='Edit'"
         :selctedRec="selctedRec"
         :SelectedDB="SelectedDB"
         v-on:SelectionReset="ResetSelection()"
        />
       
        <Addnew 
        v-if="Editor=='AddNew'"
        :SelectedDB="SelectedDB"
        v-on:EditorUpd="UpdateEditor($event)"
        />
      </div>
      <!-- add new -->
    </div>
    <div class="navigation">
      <span 
      @click="Editor='AddNew'"
      v-if="Editor!='AddNew'"
      class="btn-floating btn-large right waves-effect waves-light blue">
        <i class="material-icons">add</i>
      </span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DataB from "../firebase/init.js";
import Addnew from "./AddNew"
import EditSel from "./EditSelected"

export default {
  name: "treeView",
  components:{Addnew,EditSel},
  props: {
    DBObj: Array,
    SelectedDB: String
  },
  data() {
    return {
      Editor:null,
      // DBObj: [],
      selctedRec: null
    };
  },

  methods: {
    ResetSelection(){
      this.selctedRec=null,
      this.Editor=""
    },
    UpdateEditor(pay) {
      this.Editor=pay
    },
    SelectRec(rec, p, p1, p2, p3) {
      this.selctedRec = JSON.parse(JSON.stringify(rec));
      this.selctedRec.id = p + "/" + p1 + "/" + p2 + "/" + p3;
      this.selctedRec.lvl_0=p.replace("_",".")
      this.selctedRec.lvl_1=p1
      this.selctedRec.lvl_2=p2
      this.Editor="Edit"
    },
   
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

