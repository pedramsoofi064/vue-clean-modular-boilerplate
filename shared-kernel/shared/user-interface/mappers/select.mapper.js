const DEFAULT_CONFIG = { valueKey: "id", labelKey: "name" };

const normalizeConfig = (config = {}) => ({ ...DEFAULT_CONFIG, ...config });

export default class {
  static toOptions(items = [], config) {
    const { valueKey, labelKey } = normalizeConfig(config);

    return items.map((item) => ({
      value: item[valueKey],
      label: item[labelKey],
    }));
  }

  static toEntities(options, config) {
    const { valueKey, labelKey } = normalizeConfig(config);

    return options.map((option) => ({
      [valueKey]: option.value,
      ...(option.label && { [labelKey]: option.label }),
    }));
  }
}
