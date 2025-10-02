<template>

    <LoadingSpinner v-if="loading && characters.length === 0" />
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="character-list">
        <div 
          v-for="character in characters" 
          :key="character.id"
          class="character-list__item"
          @click="goToCharacter(character.id)"
        >
          
          <picture class="character-list__media">
            <img :src="character.image" :alt="character.name" class="">
          </picture>
          <div class="character-info">
            <h2>{{ character.name }}</h2>
            <ul class="character-properties character-properties--list">
              <li>Status: {{ character.status }}</li>
              <li>Species: {{ character.species }}</li>
              <li>Gender: {{ character.gender }}</li>
            </ul>
          </div>
        </div>
        <LoadingSpinner v-if="loadingMore" />
    </div>
  
</template>

<script>
import { CharacterService } from '../services/api.js'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'CharacterList',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      characters: [],
      loading: true,
      loadingMore: false,
      currentPage: 1,
      hasNextPage: true,
      error: null
    }
  },
  async mounted() {
    if (this.characters.length === 0) {
      await this.loadCharacters()
      this.setupInfiniteScroll()
    }
    this.restoreScrollPosition()
  },
  beforeUnmount() {
    if (this.handleScroll) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadCharacters() {
      try {
        const result = await CharacterService.getCharactersPage(this.currentPage)
        this.characters.push(...result.characters)
        this.hasNextPage = result.hasNextPage
        this.currentPage++
      } catch (error) {
        this.error = 'Failed to load characters'
        console.error('Error loading characters:', error)
      } finally {
        this.loading = false
      }
    },
    
    async loadMoreCharacters() {
      if (this.loadingMore || !this.hasNextPage) return
      
      this.loadingMore = true
      try {
        await this.loadCharacters()
      } finally {
        this.loadingMore = false
      }
    },
    
    setupInfiniteScroll() {
      this.handleScroll = () => {
        if (this.isNearBottom()) {
          this.loadMoreCharacters()
        }
      }
      window.addEventListener('scroll', this.handleScroll)
    },
    
    isNearBottom() {
      return window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    },
    
    goToCharacter(id) {
      sessionStorage.setItem('characterListScrollPosition', window.scrollY)
      this.$router.push(`/character/${id}`)
    },
    
    restoreScrollPosition() {
      const savedPosition = sessionStorage.getItem('characterListScrollPosition')
      if (savedPosition) {
        this.$nextTick(() => {
          window.scrollTo(0, parseInt(savedPosition))
          sessionStorage.removeItem('characterListScrollPosition')
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .character-list {
    display:grid;
    grid-template-columns: repeat(5, 1fr) ;
    gap:1.5rem;
    @media(max-width:768px) {
      grid-template-columns:repeat(3, 1fr);
    }
    @media(max-width:420px) {
      grid-template-columns:repeat(2, 1fr);
    }
    &__item {
      display:flex;
      gap:0.5rem;
      flex-direction:column;
      cursor:pointer;
      -webkit-user-select:none;
      user-select:none;
      &:hover {
        .character-list__media {
          border-radius:0.5rem;
          img {
            transform:scale(1);
          } 
        }
      }
    }
    &__media {
      display:block;
      border-radius:0.5rem 0.5rem 0 0;
      aspect-ratio:1 / 1;
      overflow:hidden;
      transition:border-radius var(--transition-duration) var(--transition-style-ease-in-out);
      img {
        display:block;
        transform-origin:center center;
        transform:scale(1.1);
        transition:transform var(--transition-duration) var(--transition-style-ease-in-out);
        will-change:transform;
      }
    }
  }
</style>