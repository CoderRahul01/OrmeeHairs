import { getPlaceholderImage } from '@/lib/utils/placeholders';

<Image
  src={item.image || getPlaceholderImage('thumbnail')}
  alt={item.name}
  fill
  className="object-cover"
/> 