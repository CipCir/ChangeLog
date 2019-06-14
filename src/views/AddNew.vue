<template>
  <div class="container">
    <h3>Add new record</h3>
    <form @submit.prevent="saveTask" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Version" type="text" v-model="version" required>
          <label class="active">Version:</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select v-model="categ" class="browser-default">
            <option v-for="opt in drop.shell.categ" :key="opt" :value="opt">{{opt}}</option>
          </select>
          <label class="active">Category:</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <select v-model="subcateg" class="browser-default">
            <option v-for="opt in drop.shell.subcat" :key="opt" :value="opt">{{opt}}</option>
          </select>
          <label class="active">Subcategory:</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Title" type="text" v-model="Title" required>
          <label class="active">Title:</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Description" type="text" v-model="Description" required>
          <label class="active">Description:</label>
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn green lighten-1">Save</button>
        <router-link to="/" class="btn grey right">Cancel</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import DataB from "../firebase/init.js";

export default {
  name: "AaddNew",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      drop: {
        shell: {
          categ: ["Cortex", "IIS_Shell"],
          subcat: ["Metadata", "Routing"]
        }
      },
      version: "",
      categ: "",
      subcateg: "",
      Title: "",
      Description: ""
    };
  },
  // mounted() {
  //   $(".dropdown-trigger").dropdown();
  // },
  methods: {
    saveTask() {
      //check if version exists
      let vueObj = this;
      DataB.ref(
        "Template/" +
          vueObj.version.replace(".", "_") +
          "/" +
          vueObj.categ +
          "/" +
          vueObj.subcateg
      ).push(
        {
          Title: vueObj.Title,
          descript: vueObj.Description
        },
        function(error) {
          if (error) {
            console.log(error);
          } else {
            vueObj.$router.push("/");
            console.log("task added");
          }
        }
      );
    }
  }
};
</script>
