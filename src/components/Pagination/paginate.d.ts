export interface PaginationProps {
  total: number;
  pageSize: number;
  page: number;
  onChange: (page: number) => any;
  margin?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';
  selectedVariant?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled';
  prevIcon?: React.ReactElement;
  nextIcon?: React.ReactElement;
  colorScheme?: string;
  fontWeight?: string;
  borderRadius?: 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}
