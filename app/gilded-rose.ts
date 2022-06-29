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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // The Quality of an item is never negative
        if (this.items[i].quality > 0) {

          // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1
          }
        }

      } else {

        // The Quality of an item is never more than 50
        if (this.items[i].quality < 50) {
          // "Aged Brie" actually increases in Quality the older it gets
          this.items[i].quality = this.items[i].quality + 1

          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // Quality increases by 2 when there are 10 days or less
            if (this.items[i].sellIn < 11) {
              // The Quality of an item is never more than 50
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }

            // Quality increases by 3 when there are 5 days or less
            if (this.items[i].sellIn < 6) {
              // The Quality of an item is never more than 50
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }

      // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // The sell by date has passed
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {

          // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {

            // The Quality of an item is never negative
            if (this.items[i].quality > 0) {
              // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1
              }
            }

          } else {
            // Quality drops to 0 after the concert
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }

        } else {

          // The Quality of an item is never more than 50
          if (this.items[i].quality < 50) {

            // "Aged Brie" actually increases in Quality the older it gets
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
