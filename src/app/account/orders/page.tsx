import { getPlaceholderImage } from '@/lib/utils/placeholders';

// ... existing code ...
                        <Image
                          src={item.image || getPlaceholderImage('thumbnail')}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
// ... existing code ... 