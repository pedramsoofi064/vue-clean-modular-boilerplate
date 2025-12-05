export const createNotification = async (message) => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const notification = new Notification("بنیاد راه رشد", {
    dir: "rtl",
    lang: "fa",
    icon: "favicon.png",
    body: message,
  });

  return notification;
};
