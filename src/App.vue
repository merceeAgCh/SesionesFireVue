<script setup lang="ts">
  import { RouterView, useRoute, useRouter } from 'vue-router'
  import { useTodoStore } from './stores/todos.store'
  import { useUserStore } from './stores/user.store'
  import { authService } from './services/auth.service'
  import { ref, watch } from 'vue'

  const userStore = useUserStore()
  const todoStore = useTodoStore()
  const router = useRouter()
  const route = useRoute()
  const selectedKeys = ref(['login'])

  watch(
    () => route.name,
    () => {
      selectedKeys.value = [route.name!.toString()]
    }
  )

  const logout = () => {
    authService
      .logout()
      .then(() => {
        router.replace('/login')
        userStore.$reset()
        todoStore.$reset()
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  userStore.listenToAuthState()
</script>

<template>
  <a-layout>
    <a-layout-header class="head">
      <a-menu mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="login" v-if="!userStore.user">
          <router-link to="/login">Ingresar</router-link>
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.user">
          <router-link to="/register">Registrate</router-link>
        </a-menu-item>
        <a-menu-item key="home" v-if="userStore.user">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="profile.edit" v-if="userStore.user">
          <router-link to="/profile">Perfil</router-link>
        </a-menu-item>
        <a-menu-item key="logout" v-if="userStore.user">
          <a-button type="text" @click="logout" class="color: #fff">Salir</a-button>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 3rem">
      <RouterView />
    </a-layout-content>
    <a-layout-footer class="foo" >Pruebitas</a-layout-footer>
  </a-layout>
</template>
<style scoped>
.foo{
  background-color: indianred;
  position: fixed;
  bottom: 0; right: 0; left: 0;
}
.head{
  background-color: indianred;
}
</style>