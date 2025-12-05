import { eventBusContext } from "@cross-cutting/libs";
const { eventBus } = eventBusContext;

let token = null;

eventBus.on("change:token", (newToken) => {
  token = newToken;
});

const onRequest = (request) => {
  if (token) {
    request.headers["Authorization"] = token;
  }

  return request;
};

export default {
  onRequest,
};
