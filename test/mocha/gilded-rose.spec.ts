import { expect } from 'chai';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('Unknown Item', () => {
    it('should degrade in quality twice as fast once the sellIn date has passed', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 0, 21)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(19);
    });

    it('should quality be positive', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 0, 0)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(0);
    });

    it('should quality never increase', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 10, 20)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.lessThanOrEqual(20);
    });

    it('should quality be less or equal to 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 10, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.lessThanOrEqual(50);
    });

    it('should the sellIn decrease by 1', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 10, 9)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).to.equal(9);
    });

    it('should quality decrease by 1', () => {
      // Given
      const gildedRose = new GildedRose([new Item('foo', 10, 9)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(8);
    });
  });

  describe('Aged Brie', () => {
    it('should quality be less or equal to 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.lessThanOrEqual(50);
    });

    it('should quality never decrease', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 10)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.greaterThanOrEqual(10);
    });

    it('should the sellIn decrease by 1', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 9)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).to.equal(9);
    });

    it('should quality increase by 2 when the sell by date has passed', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 9)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(11);
    });

  });

  describe('Sulfuras, Hand of Ragnaros', () => {
    it('should never be sold', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).to.equal(10);
    });

    it('should never decrease in quality', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', -1, 30)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(30);
    });

    it('should quality be less or equal to 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.lessThanOrEqual(50);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('should never decrease in quality', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.greaterThanOrEqual(20);
    });

    it('should increase in quality by 2 if there are 10 days or less', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(22);
    });

    it('should increase in quality by 3 if there are 5 days or less', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 2, 12)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(15);
    });

    it('should quality drops to 0 after the concert', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 12)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(0);
    });

    it('should quality be less or equal to 50 for less than 11 days', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(50);
    });

    it('should quality be less or equal to 50 for less than 5 days', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 4, 48)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(50);
    });

    it('should quality be less or equal to 50 for more than 10 days', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 40, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(50);
    });

    it('should increase in quality by 1 if there are more than 11 days', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 23)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(24);
    });

    it('should the sellIn decrease by 1', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 9)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].sellIn).to.equal(9);
    });
  });

  describe('Conjured', () => {
    it('should decrease in quality twice as fast', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured', 10, 30)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(28);
    });

    it('should quality be less or equal to 50', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured', 10, 50)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.lessThanOrEqual(50);
    });

    it('should quality not decrease if it reaches 0', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured', 0, 3)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(0);
    });

    it('should quality degrade by 4 when the sell by date has passed', () => {
      // Given
      const gildedRose = new GildedRose([new Item('Conjured', 0, 8)]);

      // When
      const items = gildedRose.updateQuality();

      // Then
      expect(items[0].quality).to.equal(2);
    });
  });
});
