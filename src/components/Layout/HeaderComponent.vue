<template>
  <header class="bg-white shadow text-left">
    <div class="mx-auto max-w-7xl py-6">
      {{ $t("header.messagesCount") }} {{ store.getMessagesCount }}
      {{ $t("header.sentMessagesCount") }} {{ store.sentMessagesCount }}
    </div>
  </header>
</template>

<script setup lang="ts">
import { useMessagesStore } from "@/stores/messages";

const store = useMessagesStore();
</script>
