import { createContext, useContext } from 'react';

type MenusContextTypes = {
  openId: string | null;
  close: () => void;
  open: React.Dispatch<React.SetStateAction<string | null>>;
  position: { x: number; y: number } | null;
  setPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
};

const MenusContext = createContext<MenusContextTypes | null>(null);

const useMenusContext = () => {
  const menusContext = useContext(MenusContext);

  if (!menusContext) {
    throw new Error(
      'useMenusContext has to be used outside of <MenusContext.Provider>'
    );
  }
  return menusContext;
};

export { useMenusContext, MenusContext };
