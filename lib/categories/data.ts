/* ============================================================
   1. TAXONOMY DATA
   ============================================================ */
export const categories = [
  {
    id: "clothing",
    name: "Clothing",
  },

  {
    id: "footwear",
    name: "Footwear",
  },

  {
    id: "accessories",
    name: "Accessories",
  },

  {
    id: "baby-care",
    name: "Baby Care",
  },

  {
    id: "feeding-nursing",
    name: "Feeding & Nursing",
  },

  {
    id: "toys-games",
    name: "Toys & Games",
  },

  {
    id: "school-books-stationery",
    name: "School, Books & Stationery",
  },

  {
    id: "sports-outdoor",
    name: "Sports & Outdoor",
  },

  {
    id: "baby-gear-safety",
    name: "Baby Gear & Safety",
  },

  {
    id: "nursery-furniture-home",
    name: "Nursery, Furniture & Home",
  },

  {
    id: "electronics",
    name: "Electronics",
  },

  {
    id: "food-snacks",
    name: "Food & Snacks",
  },
] as const;

/* ============================================================
   1.2 SUBCATEGORIES

   Each subcategory defines:

   id
      Unique internal identifier.

   name
      Human-readable name shown in the UI.

   categoryId
      Connects the subcategory to its parent category.

   variantAttributes
      Defines which attributes create product variants.

   imageGroupBy
      Defines which attributes determine whether variants
      share the same product image.

   Example:

   Dresses
   variantAttributes = ["color", "size"]
   imageGroupBy       = ["color"]

   Pink / 120 ──┐
   Pink / 130 ──┼── Pink Image
   Pink / 140 ──┘

   Yellow / 120 ──┐
   Yellow / 130 ──┼── Yellow Image
   Yellow / 140 ──┘
   ============================================================ */

