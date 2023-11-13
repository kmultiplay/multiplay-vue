<template>
  <div class="container text-left">
    <div class="mb-6">
      <label for="message-uuid" class="block mb-2 text-sm font-medium">
        {{ $t("getMessage.enterUuid") }}
      </label>
      <input
        v-model="messageUuid"
        type="text"
        id="message-uuid"
        class="border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
      <button
        @click="getMessage"
        class="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        {{ $t("getMessage.read") }}
      </button>

      <form class="mt-6" v-if="store.latestReceivedMessage">
        <div>
          <label
            for="message-timestamp"
            class="block mb-2 text-sm font-medium text-gray-900"
            >{{ $t("common.timestamp") }}</label
          >
          <input
            v-model="store.latestReceivedMessage.timestamp"
            id="message-timestamp"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            readonly
          />
        </div>
        <div class="my-6">
          <label
            for="message-text"
            class="block mb-2 text-sm font-medium text-gray-900"
            >{{ $t("common.message") }}</label
          >
          <textarea
            v-model="store.latestReceivedMessage.message"
            id="message-text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            readonly
          ></textarea>
        </div>
      </form>
      <div v-if="errorOccurred">{{ $t("getMessage.wrongUuid") }}</div>
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
      store.latestReceivedMessage = response.data;
      errorOccurred.value = false;
    })
    .catch(() => {
      errorOccurred.value = true;
      store.$resetLatestReceivedMessage();
    });
}
</script>

<style></style>
