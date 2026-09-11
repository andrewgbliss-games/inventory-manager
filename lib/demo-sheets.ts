export type DemoItem = {
  id: string;
  name: string;
  type: string;
  subtype: string;
  category: string;
};

export type DemoSheet = {
  id: "weapons" | "produce";
  name: string;
  src: string;
  path: string;
  cols: number;
  rows: number;
  width: number;
  height: number;
  cellSize: number;
  items: readonly DemoItem[];
};

export const weaponsSheet: DemoSheet = {
  id: "weapons",
  name: "Weapons & Armor",
  src: "/WeaponsAndArmor.png",
  path: "res://assets/WeaponsAndArmor.png",
  cols: 8,
  rows: 4,
  width: 128,
  height: 64,
  cellSize: 16,
  items: [
    { id: "iron_sword", name: "Iron Sword", type: "equipable", subtype: "melee", category: "sword" },
    { id: "iron_longsword", name: "Iron Longsword", type: "equipable", subtype: "melee", category: "sword" },
    { id: "iron_mace", name: "Iron Mace", type: "equipable", subtype: "melee", category: "mace" },
    { id: "iron_dagger", name: "Iron Dagger", type: "equipable", subtype: "melee", category: "sword" },
    { id: "copper_sword", name: "Copper Sword", type: "equipable", subtype: "melee", category: "sword" },
    { id: "copper_mace", name: "Copper Mace", type: "equipable", subtype: "melee", category: "mace" },
    { id: "copper_hammer", name: "Copper Hammer", type: "equipable", subtype: "melee", category: "mace" },
    { id: "copper_club", name: "Copper Club", type: "equipable", subtype: "melee", category: "mace" },
    { id: "iron_axe", name: "Iron Axe", type: "equipable", subtype: "melee", category: "axe" },
    { id: "iron_battleaxe", name: "Iron Battleaxe", type: "equipable", subtype: "melee", category: "axe" },
    { id: "copper_axe", name: "Copper Axe", type: "equipable", subtype: "melee", category: "axe" },
    { id: "copper_mallet", name: "Copper Mallet", type: "equipable", subtype: "melee", category: "mace" },
    { id: "iron_buckler", name: "Iron Buckler", type: "equipable", subtype: "armor", category: "shield" },
    { id: "iron_kite_shield", name: "Iron Kite Shield", type: "equipable", subtype: "armor", category: "shield" },
    { id: "copper_buckler", name: "Copper Buckler", type: "equipable", subtype: "armor", category: "shield" },
    { id: "copper_heater_shield", name: "Copper Heater Shield", type: "equipable", subtype: "armor", category: "shield" },
    { id: "iron_helmet", name: "Iron Helmet", type: "equipable", subtype: "armor", category: "helmet" },
    { id: "iron_helm", name: "Iron Helm", type: "equipable", subtype: "armor", category: "helmet" },
    { id: "iron_chestplate", name: "Iron Chestplate", type: "equipable", subtype: "armor", category: "chestplate" },
    { id: "iron_belt", name: "Iron Belt", type: "equipable", subtype: "armor", category: "belt" },
    { id: "iron_leggings", name: "Iron Leggings", type: "equipable", subtype: "armor", category: "leggings" },
    { id: "iron_boots", name: "Iron Boots", type: "equipable", subtype: "armor", category: "boots" },
    { id: "iron_gauntlets", name: "Iron Gauntlets", type: "equipable", subtype: "armor", category: "gloves" },
    { id: "iron_ring", name: "Iron Ring", type: "equipable", subtype: "armor", category: "ring" },
    { id: "copper_helmet", name: "Copper Helmet", type: "equipable", subtype: "armor", category: "helmet" },
    { id: "copper_helm", name: "Copper Helm", type: "equipable", subtype: "armor", category: "helmet" },
    { id: "copper_chestplate", name: "Copper Chestplate", type: "equipable", subtype: "armor", category: "chestplate" },
    { id: "copper_belt", name: "Copper Belt", type: "equipable", subtype: "armor", category: "belt" },
    { id: "copper_leggings", name: "Copper Leggings", type: "equipable", subtype: "armor", category: "leggings" },
    { id: "copper_boots", name: "Copper Boots", type: "equipable", subtype: "armor", category: "boots" },
    { id: "copper_gauntlets", name: "Copper Gauntlets", type: "equipable", subtype: "armor", category: "gloves" },
    { id: "copper_ring", name: "Copper Ring", type: "equipable", subtype: "armor", category: "ring" },
  ],
};

