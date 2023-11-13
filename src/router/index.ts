import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GetAllMessagesView from "../views/GetAllMessagesView.vue";
import GetMessageView from "../views/GetMessageView.vue";
import SendMessageView from "../views/SendMessageView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "get-all-messages",
    component: GetAllMessagesView,
  },
  {
    path: "/get-message",
    name: "get-message",
    component: GetMessageView,
  },
  {
    path: "/send-message",
    name: "send-message",
    component: SendMessageView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
