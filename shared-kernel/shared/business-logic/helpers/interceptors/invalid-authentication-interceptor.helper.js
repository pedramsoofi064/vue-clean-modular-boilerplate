import { eventBusContext } from "@cross-cutting/libs";
const { eventBus } = eventBusContext;

const INVALID_AUTH_ERROR_CODE = 401;

const onResponseError = (responseError) => {
  const { error } = responseError.response.data;

  const code = parseInt(error.code);
  if (code === INVALID_AUTH_ERROR_CODE) eventBus.emit("error:auth");

  return Promise.reject(responseError);
};

export default {
  onResponseError,
};
