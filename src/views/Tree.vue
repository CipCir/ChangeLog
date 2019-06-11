<template>
  <div class="pageCont">
    {{version}}
    <div class="row">
      <div id="treeCont" class="col s6 blue lighten-5 left-align">        
        <div class="vers" v-for="versRec in treeObj" :key="versRec.vers">
         + Version: {{versRec.vers}}
          <div class="Categs" v-for="(cats,cIndx) in versRec.categs" :key="cIndx">
            Categories: {{cats.lbl}}
            <div class="SubCats" v-for="(subCats,sIndx) in cats.subcats" :key="sIndx">
              Subcategs: {{subCats.lbl}}
              <div class="Recs" v-for="rec in subCats.recds" :key="rec.id">
                <span>{{rec.title}}</span>--
                <span>{{rec.user}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="EditorCont" class="col s6 amber lighten-5">Editor</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DataB from "../firebase/init.js";

export default {
  name: "home",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      version: "",
      treeObj: [
        {
          vers: "0.9",
          categs: [
            {
              lbl: "Shell MDD",
              subcats: [
                {
                  lbl: "metadata",
                  recds: [
                    { id: 1, title:"tit1",descript: "ced s-a modificat", user: "cip cir" },
                    { id: 2, title:"tit2",descript: "ce s-a modificat 2", user: "cip cir" }
                  ]
                },
                {
                  lbl: "routing",
                  recds: [
                    { id: 3,title:"tit3",descript: "routing ce s-a modificat",user: "cip cir"},
                    { id: 4,title:"tit4",descript: "routing ce s-a modificat 2",user: "cip cir"}
                  ]
                }
              ]
            },
            {
              lbl: "Cortex MDD",
              subcats: [
                {
                  lbl: "metadata",
                  recds: [
                    { id: 1, title:"tit1",descript: "ced s-a modificat", user: "cip cir" },
                    { id: 2, title:"tit2",descript: "ce s-a modificat 2", user: "cip cir" }
                  ]
                },
                {
                  lbl: "routing",
                  recds: [
                     { id: 3,title:"tit3",descript: "routing ce s-a modificat",user: "cip cir"},
                    { id: 4,title:"tit4",descript: "routing ce s-a modificat 2",user: "cip cir"}
                  ]
                }
              ]
            }
          ]
        },
    {
          vers: "1.0",
          categs: [
            {
              lbl: "Shell MDD",
              subcats: [
                {
                  lbl: "metadata",
                  recds: [
                    { id: 1, descript: "ced s-a modificat", user: "cip cir" },
                    { id: 2, descript: "ce s-a modificat 2", user: "cip cir" }
                  ]
                },
                {
                  lbl: "routing",
                  recds: [
                    { id: 3,descript: "routing ce s-a modificat",user: "cip cir"},
                    { id: 4,descript: "routing ce s-a modificat 2",user: "cip cir"}
                  ]
                }
              ]
            }
        
          ]
        },
      ]
    };
  },
  created() {
    var vueOBJ = this;
    DataB.ref("Shell/version").once("value", snapshot => {
      vueOBJ.version = snapshot.val();
    });
  }
};
</script>
<style scoped>
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
  margin-left: 20px;
}
</style>

