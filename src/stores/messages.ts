import { MessageInterface } from "./../interfaces/message";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<MessageInterface[]>([]);
  const getMessages = computed(() => messages.value);

  const recentlyReceivedMessage = ref<MessageInterface | undefined>({
    message: "siema",
    timestamp: "32",
    uuid: "22",
  });

  function $resetRecentlyReceivedMessage() {
    recentlyReceivedMessage.value = undefined;
  }

  return {
    messages,
    getMessages,
    recentlyReceivedMessage,
    $resetRecentlyReceivedMessage,
  };
});
