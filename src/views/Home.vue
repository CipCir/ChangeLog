<template>
  <div class="home">
    <h1>Edit</h1>    
    {{version}}
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import DataB from '../firebase/init.js'

export default {
  name: 'home',
  // components: {
  //   HelloWorld
  // },
  data(){
    return {
      version:""
    }
  },
  created(){
    var vueOBJ=this
    DataB.ref("Shell/version").once("value",snapshot=>{      
      vueOBJ.version=snapshot.val()
    })
  }
 
}
</script>
