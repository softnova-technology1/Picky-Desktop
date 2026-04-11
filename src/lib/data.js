 /**
 * Picky Platform - Scalable Product Engine
 * Data Location: src/lib/data.js
 */
import electronics from "@/images/home/elec.png"
import fashion from "@/images/home/fashion.png"
import books from "@/images/home/book.png"
import homeDecor from "@/images/home/decor.png"
import gifts from "@/images/home/gift.png"

// Additional local images for variety
import sneakers from "@/images/home/sneakers.png"
import watch from "@/images/home/watch.png"
import clothing from "@/images/home/clothing.png"
import lamp from "@/images/home/lamp.png"
import chair from "@/images/home/chair.png"
import snacks from "@/images/home/snacks.png"
import living from "@/images/home/living.png"

const categoriesArr = ["Electronics", "Fashion", "Books", "Home Decor", "Chocolates"];

const subcategories = {
  "Electronics": ["Mobiles", "Laptops", "Accessories", "Audio", "Gaming", "Cameras", "Smart Home", "Wearables", "Tablets", "Monitors"],
  "Fashion": ["Men's Wear", "Women's Wear", "Kids' Wear", "Footwear", "Watches", "Handbags", "Jewellery", "Sunglasses", "Activewear", "Winter Wear"],
  "Books": ["Fiction", "Non-Fiction", "Children's Books", "Education", "Biographies", "Self-Help", "Sci-Fi & Fantasy", "Mystery & Thriller", "Poetry", "Comics & Manga"],
  "Home Decor": ["Wall Art", "Lighting", "Furniture", "Rugs & Carpets", "Vases & Accents", "Mirrors", "Curtains", "Bedding", "Kitchen Decor", "Outdoor Decor"],
  "Chocolates": ["Birthday Gifts", "Anniversary Gifts", "Personalized Gifts", "Corporate Gifts", "Festive Gifts", "Gift Hampers", "Toys", "Greeting Cards", "Flowers & Plants", "Gift Vouchers"]
};

// Map subcategories to LOCAL images for 100% reliability
const categoryImages = {
  "Electronics": [electronics, watch, electronics],
  "Fashion": [fashion, clothing, sneakers, fashion],
  "Books": [books, books, books],
  "Home Decor": [homeDecor, lamp, chair, living, homeDecor],
  "Chocolates": [gifts, snacks, gifts]
};

const subcategoryLocalMap = {
  "Mobiles": electronics,
  "Laptops": electronics,
  "Footwear": sneakers,
  "Watches": watch,
  "Men's Wear": clothing,
  "Women's Wear": fashion,
  "Lighting": lamp,
  "Furniture": chair,
  "Wall Art": living,
  "Fiction": books,
  "Toys": gifts,
  "Gift Hampers": snacks
};

const adjectives = ["Infinite", "Aura", "Zenith", "Quantum", "Nexus", "Element", "Legacy", "Origin", "Scope", "Apex", "Nova", "Flux", "Core", "Vantage", "Prism"];

const products = [];
categoriesArr.forEach((cat) => {
  const subCats = subcategories[cat];
  const catPool = categoryImages[cat] || [electronics];
  
  subCats.forEach((sub, subIdx) => {
    // Determine the best image for this subcategory
    const subDefaultImg = subcategoryLocalMap[sub] || catPool[subIdx % catPool.length];
    
    for (let i = 1; i <= 30; i++) {
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const id = `${cat.toLowerCase().replace(/\s/g, '-')}-${sub.toLowerCase().replace(/\s/g, '-')}-${i}`;
        const name = `${adj} ${sub.replace(/'s/g, '').slice(0, -1)} Model-${i}`;
        
        products.push({
            id,
            name,
            category: cat,
            subcategory: sub,
            price: Math.floor(Math.random() * 1950) + 50,
            image: subDefaultImg, // Using reliable local image
            description: `This ${name} is a premium piece from our ${sub} collection, designed with excellence in mind for the Picky platform.`
        });
    }
  });
});

const slugify = (str) => str.toLowerCase().replace(/\s/g, '-').replace(/'/g, '');

export const categories = categoriesArr;
export const getAllCategories = () => categoriesArr;
export const getSubcategories = (category) => subcategories[category] || [];

export const getSubcategoryImage = (subcategory, category) => {
  return subcategoryLocalMap[subcategory] || categoryImages[category][0];
};

export const getProductsByCategory = (category) => {
  const catSlug = slugify(category);
  return products.filter(p => slugify(p.category) === catSlug);
};

export const getProductsBySubcategory = (category, subcategory) => {
  const catSlug = slugify(category);
  const subSlug = slugify(subcategory);
  return products.filter(p => slugify(p.category) === catSlug && slugify(p.subcategory) === subSlug);
};

export const getProductById = (id) => products.find(p => p.id === id);
export { products };
