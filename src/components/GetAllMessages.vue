<template>
  <div class="container">
    <div class="text-left mb-8">
      <button
        @click="getAllMessages"
        class="bg-blue-500 disabled:bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {{ $t("getAllMessages.getAllMessages") }}
      </button>
      <span v-if="errorOccurred" class="text-red-700 ml-1">
        {{ $t("common.error") }}
      </span>
    </div>
    <table v-if="store.getMessages.length > 0" class="w-full text-left">
      <thead>
        <tr>
          <th @click="sortByUuid">
            {{ $t("getAllMessages.uuid") }}
            <span v-if="sortingBy === SortingByEnum.Uuid">
              {{ activeSorting }}
            </span>
          </th>
          <th>
            {{ $t("common.message") }}
          </th>
          <th @click="sortByTimestamp">
            {{ $t("common.timestamp") }}
            <span v-if="sortingBy === SortingByEnum.Timestamp">
              {{ activeSorting }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="data-test"
          v-for="(message, index) in store.getMessages"
          :key="index"
        >
          <td>{{ message.uuid }}</td>
          <td>{{ message.message }}</td>
          <td>{{ message.timestamp }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import axios, { AxiosResponse } from "axios";
import { services } from "../consts/services";
import { useMessagesStore } from "@/stores/messages";
import { MessageInterface } from "@/interfaces/message";
import { ref } from "vue";

enum SortingOrderEnum {
  ASC = "asc",
  DESC = "desc",
}

enum SortingByEnum {
  Timestamp = "timestamp",
  Uuid = "uuid",
}

const store = useMessagesStore();

const sortingOrderForUuid = ref<SortingOrderEnum>(SortingOrderEnum.ASC);
const sortingOrderForTimestamp = ref<SortingOrderEnum>(SortingOrderEnum.ASC);
const activeSorting = ref<SortingOrderEnum>(SortingOrderEnum.ASC);

const sortingBy = ref<SortingByEnum>();
const errorOccurred = ref<boolean>(false);

function getAllMessages() {
  axios
    .get(`${services.api}/messages`)
    .then((response: AxiosResponse<MessageInterface[]>) => {
      store.messages = response.data;
      sortingBy.value = undefined;
    })
    .catch(() => (errorOccurred.value = true));
}

function sortByTimestamp() {
  sortingBy.value = SortingByEnum.Timestamp;
  activeSorting.value = sortingOrderForTimestamp.value;

  axios
    .get(
      `${services.api}/messages?sortBy=timestamp&order=${sortingOrderForTimestamp.value}`
    )
    .then((response: AxiosResponse<MessageInterface[]>) => {
      store.messages = response.data;
      sortingOrderForTimestamp.value =
        sortingOrderForTimestamp.value === SortingOrderEnum.ASC
          ? (sortingOrderForTimestamp.value = SortingOrderEnum.DESC)
          : (sortingOrderForTimestamp.value = SortingOrderEnum.ASC);
      errorOccurred.value = false;
    })

    .catch(() => (errorOccurred.value = true));
}

function sortByUuid() {
  sortingBy.value = SortingByEnum.Uuid;
  activeSorting.value = sortingOrderForUuid.value;

  axios
    .get(
      `${services.api}/messages?sortBy=uuid&order=${sortingOrderForUuid.value}`
    )
    .then((response: AxiosResponse<MessageInterface[]>) => {
      store.messages = response.data;
      sortingOrderForUuid.value =
        sortingOrderForUuid.value === SortingOrderEnum.ASC
          ? (sortingOrderForUuid.value = SortingOrderEnum.DESC)
          : (sortingOrderForUuid.value = SortingOrderEnum.ASC);
      errorOccurred.value = false;
    })
    .catch(() => (errorOccurred.value = true));
}
</script>

<style lang="postcss" scoped>
.data-test:nth-child(odd) {
  @apply bg-gray-200;
}
</style>
