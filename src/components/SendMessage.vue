<template>
  <label for="message" class="mb-2 text-sm font-medium text-gray-900">{{
    $t("sendMessage.yourMessage")
  }}</label>
  <textarea
    id="message"
    rows="4"
    v-model="textToSend"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    :placeholder="$t('sendMessage.promptText')"
    @input="clearSendingStatus"
  ></textarea>

  <div class="flex items-center justify-end gap-2 mt-2">
    <span v-if="isSending" class="text-blue-700">{{
      $t("sendMessage.status.isSending")
    }}</span>
    <span v-if="messageSent" class="text-lime-700"
      >{{ $t("sendMessage.status.successful") }}{{ messageUuid }}</span
    >
    <span v-if="errorOccurred" class="text-red-700">{{
      $t("sendMessage.status.error")
    }}</span>
    <button
      @click="sendMessage"
      :disabled="textToSend.length < 1"
      class="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {{ $t("sendMessage.send") }}
    </button>
    <button
      @click="() => (textToSend = '')"
      class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded"
    >
      {{ $t("sendMessage.clear") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { ref, Ref } from "vue";
import { services } from "../consts/services";

const textToSend: Ref<string> = ref("");

const isSending: Ref<boolean> = ref(false);
const messageSent: Ref<boolean> = ref(false);
const errorOccurred: Ref<boolean> = ref(false);

const messageUuid: Ref<string | null> = ref("");
const uuidRegex = /"id":"([0-9a-fA-F-]+)"/;

function sendMessage() {
  isSending.value = true;

  axios
    .post(
      `${services.api}/message`,
      { message: textToSend.value },
      { headers: { "content-type": "text/json" } }
    )
    .then((response: AxiosResponse) => {
      messageUuid.value = getMessageUuidFromResponse(response.data);
      messageSent.value = true;
    })
    .catch(() => {
      errorOccurred.value = true;
    });

  isSending.value = false;
}

function getMessageUuidFromResponse(response: string): string | null {
  const match = uuidRegex.exec(response);
  if (!match) {
    return null;
  }

  return match[1];
}

function clearSendingStatus() {
  isSending.value = false;
  messageSent.value = false;
  errorOccurred.value = false;
}
</script>
