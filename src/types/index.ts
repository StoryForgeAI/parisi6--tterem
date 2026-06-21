export interface Dish {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  text: string;
  author: string;
  rating: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  notes: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
