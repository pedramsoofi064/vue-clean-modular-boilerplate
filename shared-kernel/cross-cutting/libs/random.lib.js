class Random {
  static number(min = 0, max = 10) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static picker(list, resetOnEmpty = true) {
    let availableItemList = [...list];

    const reset = () => (availableItemList = [...list]);

    const pick = () => {
      const itemIndex = Random.number(0, availableItemList.length - 1);
      const [item] = availableItemList.splice(itemIndex, 1);

      if (availableItemList.length === 1 && resetOnEmpty) reset();

      return item;
    };

    return { pick, reset };
  }
}

export default Random;
