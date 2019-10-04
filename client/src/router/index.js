import Vue from 'vue'
import Router from 'vue-router'
import PostsPage from '@/components/PostsPage'
import NewPost from '@/components/NewPostPage'
import EditPost from '@/components/EditPostPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Posts',
      component: PostsPage
    },
    {
      path: '/posts/new',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/posts/:id',
      name: 'EditPost',
      component: EditPost
    }
  ]
})
