<template>
  <div class="mb-6">
    <label for="default-input" class="block mb-2 text-sm font-medium">
      {{ $t("getMessage.enterUuid") }}
    </label>
    <input
      v-model="messageUuid"
      type="text"
      id="default-input"
      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
    <button
      @click="getMessage"
      class="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {{ $t("getMessage.read") }}
    </button>

    <div>
      <form v-if="store.recentlyReceivedMessage">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("common.timestamp") }}</label
          >
          <input
            v-model="store.recentlyReceivedMessage.timestamp"
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            readonly
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t("common.message") }}</label
          >
          <textarea
            v-model="store.recentlyReceivedMessage.message"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            readonly
          ></textarea>
        </div>
      </form>
      <div v-if="errorOccurred">Nieprawidłowe uuid</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import axios, { AxiosResponse } from "axios";
import { services } from "@/consts/services";
import { MessageInterface } from "@/interfaces/message";
import { useMessagesStore } from "@/stores/messages";

const store = useMessagesStore();

const messageUuid: Ref<string> = ref("");

const errorOccurred = ref<boolean>(false);

function getMessage() {
  axios
    .get(`${services.api}/message/${messageUuid.value}`)
    .then((response: AxiosResponse<MessageInterface>) => {
      store.recentlyReceivedMessage = response.data;
      errorOccurred.value = false;
    })
    .catch(() => {
      errorOccurred.value = true;
      store.$resetRecentlyReceivedMessage();
    });
}
</script>

<style></style>
