<template>
    <div class="spring_square">
      <img class="spring_tree" :src="'./img/sakura_tree.png'" width="50%">
      <img class="spring_tree" :src="'./img/sakura_tree.png'" width="50%">
      <img class="spring_tree" :src="'./img/sakura_tree.png'" width="50%">
      <div class="petal">
        <img :src="'./img/sakura.png'" width="3%">
        <img :src="'./img/sakura.png'" width="3%">
        <img :src="'./img/sakura.png'" width="3%">
        <img :src="'./img/sakura.png'" width="3%">
        <img :src="'./img/sakura.png'" width="3%">
        <img :src="'./img/sakura.png'" width="3%">
      </div>
      <div class="spring_ground">
        <img class="petals" :src="'./img/petals.png'" width="40%">
        <img class="petals" :src="'./img/petals.png'" width="40%">
        <img class="petals" :src="'./img/petals.png'" width="40%">
      </div>
    </div>
</template>
<script>
export default {
}
</script>