export const produceSheet: DemoSheet = {
  id: "produce",
  name: "Fruit & Vegetable",
  src: "/FruitAndVegetable.png",
  path: "res://assets/FruitAndVegetable.png",
  cols: 8,
  rows: 5,
  width: 128,
  height: 80,
  cellSize: 16,
  items: [
    { id: "red_apple", name: "Red Apple", type: "consumable", subtype: "food", category: "fruit" },
    { id: "green_apple", name: "Green Apple", type: "consumable", subtype: "food", category: "fruit" },
    { id: "banana", name: "Banana", type: "consumable", subtype: "food", category: "fruit" },
    { id: "cherries", name: "Cherries", type: "consumable", subtype: "food", category: "fruit" },
    { id: "lemon", name: "Lemon", type: "consumable", subtype: "food", category: "fruit" },
    { id: "grapes", name: "Grapes", type: "consumable", subtype: "food", category: "fruit" },
    { id: "watermelon_slice", name: "Watermelon Slice", type: "consumable", subtype: "food", category: "fruit" },
    { id: "melon_slice", name: "Melon Slice", type: "consumable", subtype: "food", category: "fruit" },
    { id: "apple", name: "Apple", type: "consumable", subtype: "food", category: "fruit" },
    { id: "ripe_lemon", name: "Ripe Lemon", type: "consumable", subtype: "food", category: "fruit" },
    { id: "kiwi", name: "Kiwi", type: "consumable", subtype: "food", category: "fruit" },
    { id: "avocado", name: "Avocado", type: "consumable", subtype: "food", category: "fruit" },
    { id: "lime", name: "Lime", type: "consumable", subtype: "food", category: "fruit" },
    { id: "purple_grapes", name: "Purple Grapes", type: "consumable", subtype: "food", category: "fruit" },
    { id: "strawberry", name: "Strawberry", type: "consumable", subtype: "food", category: "fruit" },
    { id: "watermelon", name: "Watermelon", type: "consumable", subtype: "food", category: "fruit" },
    { id: "pineapple", name: "Pineapple", type: "consumable", subtype: "food", category: "fruit" },
    { id: "peach", name: "Peach", type: "consumable", subtype: "food", category: "fruit" },
    { id: "pear", name: "Pear", type: "consumable", subtype: "food", category: "fruit" },
    { id: "bosc_pear", name: "Bosc Pear", type: "consumable", subtype: "food", category: "fruit" },
    { id: "white_onion", name: "White Onion", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "eggplant", name: "Eggplant", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "green_pepper", name: "Green Pepper", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "green_chili", name: "Green Chili", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "tomato", name: "Tomato", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "potato", name: "Potato", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "carrot", name: "Carrot", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "garlic", name: "Garlic", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "onion", name: "Onion", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "spring_onion", name: "Spring Onion", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "red_pepper", name: "Red Pepper", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "red_chili", name: "Red Chili", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "pumpkin", name: "Pumpkin", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "cucumber", name: "Cucumber", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "zucchini", name: "Zucchini", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "plum", name: "Plum", type: "consumable", subtype: "food", category: "fruit" },
    { id: "mushroom", name: "Mushroom", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "cabbage", name: "Cabbage", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "yellow_pepper", name: "Yellow Pepper", type: "consumable", subtype: "food", category: "vegetable" },
    { id: "orange", name: "Orange", type: "consumable", subtype: "food", category: "fruit" },
  ],
};

export const demoSheets = [weaponsSheet, produceSheet] as const;

export function getDemoItem(sheet: DemoSheet, index: number): DemoItem {
  return sheet.items[index] ?? sheet.items[0];
}
