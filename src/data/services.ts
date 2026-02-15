import { Service } from '@/types';

export const services: Service[] = [
  // Manicure
  { id: 'man-1', name: 'Classic Manicure', category: 'Manicure', price: 20, duration: 30 },
  { id: 'man-2', name: 'Gel Manicure', category: 'Manicure', price: 35, duration: 45 },
  { id: 'man-3', name: 'Deluxe Manicure', category: 'Manicure', price: 35, duration: 45 },
  { id: 'man-4', name: 'Hot Stone Manicure', category: 'Manicure', price: 40, duration: 50 },
  { id: 'man-5', name: 'Paraffin Manicure', category: 'Manicure', price: 40, duration: 50 },
  { id: 'man-6', name: 'French Manicure', category: 'Manicure', price: 30, duration: 40 },
  { id: 'man-7', name: 'Shellac Manicure', category: 'Manicure', price: 38, duration: 45 },
  { id: 'man-8', name: 'Kids Manicure', category: 'Manicure', price: 12, duration: 20 },

  // Pedicure
  { id: 'ped-1', name: 'Classic Pedicure', category: 'Pedicure', price: 30, duration: 40 },
  { id: 'ped-2', name: 'Gel Pedicure', category: 'Pedicure', price: 50, duration: 55 },
  { id: 'ped-3', name: 'Deluxe Pedicure', category: 'Pedicure', price: 45, duration: 50 },
  { id: 'ped-4', name: 'Hot Stone Pedicure', category: 'Pedicure', price: 55, duration: 60 },
  { id: 'ped-5', name: 'Volcano Spa Pedicure', category: 'Pedicure', price: 60, duration: 65 },
  { id: 'ped-6', name: 'Jelly Spa Pedicure', category: 'Pedicure', price: 55, duration: 60 },
  { id: 'ped-7', name: 'French Pedicure', category: 'Pedicure', price: 40, duration: 45 },
  { id: 'ped-8', name: 'Kids Pedicure', category: 'Pedicure', price: 18, duration: 25 },

  // Acrylic
  { id: 'acr-1', name: 'Acrylic Full Set', category: 'Acrylic', price: 45, duration: 60 },
  { id: 'acr-2', name: 'Acrylic Fill', category: 'Acrylic', price: 30, duration: 45 },
  { id: 'acr-3', name: 'Acrylic Full Set with Gel', category: 'Acrylic', price: 55, duration: 75 },
  { id: 'acr-4', name: 'Acrylic Fill with Gel', category: 'Acrylic', price: 40, duration: 55 },
  { id: 'acr-5', name: 'Acrylic Removal', category: 'Acrylic', price: 15, duration: 30 },
  { id: 'acr-6', name: 'Pink & White Full Set', category: 'Acrylic', price: 60, duration: 75 },
  { id: 'acr-7', name: 'Pink & White Fill', category: 'Acrylic', price: 45, duration: 60 },
  { id: 'acr-8', name: 'Acrylic Nail Repair (per nail)', category: 'Acrylic', price: 5, duration: 10 },

  // Dip Powder
  { id: 'dip-1', name: 'Dip Powder Full Set', category: 'Dip Powder', price: 45, duration: 60 },
  { id: 'dip-2', name: 'Dip Powder Fill', category: 'Dip Powder', price: 35, duration: 50 },
  { id: 'dip-3', name: 'Dip Powder with Tips', category: 'Dip Powder', price: 55, duration: 70 },
  { id: 'dip-4', name: 'Dip Powder Removal', category: 'Dip Powder', price: 15, duration: 25 },
  { id: 'dip-5', name: 'Dip Powder French', category: 'Dip Powder', price: 55, duration: 65 },
  { id: 'dip-6', name: 'Dip Powder Ombre', category: 'Dip Powder', price: 60, duration: 70 },
  { id: 'dip-7', name: 'Dip Powder Manicure', category: 'Dip Powder', price: 40, duration: 50 },
  { id: 'dip-8', name: 'Dip Powder Pedicure', category: 'Dip Powder', price: 55, duration: 60 },

  // Gel
  { id: 'gel-1', name: 'Gel Full Set', category: 'Gel', price: 50, duration: 60 },
  { id: 'gel-2', name: 'Gel Fill', category: 'Gel', price: 35, duration: 45 },
  { id: 'gel-3', name: 'Gel Full Set with Tips', category: 'Gel', price: 60, duration: 75 },
  { id: 'gel-4', name: 'Gel Removal', category: 'Gel', price: 15, duration: 25 },
  { id: 'gel-5', name: 'Gel French', category: 'Gel', price: 55, duration: 65 },
  { id: 'gel-6', name: 'Gel Ombre', category: 'Gel', price: 60, duration: 70 },
  { id: 'gel-7', name: 'Gel Design (per nail)', category: 'Gel', price: 5, duration: 10 },
  { id: 'gel-8', name: 'Builder Gel Manicure', category: 'Gel', price: 50, duration: 60 },

  // Additional Services
  { id: 'add-1', name: 'Nail Art (per nail)', category: 'Additional Services', price: 5, duration: 10 },
  { id: 'add-2', name: 'Chrome / Mirror Finish', category: 'Additional Services', price: 15, duration: 15 },
  { id: 'add-3', name: 'Ombre / Color Fade', category: 'Additional Services', price: 15, duration: 20 },
  { id: 'add-4', name: 'Nail Repair (per nail)', category: 'Additional Services', price: 5, duration: 10 },
  { id: 'add-5', name: 'French Tip Add-on', category: 'Additional Services', price: 10, duration: 15 },
  { id: 'add-6', name: 'Paraffin Treatment (hands)', category: 'Additional Services', price: 10, duration: 15 },
  { id: 'add-7', name: 'Paraffin Treatment (feet)', category: 'Additional Services', price: 15, duration: 15 },
  { id: 'add-8', name: 'Eyebrow Waxing', category: 'Additional Services', price: 12, duration: 15 },
];
