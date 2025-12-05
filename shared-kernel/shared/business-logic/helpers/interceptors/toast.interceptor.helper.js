import { toast } from "@cross-cutting/libs";

const DEFAULT_ERROR_MESSAGE = "خطا در پردازش";

const onResponseError = (responseError) => {
  const message = responseError.response?.data?.error?.message;
  const faMessage = message.fa || DEFAULT_ERROR_MESSAGE;
  toast.show({ message: faMessage, type: "danger" });

  const additionalInfo = message?.additionalInfo || [];

  for (const info of additionalInfo) {
    const faMessage = info?.message?.fa;
    if (faMessage) toast.show({ message: faMessage, type: "danger" });
  }

  return Promise.reject(responseError);
};

export default {
  onResponseError,
};
