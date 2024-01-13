import { Button } from '@/components/ui/button';

export function ButtonShadcn({ variant, children, onClick, type, disabled }) {
  return (
    <Button type={type} onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
