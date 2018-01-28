<template>
  <div id="newmodal">

<button onclick="document.getElementById('id01').style.display='flex'" class="w3-btn">
  <slot name="triggerModal">Open Modal</slot>
 </button>

<div id="id01" class="w3-modal">
  <div class="w3-modal-content w3-card-4 w3-animate-zoom">
    <header class="w3-container blue"> 
      <span onclick="document.getElementById('id01').style.display='none'" 
      class="w3-closebtn">×</span>
    <h2 class="blue">  <slot name="modal-title">
      Title
      </slot></h2>
    </header>
    <div class="w3-container">
      
      <div>
        <slot name="modal-content">
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quidem, eius tenetur sint repellendus iusto voluptatibus ab totam cupiditate beatae? Eius, quas hic aliquam possimus iste ex itaque quibusdam facere.
      </slot>
       
      </div>
    </div>
    <!-- <footer class="w3-container w3-teal">
      <p>Modal Footer</p>
    </footer> -->
  </div>
</div>
 <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'modal'
}
</script>
<style scoped>
.hide {
  display: none !important;
}
.transparent {
  background-color: transparent !important;
    background-color: rgba(0,0,0,0) !important;
}
span.w3-closebtn {
    cursor: pointer;
    float: right;
    font-weight: 400;
    font-size: 1.6rem;
}
#id01 > div{
  width: 45% !important;
}
#id01 > div > header > h2 {
    font-size: 2.3rem;
    font-weight: 400;
    text-align: center;
    line-height: 25%;
}

</style>
