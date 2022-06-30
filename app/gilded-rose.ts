export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

enum Mode {
  Increase = 'increase',
  Decrease = 'decrease'
}

enum Type {
  Aged = 'Aged Brie',
  Backstage = 'Backstage passes to a TAFKAL80ETC concert',
  Conjured = 'Conjured',
  Sulfuras = 'Sulfuras, Hand of Ragnaros'
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  modifyQualityBy1(quality: number, mode: Mode) {
    if (quality < 50 && mode == Mode.Increase) {
      quality++;
    }

    if (quality > 0 && mode == Mode.Decrease) {
      quality--;
    }

    return quality;
  }

  modifyQualityBy(n: number, item: Item, mode: Mode) {
    for (let i = 0; i < n; i++) {
      item.quality = this.modifyQualityBy1(item.quality, mode);
    }
  }

  updateQualityForAgedBrie(item: Item) {
    item.quality = this.modifyQualityBy1(item.quality, Mode.Increase);
  }

  updateQualityForBackstage(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    if (item.sellIn < 6) {
      this.modifyQualityBy(3, item, Mode.Increase);
      return;
    }

    if (item.sellIn < 11) {
      this.modifyQualityBy(2, item, Mode.Increase);
      return;
    }

    item.quality = this.modifyQualityBy1(item.quality, Mode.Increase);
  }

  updateQualityForConjured(item: Item) {
    if (item.sellIn < 0) {
      this.modifyQualityBy(4, item, Mode.Decrease);
      return;
    }

    this.modifyQualityBy(2, item, Mode.Decrease);
  }

  modifyQualityForItem(item: Item) {
    switch (item.name) {
      case Type.Aged:
        this.updateQualityForAgedBrie(item);
        break;
      case Type.Backstage:
        this.updateQualityForBackstage(item);
        break;
      case Type.Conjured:
        this.updateQualityForConjured(item);
        break;
      case Type.Sulfuras:
        break;
      default:
        item.quality = this.modifyQualityBy1(item.quality, Mode.Decrease);
        break;
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      this.modifyQualityForItem(item);

      if (item.name != Type.Sulfuras) {
        item.sellIn--;
      }

      // when the sell by day has passed, the quality for
      // each item will modify accordingly
      if (item.sellIn < 0) {
        this.modifyQualityForItem(item);
      }
    });

    return this.items;
  }
}
