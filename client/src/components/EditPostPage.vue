<template lang="pug">
  section.edit
    h1
      | edit post
    form(@submit.prevent="editPost")
      div
        input(type="text" name="title" placeholder="title" v-model.trim="post.title")
      div
        input(type="text" name="description" placeholder="description" v-model.trim="post.description")
      div
        button(type="submit" name="editPost")
          | edit post
    div
      router-link(:to="{ name: 'Posts' }")
        | go to list of Posts
</template>

<script>
import PostsService from '../services/PostsService'

export default {
  name: 'EditPost',
  data() {
    return {
      post: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    async getPost() { // как только получаем данные с сервера, записываем в компонент
      const response = await PostsService.getPost({ id: this.$route.params.id })
      this.post.title = response.data.title
      this.post.description = response.data.description
    },
    async editPost() {
      if (this.post.title !== '' && this.post.description !== '') {
        await PostsService.updatePost({ // передаем объект методу, он при помощи axios отправит на сервер
          id: this.$route.params.id,
          title: this.post.title,
          description: this.post.description
        })
        this.$router.push({ name: 'Posts' }) // возвращаемся на страницу со списком всех записей
      }
    }
  },
  mounted() {
    this.getPost()
  },
}
</script>