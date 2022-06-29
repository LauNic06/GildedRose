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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  modifyQualityBy1(quality: number, mode: string) {
    if (quality < 50 && mode == 'increase') {
      quality = quality + 1;
    }

    if (quality > 0 && mode == 'decrease') {
      quality = quality - 1;
    }

    return quality;
  }

  modifyQualityBy(n: number, item: Item, mode: string) {
    for (let i = 0; i < n; i++) {
      item.quality = this.modifyQualityBy1(item.quality, mode);
    }
  }

  updateQualityForAgedBrie(item: Item) {
    item.quality = this.modifyQualityBy1(item.quality, 'increase');
  }

  updateQualityForBackstage(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    if (item.sellIn < 6) {
      this.modifyQualityBy(3, item, "increase");
      return;
    }

    if (item.sellIn < 11) {
      this.modifyQualityBy(2, item, "increase");
      return;
    }

    item.quality = this.modifyQualityBy1(item.quality, 'increase');
  }

  updateQualityForConjured(item: Item) {
    if (item.sellIn < 0) {
      this.modifyQualityBy(4, item, "decrease");
      return;
    }

    this.modifyQualityBy(2, item, "decrease");
  }

  modifyQualityForItem(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        this.updateQualityForAgedBrie(item);
        break;
      case 'Backstage passes to a TAFKAL80ETC concert':
        this.updateQualityForBackstage(item);
        break;
      case 'Conjured':
        this.updateQualityForConjured(item);
        break;
      case 'Sulfuras, Hand of Ragnaros':
        break;
      default:
        item.quality = this.modifyQualityBy1(item.quality, 'decrease');
        break;
    }
  }

  updateQuality() {
    this.items.forEach(item => {
      this.modifyQualityForItem(item);

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        this.modifyQualityForItem(item);
      }
    });

    return this.items;
  }
}
