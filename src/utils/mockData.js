import electronics_banner from "@/images/home/electronics_banner.png";
import fashion from "@/images/home/fashion.png";
import chair from "@/images/home/chair.png";
import living from "@/images/home/living.png";
import lamp from "@/images/home/lamp.png";
import watch from "@/images/home/watch.png";


export const categories = [
  { id: 'electronics', name: 'Electronics', description: 'Cutting-edge technology and gadgets.', image: electronics_banner },
  { id: 'fashion', name: 'Fashion', description: 'Curated style for the modern individual.', image: fashion },
  { id: 'home', name: 'Home & Living', description: 'Elevate your living space.', image: chair },
  { id: 'fitness', name: 'Fitness', description: 'Equipment and apparel for athletes.', image: living }
];

export const products = [
  {
    id: "1",
    name: "Nexus Watch V5",
    category: "electronics",
    price: 499,
    image: watch,
    description: "The ultimate smartwatch for the modern tech enthusiast. Featuring an OLED display, advanced heart rate monitoring, and a 48-hour battery life."
  },
  {
    id: "2",
    name: "Sonic Audio Pro",
    category: "electronics",
    price: 299,
    image: "/assets/headphone.png",
    description: "Immersive studio-quality sound with active noise cancellation and ergonomic design for all-day comfort."
  },
  {
    id: "3",
    name: "Aura Glow Lamp",
    category: "home",
    price: 159,
    image: lamp,
    description: "Minimalist desk lamp with adjustable brightness and warm honey tones, perfect for any workspace."
  },
  {
    id: "4",
    name: "Cloud X Runners",
    category: "fashion",
    price: 180,
    image: "/assets/sneaker.png",
    description: "Lightweight performance sneakers with ultra-responsive cushioning and breathable mesh."
  },
  {
    id: "5",
    name: "Apex Drone X",
    category: "electronics",
    price: 899,
    image: "/assets/drone.png",
    description: "Professional grade 4K camera drone with GPS mapping and obstacle avoidance."
  },
  {
    id: "6",
    name: "Vision VR X",
    category: "electronics",
    price: 3499,
    image: "/assets/vr.png",
    description: "The most advanced VR headset featuring dual 8K displays and hand-tracking precision."
  }
];
