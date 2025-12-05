export const convertLinkToSrc = (link) => (link ? `${getEnv("FILE_BASE_URL")}${link.slice(1)}` : link);
