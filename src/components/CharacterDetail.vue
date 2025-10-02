<template>
  <div class="character-detail">
    
    <div v-if="character" class="character-detail__content">
      <picture class="character-detail__media">
        <img :src="character.image" :alt="character.name">
      </picture>
      <div class="character-detail__info">
        <h2 class="character-detail__title">{{ character.name }}</h2>
        <ul class="character-properties character-properties--detail">
          <li>Status: <strong>{{ character.status }}</strong></li>
          <li>Species: <strong>{{ character.species }}</strong></li>
          <li>Gender: <strong>{{ character.gender }}</strong></li>
          <li>Origin: <strong>{{ character.origin.name }}</strong></li>
          <li>Location: <strong>{{ character.location.name }}</strong></li>
          <li>Created Date: <strong>{{ character.createdFormatted }}</strong></li>
        </ul>
      </div>
    </div>
    
    <LoadingSpinner v-else-if="loading" />
    
    
    <div v-else class="error">
      <p>Character not found</p>
    </div>

    
    <a href="/" class="btn" @click.prevent="goBack">Back to List</a>
  </div>
</template>

<script>
import { CharacterService } from '../services/api.js'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'CharacterDetail',
  components: {
    LoadingSpinner
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return { 
      character: null,
      loading: true
    }
  },
  async mounted() {
    if (this.$route.query && Object.keys(this.$route.query).length) {
      this.$router.replace({ path: this.$route.path })
    }
    await this.loadCharacter()
  },
  watch: {
    id() {
      this.loadCharacter()
    }
  },
  methods: {
    async loadCharacter() {
      this.loading = true
      this.character = null
      try {
        this.character = await CharacterService.getCharacterById(this.id);
      } catch (error) {
        console.error('Error loading character:', error);
      } finally {
        this.loading = false;
      }
    },
    goBack() {
      const canGoBack = window.history.state && window.history.state.back
      if (canGoBack) {
        this.$router.go(-1)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .character-detail {
    -webkit-user-select:none;
    user-select:none;
    &__content {
      display:grid;
      grid-template-columns:max(300px) 1fr;
      gap:1.5rem;
      margin-bottom:4rem;
      @media(max-width:768px) {
        grid-template-columns:25% 1fr;
      }
    }
    &__info {
      display:flex;
      flex-direction:column;
      gap:0.5rem;
    }
    &__media {
      display:block;
      overflow:hidden;
      border-radius:0.5rem;
      img {
        display:block;
      }
    }
  }
</style>
