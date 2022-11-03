export interface Toast {
  id: string;
  content: string;
  status: 'success' | 'warning' | 'error';
}
