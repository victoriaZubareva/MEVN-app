<template lang="pug">
  .container
    .row
      .col-xs-12
        h1
          | Add New Post
        form(@submit.prevent="addPost")
          .form-group
            input.form-control(type="text", name="title", id="title", placeholder="title", v-model.trim="post.title")
          .form-group
            textarea.form-control(type="text", name="description", id="description", placeholder="description" v-model.trim="post.description")
          .form-group
            button.btn.btn-block.btn-primary(type="submit", name="addPost", id="addPost")
              | add new post
          section
            button.btn.btn-success.btn-block(type="button", @click="goBack()")
              | go to posts page  
</template>

<script>
import PostsService from '../services/PostsService'

export default {
  name: 'NewPost',
  data() {
    return {
      post: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async addPost() {
      if( this.post.title !== '' && this.post.description !== '') {
        await PostsService.addNewPost({
          title: this.post.title,
          description: this.post.description
        })
        this.$router.push({ name: 'Posts' }) // как только выполнится возвращаемся на страницу со всеми постами
      } else {
        alert('Empty fields!')
      }
    },
    goBack() {
      this.$router.push({ name: 'Posts' })
    }
  },
}
</script>