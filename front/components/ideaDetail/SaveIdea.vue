<template>
  <span>
    <v-btn icon @click="toggleIsSaved">
      <v-icon v-if="isLoading">fas fa-circle-notch fa-spin</v-icon>
      <div v-else class="d-flex align-center">
        <img
          v-if="isSaved"
          class="icon"
          src="~/assets/images/idea-card/save-filled.png"
        />
        <img v-else class="icon" src="~/assets/images/idea-card/save.png" />
        <span class="count">{{ idea.savesCount || 0 }}</span>
      </div>
    </v-btn>
  </span>
</template>
<script>
import getIsIdeaSavedByMe from '@/graphql/query/getIsIdeaSavedByMe'
import saveIdea from '@/graphql/mutations/saveIdea'
import unsaveIdea from '@/graphql/mutations/unsaveIdea'

export default {
  name: 'SaveIdea',
  props: {
    isSaved: { type: Boolean, required: true },
    idea: { type: Object, required: true },
    isLoading: Boolean,
    isLoggedIn: Boolean
  },

  watch: {
    idea() {
      this.initIdeaState()
    }
  },

  mounted() {
    this.initIdeaState()
  },

  methods: {
    initIdeaState() {
      if (!this.$route.query.aa && this.isLoggedIn) {
        this.$emit('is-saved-by-me', getIsIdeaSavedByMe)
      }
    },

    toggleIsSaved() {
      if (this.isLoading) {
        return
      }

      if (this.isLoggedIn) {
        if (!this.isSaved) {
          this.$emit('save-idea', saveIdea)
        } else {
          this.$emit('unsave-idea', unsaveIdea)
        }
      } else {
        this.$emit('show-auth')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.icon {
  height: 18px;
}

.action-button {
  color: #ffb92d !important;
  &:hover {
    color: rgba(255, 185, 45, 0.76) !important;
  }
  width: 15px;
}

.count {
  font-size: 14px;
  padding-top: 3px;
  padding-left: 4px;
}
</style>
