<template>
  <div class="container">
    <h4>Edit selected</h4>
    <div class="row">
      <label>Version</label>
      <textarea v-model="selctedRec.lvl_0"></textarea>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <select v-model="selctedRec.lvl_1" class="browser-default">
          <option v-for="opt in drop.shell.categ" :key="opt" :value="opt">{{opt}}</option>
        </select>
        <label class="active">Category:</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <select v-model="selctedRec.lvl_2" class="browser-default">
          <option v-for="opt in drop.shell.subcat" :key="opt" :value="opt">{{opt}}</option>
        </select>
        <label class="active">Subcategory:</label>
      </div>
    </div>

    <div class="row">
      <label>Title</label>
      <textarea v-model="selctedRec.Title"></textarea>
    </div>
    <div class="row">
      <label>Description</label>
      <textarea v-model="selctedRec.descript"></textarea>
    </div>
    <div class="row">
      <div class="col">
        <span class="btn" @click="UpdateR()">Update</span>
      </div>
      <div class="col">
        <span class="btn brown lighten-3" @click="$emit('SelectionReset')">Cancel</span>
      </div>
      <div class="btn red right" @click="DeleteR()">
        <i class="material-icons">delete_forever</i>
      </div>
    </div>
  </div>
</template>
<script>
import DataB from "../firebase/init.js";
export default {
  name: "Edit",
  props: {
    selctedRec: Object,
    SelectedDB: String
  },
  data() {
    return {
      drop: {
        shell: {
          categ: ["Cortex", "IIS_Shell"],
          subcat: ["Metadata", "Routing"]
        }
      },
      origRec: null
    };
  },
  mounted() {
    this.origRec = JSON.parse(JSON.stringify(this.selctedRec));
  },
  methods: {
    UpdateR() {
      let vueOBJ = this;
      let reWrite = false;
      if (
        this.origRec.lvl_0 != this.selctedRec.lvl_0 ||
        this.origRec.lvl_1 != this.selctedRec.lvl_1 ||
        this.origRec.lvl_2 != this.selctedRec.lvl_2
      ) {
        reWrite = true;
      }
      if (reWrite) {
        DataB.ref(vueOBJ.SelectedDB + "/" + vueOBJ.selctedRec.id).remove();
        DataB.ref(
          vueOBJ.SelectedDB +
            "/" +
            vueOBJ.selctedRec.lvl_0.replace(".","_") +
            "/" +
            vueOBJ.selctedRec.lvl_1 +
            "/" +
            vueOBJ.selctedRec.lvl_2
        )
          .push({
            Title: vueOBJ.selctedRec.Title,
            descript: vueOBJ.selctedRec.descript
          })
          .then(stat => {
            console.log("update done");
            vueOBJ.$emit("SelectionReset");
          });
      } else {
        DataB.ref(vueOBJ.SelectedDB + "/" + vueOBJ.selctedRec.id)
          .update({
            Title: vueOBJ.selctedRec.Title,
            descript: vueOBJ.selctedRec.descript
          })
          .then(stat => {
            console.log("update done");
            vueOBJ.$emit("SelectionReset");
          });
      }
    },
    DeleteR() {
      let vueOBJ = this;
      DataB.ref(vueOBJ.SelectedDB + "/" + vueOBJ.selctedRec.id)
        .remove()
        .then(stat => {
          console.log("update done");
          vueOBJ.$emit("SelectionReset");
        });
    }
  }
};
</script>
