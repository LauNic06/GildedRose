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

  updateQualityForAgedBrie(item: Item) {
    item.quality = this.modifyQualityBy1(item.quality, 'increase');
  }

  updateQualityForBackstage(item: Item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return;
    }

    if (item.sellIn < 6) {
      for (let i = 0; i < 3; i++) {
        item.quality = this.modifyQualityBy1(item.quality, 'increase');
      }

      return;
    }

    if (item.sellIn < 11) {
      for (let i = 0; i < 2; i++) {
        item.quality = this.modifyQualityBy1(item.quality, 'increase');
      }

      return;
    }


    item.quality = this.modifyQualityBy1(item.quality, 'increase');
  }

  updateQualityForConjured(item: Item) {
    if (item.sellIn < 0) {
      for (let i = 0; i < 4; i++) {
        item.quality = this.modifyQualityBy1(item.quality, 'decrease');
      }
      return;
    }

    for (let i = 0; i < 2; i++) {
      item.quality = this.modifyQualityBy1(item.quality, 'decrease');
    }
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
    for (let i = 0; i < this.items.length; i++) {
      this.modifyQualityForItem(this.items[i]);

      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        this.modifyQualityForItem(this.items[i]);
      }
    }

    return this.items;
  }
}
