<template>
  <div id="app">
    <div class="draggable-header">
      <img src="../img/logo.png">
      <span>MRS Launcher</span>
      <button id="btnMiniSize"><i class="far fa-window-minimize"></i></button>
      <button id="btnFullSize"><i class="far fa-square"></i></button>
      <button id="btnExit"><i class="fas fa-times"></i></button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  //import loadheader from "../js/header.js"

  export default {
    name: 'mrs-electronjs-launcher',
  }
  //loadheader()

</script>

<style>
  /* CSS */
  @import "../css/headerstyle.css";
</style>
