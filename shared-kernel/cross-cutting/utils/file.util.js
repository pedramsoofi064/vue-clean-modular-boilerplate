const SIZE_UNITS = {
  KB: 1,
  MB: Math.pow(1024, 1),
  GB: Math.pow(1024, 2),
  TB: Math.pow(1024, 3),
};

export const convertSizeToKiloBytes = (sizeWithUnit) => {
  const [size, unit] = sizeWithUnit.split(" ");
  const sizeInBytes = parseFloat(size) * SIZE_UNITS[unit.toUpperCase()];

  if (isNaN(sizeInBytes)) {
    throw new Error("Invalid size format");
  }

  return sizeInBytes;
};

export const convertBytesToSize = (bytes) => {
  const kiloBytes = bytes / 1024;

  const [unit, value] = Object.entries(SIZE_UNITS).findLast(([_, value]) => kiloBytes >= value) || [
    "KB",
    SIZE_UNITS.KB,
  ];

  return `${(kiloBytes / value).toFixed(1)} ${unit}`;
};

export const convertBlobToFile = ({ blob, name = "image.png", type = "image/png" }) => {
  const file = new File([blob], name, {
    type,
  });

  return file;
};

export const convertFileToDataUrl = (file) => {
  if (!file) return "";

  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  return new Promise((resolve) => {
    fileReader.addEventListener("load", (event) => {
      resolve(event.target.result);
    });
  });
};

export const downloadDataUrl = ({ dataUrl, name = "file.pdf" }) => {
  const downloadLink = document.createElement("a");

  downloadLink.href = dataUrl;

  downloadLink.download = name;

  downloadLink.click();
};
