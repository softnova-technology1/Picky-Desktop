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

// Sync Manual Datasets for New Arrivals and Offers
const manualProducts = [
  // New Arrivals (na1 - na8)
  { id: "na1", name: "Limited Edition Ceramic Vase", category: "Home Decor", subcategory: "Vases & Accents", price: 129, image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1915", description: "Minimalist ceramic piece for modern living." },
  { id: "na2", name: "Minimalist Leather Backpack", category: "Fashion", subcategory: "Handbags", price: 249, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069", description: "Premium leather crafted for daily elegance." },
  { id: "na3", name: "Signature Scent Candle Set", category: "Home Decor", subcategory: "Vases & Accents", price: 59, image: "https://images.unsplash.com/photo-1603006905393-c35f297926cc?q=80&w=1974", description: "Atmospheric scents for a tranquil home." },
  { id: "na4", name: "Heritage Cotton Tote Bag", category: "Fashion", subcategory: "Handbags", price: 85, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974", description: "Sustainable style for the conscious traveler." },
  { id: "na5", name: "Premium Linen Throw Pillow", category: "Home Decor", subcategory: "Bedding", price: 45, image: "https://images.unsplash.com/photo-1579656335342-5ef351e77df5?q=80&w=1974", description: "Soft textures meet architectural design." },
  { id: "na6", name: "Modern Brass Desk Lamp", category: "Home Decor", subcategory: "Lighting", price: 189, image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1974", description: "Sophisticated lighting for your creative space." },
  { id: "na7", name: "Handcrafted Oak Planter", category: "Home Decor", subcategory: "Furniture", price: 75, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072", description: "Bringing nature indoors with style." },
  { id: "na8", name: "Artisanal Drip Coffee Kit", category: "Gifts", subcategory: "Personalized Gifts", price: 145, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070", description: "Master the art of the perfect brew." },
  
  // Offers Deals (offer1 - offer8)
  { id: "offer1", name: "Noise Cancelling Wireless Headphones", category: "Electronics", subcategory: "Audio", price: 199, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070", description: "Immersive sound, total silence." },
  { id: "offer2", name: "Ultra HD Smart TV - 55 Inch", category: "Electronics", subcategory: "Monitors", price: 499, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070", description: "Cinematic experience in your living room." },
  { id: "offer3", name: "Water Resistant Fitness Tracker", category: "Electronics", subcategory: "Wearables", price: 45, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088", description: "Stay fit, stay connected." },
  { id: "offer4", name: "Premium Chef's Knife Set", category: "Home Decor", subcategory: "Kitchen Decor", price: 99, image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=1964", description: "Precision tools for culinary masters." },
  { id: "offer5", name: "Ergonomic Office Chair", category: "Home Decor", subcategory: "Furniture", price: 179, image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=2072", description: "Support for your long working hours." },
  { id: "offer6", name: "Portable Outdoor Bluetooth Speaker", category: "Electronics", subcategory: "Audio", price: 69, image: "https://images.unsplash.com/photo-1608156639585-342c7decf66f?q=80&w=2070", description: "Your music, anywhere you go." },
  { id: "offer7", name: "Compact Air Fryer", category: "Home Decor", subcategory: "Kitchen Decor", price: 75, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070", description: "Healthy frying, beautifully designed." },
  { id: "offer8", name: "Digital Mirrorless Camera", category: "Electronics", subcategory: "Cameras", price: 899, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1938", description: "Capture life's details with clarity." }
];

products.push(...manualProducts);

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
