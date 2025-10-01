<template>
  <div class="container">
    <router-view v-slot="{ Component }">
      <keep-alive include="CharacterList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>