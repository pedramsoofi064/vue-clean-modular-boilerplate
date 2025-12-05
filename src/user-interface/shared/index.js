import router from "@user-interface/shared/router";

import { sessionStorage } from "@business-logic/shared/services";

export const redirectToAuthenticatedPage = () => {
  router.push({
    name: "/",
  });
};
