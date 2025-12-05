import { uuid } from "@cross-cutting/libs";

const SKELETON_CLASS_NAME = "skeleton-loading";

const addSkeletonClass = (element, hashData) => {
  element.setAttribute(hashData, "");

  element.classList.add(SKELETON_CLASS_NAME);
};
const removeSkeletonClass = (element, hashData) => {
  element.removeAttribute(hashData);

  const dataset = Object.assign({}, element.dataset);
  const isIdle = !Object.keys(dataset).some((data) => data.startsWith("vSkeleton"));

  if (isIdle) {
    element.classList.remove(SKELETON_CLASS_NAME);
  }
};

const generateHashData = () => `data-v-skeleton-${uuid.generate()}`;

const loadSkeleton = ({ element, self, hashData }) => {
  if (self) {
    addSkeletonClass(element, hashData);
  } else if (element.tagName === "IMG") {
    addSkeletonClass(element.parentElement, hashData);
  } else if (!element.children.length || element.tagName === "BUTTON") {
    addSkeletonClass(element, hashData);
  } else {
    for (const child of element.children) {
      loadSkeleton({ element: child, hashData });
    }
  }
};

const unLoadSkeleton = (element, hashData) => {
  removeSkeletonClass(element, hashData);

  for (const child of element.children) {
    unLoadSkeleton(child, hashData);
  }
};

const handleSkeleton = (element, { value, self, hashData }) => {
  if (value) {
    loadSkeleton({ element, hashData, self });
    return;
  }

  unLoadSkeleton(element, hashData);
};

const hashMap = new Map();

export const vSkeleton = {
  mounted(element, { value, modifiers }) {
    const hashData = generateHashData();
    hashMap.set(element, hashData);

    handleSkeleton(element, { hashData, value, self: modifiers?.self });
  },
  updated(element, { value, modifiers }) {
    const hashData = hashMap.get(element);

    handleSkeleton(element, { hashData, value, self: modifiers?.self });
  },
};
