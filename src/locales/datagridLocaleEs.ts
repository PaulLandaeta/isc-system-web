const dataGridLocaleText = {
  MuiTablePagination: {
    labelRowsPerPage: 'Filas por página',
    labelDisplayedRows: ({ from, to, count }: { from: number; to: number; count: number }) =>
      `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`,
  },
  noRowsLabel: 'No hay registros',
  footerRowSelected: (count: number) =>
    count > 1
      ? `${count.toLocaleString()} filas seleccionadas`
      : `${count.toLocaleString()} fila seleccionada`,
  columnMenuSortAsc: 'Ordenar ascendente',
  columnMenuSortDesc: 'Ordenar descendente',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar columna',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuUnsort: 'Quitar orden',
  columnMenuManageColumns: 'Administrar columnas',
  columnHeaderSortIconLabel: 'Ordenar',

  columnHeaderFiltersTooltipActive: (count: number) =>
    count !== 1
      ? `${count} filtros activos`
      : `${count} filtro activo`,
  toolbarColumns: 'Columnas',
  toolbarFilters: 'Filtros',

  filterPanelTitle: 'Filtros',
  filterPanelColumns: 'Columna',
  filterPanelOperators: 'Operador',
  filterPanelValue: 'Valor',
  filterPanelAddFilter: 'Agregar filtro',
  filterPanelDeleteIconLabel: 'Eliminar filtro',
  filterPanelLogicOperator: 'Operador lógico',
  filterPanelLogicOperatorAnd: 'Y',
  filterPanelLogicOperatorOr: 'O',
  filterPanelInputLabel: 'Valor del filtro',
  filterPanelOperator: 'Operador',

  filterOperatorContains: 'Contiene',
  filterOperatorDoesNotContain: 'No contiene',
  filterOperatorEquals: 'Igual a',
  filterOperatorDoesNotEqual: 'No es igual a',
  filterOperatorStartsWith: 'Empieza con',
  filterOperatorEndsWith: 'Termina con',
  filterOperatorIs: 'Es',
  filterOperatorNot: 'No es',
  filterOperatorAfter: 'Después de',
  filterOperatorOnOrAfter: 'En o después de',
  filterOperatorBefore: 'Antes de',
  filterOperatorOnOrBefore: 'En o antes de',
  filterOperatorIsEmpty: 'Está vacío',
  filterOperatorIsNotEmpty: 'No está vacío',
  filterOperatorIsAnyOf: 'Es uno de',

  filterPanelInputPlaceholder: 'Valor',

  noResultsOverlayLabel: 'No hay resultados',

  columnsManagementSearchTitle: 'Buscar',
  columnsManagementShowHideAllText: 'Mostrar/Ocultar todo',
  columnsManagementReset: 'Restablecer',
  columnsManagementNoColumns: 'No hay columnas',
};

export default dataGridLocaleText;
