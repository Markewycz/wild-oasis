import { Button } from '@/components/ui/button';

export function ButtonShadcn({ variant, children, onClick }) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
