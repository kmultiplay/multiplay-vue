import { MessageInterface } from "./../interfaces/message";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMessagesStore = defineStore("messages", () => {
  const messages = ref<MessageInterface[]>([]);
  const getMessages = computed(() => messages.value);

  return { messages, getMessages };
});