export const subcategories = [
  /* ==========================================================
     CLOTHING
     ========================================================== */

  {
    id: "t-shirts",
    name: "T-Shirts",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "shirts",
    name: "Shirts",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "dresses",
    name: "Dresses",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "pants",
    name: "Pants",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "shorts",
    name: "Shorts",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "skirts",
    name: "Skirts",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "jackets",
    name: "Jackets",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "hoodies-sweaters",
    name: "Hoodies & Sweaters",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "pajamas",
    name: "Pajamas",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "rompers-bodysuits",
    name: "Rompers & Bodysuits",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "clothing-sets",
    name: "Clothing Sets",
    categoryId: "clothing",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "underwear",
    name: "Underwear",
    categoryId: "clothing",
    variantAttributes: ["color", "size", "packSize"],
    imageGroupBy: ["color", "packSize"],
  },

  {
    id: "socks",
    name: "Socks",
    categoryId: "clothing",
    variantAttributes: ["color", "size", "pairCount"],
    imageGroupBy: ["color", "pairCount"],
  },

  /* ==========================================================
     FOOTWEAR
     ========================================================== */

  {
    id: "shoes",
    name: "Shoes",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  {
    id: "sneakers",
    name: "Sneakers",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  {
    id: "sandals",
    name: "Sandals",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  {
    id: "slippers",
    name: "Slippers",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  {
    id: "boots",
    name: "Boots",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  {
    id: "school-shoes",
    name: "School Shoes",
    categoryId: "footwear",
    variantAttributes: ["color", "shoeSize"],
    imageGroupBy: ["color"],
  },

  /* ==========================================================
     ACCESSORIES
     ========================================================== */

  {
    id: "hats-caps",
    name: "Hats & Caps",
    categoryId: "accessories",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "hair-accessories",
    name: "Hair Accessories",
    categoryId: "accessories",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "belts",
    name: "Belts",
    categoryId: "accessories",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "sunglasses",
    name: "Sunglasses",
    categoryId: "accessories",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "jewelry",
    name: "Jewelry",
    categoryId: "accessories",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "gloves",
    name: "Gloves",
    categoryId: "accessories",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "scarves",
    name: "Scarves",
    categoryId: "accessories",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  /* ==========================================================
     BABY CARE
     ========================================================== */

  {
    id: "diapers",
    name: "Diapers",
    categoryId: "baby-care",
    variantAttributes: ["diaperSize", "packSize"],
    imageGroupBy: ["diaperSize", "packSize"],
  },

  {
    id: "baby-wipes",
    name: "Baby Wipes",
    categoryId: "baby-care",
    variantAttributes: ["sheetCount", "packSize"],
    imageGroupBy: ["sheetCount", "packSize"],
  },

  {
    id: "baby-shampoo",
    name: "Baby Shampoo",
    categoryId: "baby-care",
    variantAttributes: ["volume"],
    imageGroupBy: ["volume"],
  },

  {
    id: "baby-body-wash",
    name: "Baby Body Wash",
    categoryId: "baby-care",
    variantAttributes: ["volume"],
    imageGroupBy: ["volume"],
  },

  {
    id: "baby-lotion",
    name: "Baby Lotion",
    categoryId: "baby-care",
    variantAttributes: ["volume"],
    imageGroupBy: ["volume"],
  },

  {
    id: "baby-powder",
    name: "Baby Powder",
    categoryId: "baby-care",
    variantAttributes: ["weight"],
    imageGroupBy: ["weight"],
  },

  {
    id: "baby-oil",
    name: "Baby Oil",
    categoryId: "baby-care",
    variantAttributes: ["volume"],
    imageGroupBy: ["volume"],
  },

  {
    id: "baby-soap",
    name: "Baby Soap",
    categoryId: "baby-care",
    variantAttributes: ["weight", "packSize"],
    imageGroupBy: ["weight", "packSize"],
  },

  {
    id: "toothbrushes",
    name: "Toothbrushes",
    categoryId: "baby-care",
    variantAttributes: ["color", "packSize"],
    imageGroupBy: ["color", "packSize"],
  },

  {
    id: "grooming-sets",
    name: "Grooming Sets",
    categoryId: "baby-care",
    variantAttributes: ["setType"],
    imageGroupBy: ["setType"],
  },

  /* ==========================================================
     FEEDING & NURSING
     ========================================================== */

  {
    id: "baby-bottles",
    name: "Baby Bottles",
    categoryId: "feeding-nursing",
    variantAttributes: ["capacity", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "bottle-nipples",
    name: "Bottle Nipples",
    categoryId: "feeding-nursing",
    variantAttributes: ["flowRate", "packSize"],
    imageGroupBy: ["flowRate", "packSize"],
  },

  {
    id: "sippy-cups",
    name: "Sippy Cups",
    categoryId: "feeding-nursing",
    variantAttributes: ["capacity", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "water-bottles",
    name: "Water Bottles",
    categoryId: "feeding-nursing",
    variantAttributes: ["capacity", "design", "color"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "plates",
    name: "Plates",
    categoryId: "feeding-nursing",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "bowls",
    name: "Bowls",
    categoryId: "feeding-nursing",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "spoon-fork-sets",
    name: "Spoon & Fork Sets",
    categoryId: "feeding-nursing",
    variantAttributes: ["color", "packSize"],
    imageGroupBy: ["color", "packSize"],
  },

  {
    id: "food-containers",
    name: "Food Containers",
    categoryId: "feeding-nursing",
    variantAttributes: ["capacity", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "milk-storage-bags",
    name: "Milk Storage Bags",
    categoryId: "feeding-nursing",
    variantAttributes: ["capacity", "bagCount"],
    imageGroupBy: ["capacity", "bagCount"],
  },

  {
    id: "breast-pumps",
    name: "Breast Pumps",
    categoryId: "feeding-nursing",
    variantAttributes: ["model"],
    imageGroupBy: ["model"],
  },

  {
    id: "bibs",
    name: "Bibs",
    categoryId: "feeding-nursing",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  /* ==========================================================
     TOYS & GAMES
     ========================================================== */

  {
    id: "dolls",
    name: "Dolls",
    categoryId: "toys-games",
    variantAttributes: ["design"],
    imageGroupBy: ["design"],
  },

  {
    id: "toy-vehicles",
    name: "Toy Vehicles",
    categoryId: "toys-games",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "building-blocks",
    name: "Building Blocks",
    categoryId: "toys-games",
    variantAttributes: ["pieceCount"],
    imageGroupBy: ["pieceCount"],
  },

  {
    id: "plush-toys",
    name: "Plush Toys",
    categoryId: "toys-games",
    variantAttributes: ["design", "size"],
    imageGroupBy: ["design"],
  },

  {
    id: "puzzles",
    name: "Puzzles",
    categoryId: "toys-games",
    variantAttributes: ["design", "pieceCount"],
    imageGroupBy: ["design", "pieceCount"],
  },

  {
    id: "board-games",
    name: "Board Games",
    categoryId: "toys-games",
    variantAttributes: ["edition"],
    imageGroupBy: ["edition"],
  },

  {
    id: "educational-toys",
    name: "Educational Toys",
    categoryId: "toys-games",
    variantAttributes: ["model"],
    imageGroupBy: ["model"],
  },

  {
    id: "electronic-toys",
    name: "Electronic Toys",
    categoryId: "toys-games",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "musical-toys",
    name: "Musical Toys",
    categoryId: "toys-games",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "pretend-play-toys",
    name: "Pretend Play Toys",
    categoryId: "toys-games",
    variantAttributes: ["design", "setType"],
    imageGroupBy: ["design", "setType"],
  },

  /* ==========================================================
     SCHOOL, BOOKS & STATIONERY
     ========================================================== */

  {
    id: "backpacks",
    name: "Backpacks",
    categoryId: "school-books-stationery",
    variantAttributes: ["design", "color", "size"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "pencil-cases",
    name: "Pencil Cases",
    categoryId: "school-books-stationery",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  {
    id: "pencils",
    name: "Pencils",
    categoryId: "school-books-stationery",
    variantAttributes: ["packSize"],
    imageGroupBy: ["packSize"],
  },

  {
    id: "colored-pencils",
    name: "Colored Pencils",
    categoryId: "school-books-stationery",
    variantAttributes: ["colorCount"],
    imageGroupBy: ["colorCount"],
  },

  {
    id: "markers",
    name: "Markers",
    categoryId: "school-books-stationery",
    variantAttributes: ["colorCount", "tipSize"],
    imageGroupBy: ["colorCount", "tipSize"],
  },

  {
    id: "notebooks",
    name: "Notebooks",
    categoryId: "school-books-stationery",
    variantAttributes: ["size", "design"],
    imageGroupBy: ["design", "size"],
  },

  {
    id: "story-books",
    name: "Story Books",
    categoryId: "school-books-stationery",
    variantAttributes: ["edition", "language"],
    imageGroupBy: ["edition", "language"],
  },

  {
    id: "activity-books",
    name: "Activity Books",
    categoryId: "school-books-stationery",
    variantAttributes: ["level", "edition"],
    imageGroupBy: ["level", "edition"],
  },

  {
    id: "crayons",
    name: "Crayons",
    categoryId: "school-books-stationery",
    variantAttributes: ["colorCount"],
    imageGroupBy: ["colorCount"],
  },

  {
    id: "erasers",
    name: "Erasers",
    categoryId: "school-books-stationery",
    variantAttributes: ["design", "packSize"],
    imageGroupBy: ["design", "packSize"],
  },

  {
    id: "rulers",
    name: "Rulers",
    categoryId: "school-books-stationery",
    variantAttributes: ["length", "design"],
    imageGroupBy: ["design", "length"],
  },

  /* ==========================================================
     SPORTS & OUTDOOR
     ========================================================== */

  {
    id: "balls",
    name: "Balls",
    categoryId: "sports-outdoor",
    variantAttributes: ["size"],
    imageGroupBy: ["size"],
  },

  {
    id: "bicycles",
    name: "Bicycles",
    categoryId: "sports-outdoor",
    variantAttributes: ["wheelSize", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "scooters",
    name: "Scooters",
    categoryId: "sports-outdoor",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "helmets",
    name: "Helmets",
    categoryId: "sports-outdoor",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "swimwear",
    name: "Swimwear",
    categoryId: "sports-outdoor",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "swimming-goggles",
    name: "Swimming Goggles",
    categoryId: "sports-outdoor",
    variantAttributes: ["color", "size"],
    imageGroupBy: ["color"],
  },

  {
    id: "outdoor-toys",
    name: "Outdoor Toys",
    categoryId: "sports-outdoor",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  /* ==========================================================
     BABY GEAR & SAFETY
     ========================================================== */

  {
    id: "strollers",
    name: "Strollers",
    categoryId: "baby-gear-safety",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "car-seats",
    name: "Car Seats",
    categoryId: "baby-gear-safety",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "high-chairs",
    name: "High Chairs",
    categoryId: "baby-gear-safety",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "baby-carriers",
    name: "Baby Carriers",
    categoryId: "baby-gear-safety",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "safety-gates",
    name: "Safety Gates",
    categoryId: "baby-gear-safety",
    variantAttributes: ["size"],
    imageGroupBy: ["size"],
  },

  {
    id: "baby-monitors",
    name: "Baby Monitors",
    categoryId: "baby-gear-safety",
    variantAttributes: ["model"],
    imageGroupBy: ["model"],
  },

  {
    id: "playpens",
    name: "Playpens",
    categoryId: "baby-gear-safety",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  /* ==========================================================
     NURSERY, FURNITURE & HOME
     ========================================================== */

  {
    id: "cribs",
    name: "Cribs",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "mattresses",
    name: "Mattresses",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size"],
    imageGroupBy: ["size"],
  },

  {
    id: "bedsheets",
    name: "Bedsheets",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "design"],
    imageGroupBy: ["design", "size"],
  },

  {
    id: "blankets",
    name: "Blankets",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "design"],
    imageGroupBy: ["design"],
  },

  {
    id: "pillows",
    name: "Pillows",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "design"],
    imageGroupBy: ["design"],
  },

  {
    id: "storage-boxes",
    name: "Storage Boxes",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "kids-furniture",
    name: "Kids Furniture",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["size", "color"],
    imageGroupBy: ["color"],
  },

  {
    id: "night-lights",
    name: "Night Lights",
    categoryId: "nursery-furniture-home",
    variantAttributes: ["design", "color"],
    imageGroupBy: ["design", "color"],
  },

  /* ==========================================================
     ELECTRONICS
     ========================================================== */

  {
    id: "tablets",
    name: "Tablets",
    categoryId: "electronics",
    variantAttributes: ["model", "storage", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "smart-watches",
    name: "Smart Watches",
    categoryId: "electronics",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "headphones",
    name: "Headphones",
    categoryId: "electronics",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "cameras",
    name: "Cameras",
    categoryId: "electronics",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "electronic-learning-devices",
    name: "Electronic Learning Devices",
    categoryId: "electronics",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  {
    id: "kids-speakers",
    name: "Kids Speakers",
    categoryId: "electronics",
    variantAttributes: ["model", "color"],
    imageGroupBy: ["model", "color"],
  },

  /* ==========================================================
     FOOD & SNACKS
     ========================================================== */

  {
    id: "snacks",
    name: "Snacks",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "weight"],
    imageGroupBy: ["flavor", "weight"],
  },

  {
    id: "biscuits",
    name: "Biscuits",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "weight"],
    imageGroupBy: ["flavor", "weight"],
  },

  {
    id: "drinks",
    name: "Drinks",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "volume"],
    imageGroupBy: ["flavor", "volume"],
  },

  {
    id: "cereals",
    name: "Cereals",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "weight"],
    imageGroupBy: ["flavor", "weight"],
  },

  {
    id: "baby-food",
    name: "Baby Food",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "weight"],
    imageGroupBy: ["flavor", "weight"],
  },

  {
    id: "multi-packs",
    name: "Multi Packs",
    categoryId: "food-snacks",
    variantAttributes: ["flavor", "packSize"],
    imageGroupBy: ["flavor", "packSize"],
  },
] as const;
