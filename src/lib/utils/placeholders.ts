/**
 * Utility to generate placeholder images for products
 */

// Define size presets for different contexts
type PlaceholderSize = 'thumbnail' | 'small' | 'medium' | 'large' | 'cover';

// Define background colors for placeholders
const placeholderColors = {
  primary: 'FFFBF5', // Light cream
  secondary: 'F5F5F5', // Light gray
  accent: 'B08D57', // Gold accent
};

/**
 * Get a placeholder image URL based on size
 */
export function getPlaceholderImage(size: PlaceholderSize = 'medium'): string {
  const dimensions = {
    thumbnail: '80x80',
    small: '200x200',
    medium: '400x400',
    large: '800x800',
    cover: '800x1000',
  };
  
  // Use local placeholders instead of external service
  return `/images/placeholders/${size}.jpg`;
} 