import { createContext, useContext } from 'react';

type TableContextType = {
  columns: string | null;
};

const TableContext = createContext<TableContextType | null>(null);

const useTableContext = () => {
  const tableContext = useContext(TableContext);

  if (!tableContext) {
    throw new Error(
      'useTableContext has to be used outside of <TableContext.Provider>'
    );
  }
  return tableContext;
};

export { TableContext, useTableContext };
