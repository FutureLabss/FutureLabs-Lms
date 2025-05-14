// Represents a single module/item in the data array
export interface ModuleItem {
  id: number;
  title: string;
  description: string;
  classroom: string;
  created_by: string;
  updated_by: string;
  duration: string;
  topics_count: number;
  materials_count: number;
}

// Represents the links object for pagination
interface ApiLinks {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
}

// Represents the meta object for pagination info
interface ApiMeta {
  current_page: number;
  from: number;
  path: string;
  per_page: number;
  to: number;
}

// Represents the entire API response
export interface ClassModulesApiResponse {
  message: string;
  data: ModuleItem[];
  links: ApiLinks;
  meta: ApiMeta;
}
