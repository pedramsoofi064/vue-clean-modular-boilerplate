const COLOR_LIST = ["blue", "yellow", "pink", "orange", "indigo", "purple", "red", "green", "teal", "cyan"];

const DEFAULT_SHADE = 300;
const DEFAULT_INDEX = 0;

let shade = DEFAULT_SHADE;
let index = DEFAULT_INDEX;

const resetIndex = () => (index = DEFAULT_INDEX);
const resetShade = () => (shade = DEFAULT_SHADE);

export const resetColorPicker = () => {
  resetIndex();
  resetShade();
};

export const pickRandomColor = () => {
  if (index === COLOR_LIST.length) {
    resetIndex();

    shade += 100;
  }
  if (shade === 800) resetShade();

  const color = `var(--palette-${COLOR_LIST[index]}-${shade})`;

  index++;

  return color;
};
