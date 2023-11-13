import { MessageInterface } from "./../interfaces/message";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<MessageInterface[]>([]);
  const sentMessagesCount = ref<number>(0);
  const latestReceivedMessage = ref<MessageInterface>();

  const getMessagesCount = computed(() => messages.value.length);

  function incrementSentMessagesCount() {
    sentMessagesCount.value++;
  }

  function $resetLatestReceivedMessage() {
    latestReceivedMessage.value = undefined;
  }
  return {
    messages,
    getMessagesCount,
    sentMessagesCount,
    latestReceivedMessage,
    incrementSentMessagesCount,
    $resetLatestReceivedMessage,
  };
});
