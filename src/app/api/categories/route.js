import { publicCategories } from '@/lib/catalog'
import { json } from '@/lib/apiHeaders'

export async function GET() {
  return json({ categories: publicCategories() })
}
