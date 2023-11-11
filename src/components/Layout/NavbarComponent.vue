<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img
              class="h-8 w-auto"
              src="../../assets/logo.png"
              alt="Multiplay Logo"
            />
          </div>
          <div class="block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link
                v-for="(item, index) in menuItems"
                :key="index"
                :to="item.to"
                exact-active-class="bg-gray-900"
                class="text-white rounded-md px-3 py-2 text-sm font-medium"
                >{{ $t(item.translation) }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface MenuItem {
  translation: string;
  to: string;
}

const menuItems: MenuItem[] = [
  { translation: "nav.home", to: "/" },
  { translation: "nav.sendMessage", to: "/send-message" },
  { translation: "nav.getAllMessages", to: "/get-all-messages" },
  { translation: "nav.getMessage", to: "/get-message" },
];
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
