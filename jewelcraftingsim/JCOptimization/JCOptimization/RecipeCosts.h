#pragma once

#include "MaterialConst.h"

enum class ItemType {
	Gem,
	Stone,
	Ore,
	Rare_Ore,
	JC_Mat,
	Bits_n_Bobs,
	Alch_Mat,
	Elemental
};

struct ItemStack {
	int quantity;
	ItemType type;
	int item;
};

struct Recipe {
	const char *name;

	int learn;
	int yellow;
	int green;
	int grey;
	
	int matCount;
	ItemStack cost[16];
};

struct ItemLabel {
	const char *name;
	ItemType type;
	int item;
};

const Recipe Recipe_Array[] = {
	{
		"Delicate Copper Wire",
		1, 20, 35, 50,
		1,
		{{2, ItemType::Ore, (int)Ore::Copper}}
	},
	{
		"Rough Stone Statue",
		1, 30, 40, 50,
		1,
		{{8, ItemType::Stone, (int)Stone::Rough}}
	},
	{
		"Braided Copper Ring",
		1, 30, 45, 60,
		1,
		{{2, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Woven Copper Ring",
		1, 30, 45, 60,
		2,
		{{2, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}, {1, ItemType::Ore, (int)Ore::Copper}}
	},
	{
		"Heavy Copper Ring",
		5, 35, 50, 65,
		2,
		{{4, ItemType::Ore, (int)Ore::Copper}, {2, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
		},
	{
		"Malachite Pendant",
		20, 50, 65, 80,
		2,
		{{1, ItemType::Gem, (int)Gem::Malachite}, {1, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Tigerseye Band",
		20, 50, 65, 80,
		2,
		{{1, ItemType::Gem, (int)Gem::Tigerseye}, {1, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Inlaid Malachite Ring",
		30, 60, 75, 90,
		2,
		{{2, ItemType::Gem, (int)Gem::Malachite}, {2, ItemType::Ore, (int)Ore::Copper}}
	},
	{
		"Ornate Tigerseye Necklace",
		30, 60, 75, 90,
		3,
		{{2, ItemType::Gem, (int)Gem::Tigerseye}, {2, ItemType::Ore, (int)Ore::Copper}, {1, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Bronze Setting",
		50, 70, 80, 90,
		1,
		{{2, ItemType::Ore, (int)Ore::Bronze}}
	},
	{
		"Coarse Stone Statue",
		50, 70, 80, 90,
		1,
		{{8, ItemType::Stone, (int)Stone::Coarse}}
	},
	{
		"Elegant Silver Ring",
		50, 80, 95, 110,
		1,
		{{1, ItemType::Rare_Ore, (int)Rare_Ore::Silver}}
	},
	{
		"Solid Bronze Ring",
		50, 80, 95, 110,
		1,
		{{4, ItemType::Ore, (int)Ore::Bronze}}
	},
	{
		"Thick Bronze Necklace",
		50, 80, 95, 110,
		3,
		{{2, ItemType::Ore, (int)Ore::Bronze}, {1, ItemType::Gem, (int)Gem::Shadowgem}, {1, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Simple Pearl Ring",
		60, 90, 105, 120,
		3,
		{{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Small_Lustrous_Pearl}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {2, ItemType::Ore, (int)Ore::Copper}}
	},
	{
		"Bronze Band of Force",
		65, 95, 110, 125,
		5,
		{{2, ItemType::Ore, (int)Ore::Bronze}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {3, ItemType::Gem, (int)Gem::Malachite}, {3, ItemType::Gem, (int)Gem::Tigerseye}, {2, ItemType::Gem, (int)Gem::Shadowgem}}
	},
	{
		"Gloom Band",
		70, 100, 115, 130,
		3,
		{{2, ItemType::Gem, (int)Gem::Shadowgem}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {2, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Brilliant Necklace",
		75, 105, 120, 135,
		3,
		{{4, ItemType::Ore, (int)Ore::Bronze}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {1, ItemType::Gem, (int)Gem::Moss_Agate}}
	},
	{
		"Bronze Torc",
		80, 110, 125, 140,
		3,
		{{6, ItemType::Ore, (int)Ore::Bronze}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {1, ItemType::Gem, (int)Gem::Lesser_Moonstone}}
	},
	{
		"Ring of Silver Might",
		80, 110, 125, 140,
		1,
		{{2, ItemType::Rare_Ore, (int)Rare_Ore::Silver}}
	},
	{
		"Heavy Silver Ring",
		90, 120, 135, 150,
		4,
		{{2, ItemType::Rare_Ore, (int)Rare_Ore::Silver}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {1, ItemType::Gem, (int)Gem::Moss_Agate}, {1, ItemType::Gem, (int)Gem::Lesser_Moonstone}}
	},
	{
		"Ring of Twilight Shadows",
		100, 130, 145, 160,
		2,
		{{2, ItemType::Gem, (int)Gem::Shadowgem}, {2, ItemType::Ore, (int)Ore::Bronze}}
	},
	{
		"Heavy Jade Ring",
		105, 135, 150, 165,
		3,
		{{1, ItemType::Gem, (int)Gem::Jade}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}, {2, ItemType::Ore, (int)Ore::Iron}}
	},
	{
		"Heavy Stone Statue",
		110, 120, 130, 140,
		1,
		{{8, ItemType::Stone, (int)Stone::Heavy}}
	},
	{
		"Amulet of the Moon",
		110, 140, 155, 170,
		2,
		{{2, ItemType::Gem, (int)Gem::Lesser_Moonstone}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}}
	},
	{
		"Barbaric Iron Collar",
		110, 140, 155, 170,
		3,
		{{8, ItemType::Ore, (int)Ore::Iron}, {2, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Fang}, {2, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}}
	},
	{
		"Pendant of the Agate Shield",
		120, 150, 165, 180,
		2,
		{{1, ItemType::Gem, (int)Gem::Moss_Agate}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}}
	},
	{
		"Moonsoul Crown",
		120, 150, 165, 180,
		5,
		{{3, ItemType::Gem, (int)Gem::Lesser_Moonstone}, {3, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Small_Lustrous_Pearl}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Soul_Dust}, {4, ItemType::Rare_Ore, (int)Rare_Ore::Silver}, {2, ItemType::Alch_Mat, (int)Alch_Mat::Mana_Potion}}
	},
	{
		"Heavy Iron Knuckles",
		125, 155, 170, 185,
		2,
		{{8, ItemType::Ore, (int)Ore::Iron}, {2, ItemType::Alch_Mat, (int)Alch_Mat::Elixir_of_Ogres_Strength}}
	},
	{
		"Wicked Moonstone Ring",
		125, 155, 170, 185,
		3,
		{{1, ItemType::Gem, (int)Gem::Lesser_Moonstone}, {1, ItemType::Alch_Mat, (int)Alch_Mat::Shadow_Oil}, {4, ItemType::Ore, (int)Ore::Iron}}
	},
	{
		"Golden Dragon Ring",
		135, 165, 180, 195,
		3,
		{{1, ItemType::Gem, (int)Gem::Jade}, {2, ItemType::Rare_Ore, (int)Rare_Ore::Gold}, {2, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire}}
	},
	{
		"Mithril Filigree",
		150, 170, 180, 190,
		1,
		{{2, ItemType::Ore, (int)Ore::Mithril}}
	},
	{
		"Blazing Citrine Ring",
		150, 180, 195, 210,
		2,
		{{1, ItemType::Gem, (int)Gem::Citrine}, {1, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"Heavy Golden Necklace of Battle",
		150, 180, 195, 210,
		3,
		{{1, ItemType::Rare_Ore, (int)Rare_Ore::Gold}, {2, ItemType::Gem, (int)Gem::Moss_Agate}, {1, ItemType::Alch_Mat, (int)Alch_Mat::Elixir_of_Ogres_Strength}}
	},
	{
		"Jade Pendant of Blasting",
		160, 190, 205, 220,
		2,
		{{1, ItemType::Gem, (int)Gem::Jade}, {2, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"The Jade Eye",
		170, 200, 215, 230,
		2,
		{{1, ItemType::Gem, (int)Gem::Jade}, {2, ItemType::Elemental, (int)Elemental::Elemental_Earth}}
	},
	{
		"Engraved Truesilver Ring",
		170, 200, 215, 230,
		2,
		{{1, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"Solid Stone Statue",
		175, 175, 185, 195,
		1,
		{{10, ItemType::Stone, (int)Stone::Solid}}
	},
	{
		"Golden Ring of Power",
		180, 190, 200, 210,
		4,
		{{4, ItemType::Rare_Ore, (int)Rare_Ore::Gold}, {1, ItemType::Gem, (int)Gem::Lesser_Moonstone}, {1, ItemType::Gem, (int)Gem::Jade}, {1, ItemType::Gem, (int)Gem::Citrine}}
	},
	{
		"Citrine Ring of Rapid Healing",
		180, 210, 225, 240,
		3,
		{{1, ItemType::Gem, (int)Gem::Citrine}, {2, ItemType::Elemental, (int)Elemental::Elemental_Water}, {2, ItemType::Ore, (int)Ore::Mithril}}
	},
	{
		"Citrine Pendant of Golden Healing",
		190, 220, 235, 250,
		4,
		{{1, ItemType::Gem, (int)Gem::Citrine}, {2, ItemType::Elemental, (int)Elemental::Elemental_Water}, {2, ItemType::Rare_Ore, (int)Rare_Ore::Gold}, {1, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting}}
	},
	{
		"Truesilver Commander's Ring",
		200, 210, 220, 230,
		3,
		{{3, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::Gem, (int)Gem::Star_Ruby}, {2, ItemType::Gem, (int)Gem::Citrine}}
	},
	{
		"Figurine - Golden Hare",
		200, 225, 240, 255,
		2,
		{{6, ItemType::Rare_Ore, (int)Rare_Ore::Gold}, {2, ItemType::Gem, (int)Gem::Citrine}}
	},
	{
		"Figurine - Jade Owl",
		200, 225, 240, 255,
		4,
		{{4, ItemType::Gem, (int)Gem::Jade}, {2, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Vision_Dust}, {4, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"Aquamarine Signet",
		210, 235, 250, 265,
		2,
		{{3, ItemType::Gem, (int)Gem::Aquamarine}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo}}
	},
	{
		"Figurine - Black Pearl Panther",
		215, 240, 255, 270,
		2,
		{{4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Black_Pearl}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo}}
	},
	{
		"Aquamarine Pendant of the Warrior",
		220, 245, 260, 275,
		2,
		{{1, ItemType::Gem, (int)Gem::Aquamarine}, {3, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"Dense Stone Statue",
		225, 225, 235, 245,
		1,
		{{10, ItemType::Stone, (int)Stone::Dense}}
	},
	{
		"Thorium Setting",
		225, 235, 245, 255,
		1,
		{{1, ItemType::Ore, (int)Ore::Thorium}}
	},
	{
		"Ruby Crown of Restoration",
		225, 250, 265, 280,
		5,
		{{2, ItemType::Gem, (int)Gem::Star_Ruby}, {2, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Black_Pearl}, {4, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {4, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}, {4, ItemType::Alch_Mat, (int)Alch_Mat::Greater_Mana_Potion}}
	},
	{
		"Figurine - Truesilver Crab",
		225, 250, 265, 280,
		5,
		{{2, ItemType::Gem, (int)Gem::Aquamarine}, {4, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::Elemental, (int)Elemental::Core_of_Earth}, {2, ItemType::Elemental, (int)Elemental::Globe_of_Water}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo}}
	},
	{
		"Red Ring of Destruction",
		230, 255, 270, 285,
		2,
		{{1, ItemType::Gem, (int)Gem::Star_Ruby}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Ruby Pendant of Fire",
		235, 260, 275, 290,
		2,
		{{1, ItemType::Gem, (int)Gem::Star_Ruby}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Figurine - Truesilver Boar",
		235, 260, 275, 290,
		5,
		{{2, ItemType::Gem, (int)Gem::Star_Ruby}, {4, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::Elemental, (int)Elemental::Heart_of_Fire}, {2, ItemType::Elemental, (int)Elemental::Breath_of_Wind}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo}}
	},
	{
		"Truesilver Healing Ring",
		240, 265, 280, 295,
		2,
		{{2, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Heart_of_the_Wild}}
	},
	{
		"The Aquamarine Ward",
		245, 270, 285, 300,
		2,
		{{1, ItemType::Gem, (int)Gem::Aquamarine}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Gem Studded Band",
		250, 275, 290, 305,
		4,
		{{2, ItemType::Gem, (int)Gem::Aquamarine}, {2, ItemType::Gem, (int)Gem::Citrine}, {4, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}, {2, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}}
	},
	{
		"Opal Necklace of Impact",
		250, 275, 290, 305,
		5,
		{{2, ItemType::Gem, (int)Gem::Large_Opal}, {2, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}, {4, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}, {2, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Radiant_Shard}, {2, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree}}
	},
	{
		"Figurine - Ruby Serpent",
		260, 280, 290, 300,
		4,
		{{2, ItemType::Gem, (int)Gem::Star_Ruby}, {2, ItemType::Elemental, (int)Elemental::Essence_of_Fire}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Big_Mojo}, {2, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver}}
	},
	{
		"Simple Opal Ring",
		260, 280, 290, 300,
		2,
		{{1, ItemType::Gem, (int)Gem::Large_Opal}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Diamond Focus Ring",
		265, 285, 295, 305,
		2,
		{{1, ItemType::Gem, (int)Gem::Azerothian_Diamond}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Glowing Thorium Band",
		280, 290, 300, 310,
		2,
		{{2, ItemType::Gem, (int)Gem::Azerothian_Diamond}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Onslaught Ring",
		280, 290, 300, 310,
		3,
		{{1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}, {1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Powerful_Mojo}, {1, ItemType::Elemental, (int)Elemental::Essence_of_Earth}}
	},
	{
		"Sapphire Pendant of Winter Night",
		280, 290, 300, 310,
		3,
		{{1, ItemType::Gem, (int)Gem::Blue_Sapphire}, {1, ItemType::Elemental, (int)Elemental::Essence_of_Undeath}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	},
	{
		"Ring of Bitter Shadows",
		285, 295, 305, 315,
		3,
		{{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Arcane_Crystal}, {2, ItemType::Elemental, (int)Elemental::Essence_of_Undeath}, {1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Demonic_Rune}}
	},
	{
		"Living Emerald Pendant",
		290, 300, 310, 320,
		3,
		{{2, ItemType::Gem, (int)Gem::Huge_Emerald}, {4, ItemType::Elemental, (int)Elemental::Living_Essence}, {4, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Powerful_Mojo}}
	},
	{
		"Emerald Lion Ring",
		290, 300, 310, 320,
		2,
		{{2, ItemType::Gem, (int)Gem::Huge_Emerald}, {1, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting}}
	}
};

const size_t n_Recipe_Array = sizeof(Recipe_Array) / sizeof(Recipe);

const ItemStack IncedentalsArray[] = {
	{1, ItemType::Gem, (int)Gem::Malachite},
	{1, ItemType::Gem, (int)Gem::Tigerseye},
	{1, ItemType::Gem, (int)Gem::Shadowgem},
	{1, ItemType::Gem, (int)Gem::Moss_Agate},
	{1, ItemType::Gem, (int)Gem::Lesser_Moonstone},
	{1, ItemType::Gem, (int)Gem::Jade},
	{1, ItemType::Gem, (int)Gem::Citrine},
	{1, ItemType::Gem, (int)Gem::Aquamarine},
	{1, ItemType::Gem, (int)Gem::Star_Ruby},
	{1, ItemType::Gem, (int)Gem::Large_Opal},
	{1, ItemType::Gem, (int)Gem::Huge_Emerald},
	{1, ItemType::Gem, (int)Gem::Azerothian_Diamond},
	{1, ItemType::Gem, (int)Gem::Blue_Sapphire},
	{1, ItemType::Stone, (int)Stone::Rough},
	{1, ItemType::Stone, (int)Stone::Coarse},
	{1, ItemType::Stone, (int)Stone::Heavy},
	{1, ItemType::Stone, (int)Stone::Solid},
	{1, ItemType::Stone, (int)Stone::Dense},
	{1, ItemType::Alch_Mat, (int)Alch_Mat::Mana_Potion},
	{1, ItemType::Alch_Mat, (int)Alch_Mat::Greater_Mana_Potion},
	{1, ItemType::Elemental, (int)Elemental::Elemental_Earth},
	{1, ItemType::Elemental, (int)Elemental::Elemental_Water},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Small_Lustrous_Pearl},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Black_Pearl},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Soul_Dust},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Vision_Dust},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Fang},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Big_Mojo},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Heart_of_the_Wild},
	{1, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Demonic_Rune}
};

const size_t n_IncedentalsArray = sizeof(IncedentalsArray) / sizeof(ItemStack);

// Measured in rate of Count/1k mins (16h 40m)
const ItemStack TimeCostOfMats[] = {
	{1200, ItemType::Gem, (int)Gem::Malachite},
	{1200, ItemType::Gem, (int)Gem::Tigerseye},
	{1000, ItemType::Gem, (int)Gem::Shadowgem},
	{800, ItemType::Gem, (int)Gem::Moss_Agate},
	{800, ItemType::Gem, (int)Gem::Lesser_Moonstone},
	{700, ItemType::Gem, (int)Gem::Jade},
	{600, ItemType::Gem, (int)Gem::Citrine},
	{500, ItemType::Gem, (int)Gem::Aquamarine},
	{500, ItemType::Gem, (int)Gem::Star_Ruby},
	{200, ItemType::Gem, (int)Gem::Large_Opal},
	{200, ItemType::Gem, (int)Gem::Huge_Emerald},
	{200, ItemType::Gem, (int)Gem::Azerothian_Diamond},
	{200, ItemType::Gem, (int)Gem::Blue_Sapphire},

	{1600, ItemType::Stone, (int)Stone::Rough},
	{1400, ItemType::Stone, (int)Stone::Coarse},
	{1000, ItemType::Stone, (int)Stone::Heavy},
	{800, ItemType::Stone, (int)Stone::Solid},
	{600, ItemType::Stone, (int)Stone::Dense},

	{1600, ItemType::Ore, (int)Ore::Copper},
	{1000, ItemType::Ore, (int)Ore::Tin},
	{1300, ItemType::Ore, (int)Ore::Bronze},
	{1000, ItemType::Ore, (int)Ore::Iron},
	{800, ItemType::Ore, (int)Ore::Mithril},
	{600, ItemType::Ore, (int)Ore::Thorium},

	{60, ItemType::Rare_Ore, (int)Rare_Ore::Silver},
	{40, ItemType::Rare_Ore, (int)Rare_Ore::Gold},
	{30, ItemType::Rare_Ore, (int)Rare_Ore::Truesilver},

	{800, ItemType::JC_Mat, (int)JC_Mat::Copper_Wire},
	{650, ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting},
	{400, ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree},
	{600, ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting},

	{80, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Small_Lustrous_Pearl},
	{40, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Black_Pearl},
	{120, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Soul_Dust},
	{80, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Vision_Dust},
	{20, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Radiant_Shard},
	{5, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Arcane_Crystal},
	{100, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Fang},
	{80, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Demonic_Rune},
	{100, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo},
	{40, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Big_Mojo},
	{50, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Powerful_Mojo},
	{80, ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Heart_of_the_Wild},

	{500, ItemType::Alch_Mat, (int)Alch_Mat::Mana_Potion},
	{200, ItemType::Alch_Mat, (int)Alch_Mat::Greater_Mana_Potion},
	{250, ItemType::Alch_Mat, (int)Alch_Mat::Elixir_of_Ogres_Strength},
	{60, ItemType::Alch_Mat, (int)Alch_Mat::Shadow_Oil},

	{100, ItemType::Elemental, (int)Elemental::Elemental_Water},
	{100, ItemType::Elemental, (int)Elemental::Elemental_Earth},
	{80, ItemType::Elemental, (int)Elemental::Essence_of_Fire},
	{50, ItemType::Elemental, (int)Elemental::Essence_of_Earth},
	{40, ItemType::Elemental, (int)Elemental::Essence_of_Undeath},
	{80, ItemType::Elemental, (int)Elemental::Living_Essence},
	{120, ItemType::Elemental, (int)Elemental::Core_of_Earth},
	{200, ItemType::Elemental, (int)Elemental::Globe_of_Water},
	{100, ItemType::Elemental, (int)Elemental::Heart_of_Fire},
	{200, ItemType::Elemental, (int)Elemental::Breath_of_Wind}
};

const size_t n_TimeCostOfMats = sizeof(TimeCostOfMats) / sizeof(ItemStack);

const ItemLabel ItemNames[] = {
	{"Malachite", ItemType::Gem, (int)Gem::Malachite},
	{"Tigerseye", ItemType::Gem, (int)Gem::Tigerseye},
	{"Shadowgem", ItemType::Gem, (int)Gem::Shadowgem},
	{"Moss Agate", ItemType::Gem, (int)Gem::Moss_Agate},
	{"Lesser Moonstone", ItemType::Gem, (int)Gem::Lesser_Moonstone},
	{"Jade", ItemType::Gem, (int)Gem::Jade},
	{"Citrine", ItemType::Gem, (int)Gem::Citrine},
	{"Aquamarine", ItemType::Gem, (int)Gem::Aquamarine},
	{"Star Ruby", ItemType::Gem, (int)Gem::Star_Ruby},
	{"Large Opal", ItemType::Gem, (int)Gem::Large_Opal},
	{"Huge Emerald", ItemType::Gem, (int)Gem::Huge_Emerald},
	{"Azerothian Diamond", ItemType::Gem, (int)Gem::Azerothian_Diamond},
	{"Blue Sapphire", ItemType::Gem, (int)Gem::Blue_Sapphire},

	{"Rough Stone", ItemType::Stone, (int)Stone::Rough},
	{"Coarse Stone", ItemType::Stone, (int)Stone::Coarse},
	{"Heavy Stone", ItemType::Stone, (int)Stone::Heavy},
	{"Solid Stone", ItemType::Stone, (int)Stone::Solid},
	{"Dense Stone", ItemType::Stone, (int)Stone::Dense},

	{"Copper", ItemType::Ore, (int)Ore::Copper},
	{"Tin", ItemType::Ore, (int)Ore::Tin},
	{"Bronze", ItemType::Ore, (int)Ore::Bronze},
	{"Iron", ItemType::Ore, (int)Ore::Iron},
	{"Mithril", ItemType::Ore, (int)Ore::Mithril},
	{"Thorium", ItemType::Ore, (int)Ore::Thorium},

	{"Silver", ItemType::Rare_Ore, (int)Rare_Ore::Silver},
	{"Gold", ItemType::Rare_Ore, (int)Rare_Ore::Gold},
	{"Truesilver", ItemType::Rare_Ore, (int)Rare_Ore::Truesilver},

	{"Delicate Copper Wire", ItemType::JC_Mat, (int)JC_Mat::Copper_Wire},
	{"Bronze Setting", ItemType::JC_Mat, (int)JC_Mat::Bronze_Setting},
	{"Mithril Filigree", ItemType::JC_Mat, (int)JC_Mat::Mithril_Filigree},
	{"Thorium Setting", ItemType::JC_Mat, (int)JC_Mat::Thorium_Setting},

	{"Small Lustrous Pearl", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Small_Lustrous_Pearl},
	{"Black Pearl", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Black_Pearl},
	{"Soul Dust", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Soul_Dust},
	{"Vision Dust", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Vision_Dust},
	{"Large Radiant Shard", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Radiant_Shard},
	{"Arcane Crystal", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Arcane_Crystal},
	{"Large Fang", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Large_Fang},
	{"Demonic Rune", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Demonic_Rune},
	{"Flask of Mojo", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Mojo},
	{"Flask of Big_Mojo", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Flask_of_Big_Mojo},
	{"Powerful Mojo", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Powerful_Mojo},
	{"Heart of the_Wild", ItemType::Bits_n_Bobs, (int)Bits_n_Bobs::Heart_of_the_Wild},

	{"Mana Potion", ItemType::Alch_Mat, (int)Alch_Mat::Mana_Potion},
	{"Greater Mana Potion", ItemType::Alch_Mat, (int)Alch_Mat::Greater_Mana_Potion},
	{"Elixir of Ogres Strength", ItemType::Alch_Mat, (int)Alch_Mat::Elixir_of_Ogres_Strength},
	{"Shadow Oil", ItemType::Alch_Mat, (int)Alch_Mat::Shadow_Oil},

	{"Elemental Water", ItemType::Elemental, (int)Elemental::Elemental_Water},
	{"Elemental Earth", ItemType::Elemental, (int)Elemental::Elemental_Earth},
	{"Essence of Fire", ItemType::Elemental, (int)Elemental::Essence_of_Fire},
	{"Essence of Earth", ItemType::Elemental, (int)Elemental::Essence_of_Earth},
	{"Essence of Undeath", ItemType::Elemental, (int)Elemental::Essence_of_Undeath},
	{"Living Essence", ItemType::Elemental, (int)Elemental::Living_Essence},
	{"Core of Earth", ItemType::Elemental, (int)Elemental::Core_of_Earth},
	{"Globe of Water", ItemType::Elemental, (int)Elemental::Globe_of_Water},
	{"Heart of Fire", ItemType::Elemental, (int)Elemental::Heart_of_Fire},
	{"Breath of Wind", ItemType::Elemental, (int)Elemental::Breath_of_Wind}
};

const size_t n_ItemNames = sizeof(ItemNames) / sizeof(ItemLabel);