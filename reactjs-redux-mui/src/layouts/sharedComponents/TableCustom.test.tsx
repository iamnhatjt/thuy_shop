import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import TableCustom, { ColumnTableType } from './TableCustom';
import { IPagination } from '../../constant/type';

const mockPagination: IPagination = {
  pageNum: 1,
  pageSize: 10,
  totalCount: 20,
};

const mockColumns: ColumnTableType[] = [
  { columnName: 'ID', fieldName: 'id' },
  { columnName: 'Name', fieldName: 'name' },
];

const mockRows = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

const mockOnChangePageNumber = jest.fn();

test('renders TableCustom with rows', () => {
  render(
    <TableCustom
      columns={mockColumns}
      rows={mockRows}
      pagination={mockPagination}
      onChangePageNumber={mockOnChangePageNumber}
    />
  );

  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
});
