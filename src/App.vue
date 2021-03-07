<template>
  <div class="header">
    <h1>Map Integration Task Demo</h1>
  </div>
  <GoogleMap />
  <MarkList style="position:absolute;"/>
</template>

<script>
  import GoogleMap from './components/GoogleMaps'
  import MarkList from "./components/MarkList";


  export default {

    name: 'App',
    components:{
      GoogleMap,
      MarkList
    }
  }

</script>

<style>
  body{
    background-color: rgba(227, 227, 227, 0.62);
  }

  .header{
    text-align: center;
    height: 5vh;
  }
</style>
