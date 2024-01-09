import { Button } from '@/components/ui/button';

type ButtonProps = {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'reset' | 'submit' | undefined;
};

export function ButtonShadcn({
  variant,
  children,
  onClick,
  type,
}: ButtonProps) {
  return (
    <Button type={type} onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
