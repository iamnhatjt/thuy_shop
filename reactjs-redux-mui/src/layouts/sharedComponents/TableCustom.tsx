import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";

interface TableCustomProps {
  columns: ColumnTableType[];
  rows: any[];
}

interface ColumnTableType {
  columnName: string;
  fieldName: string;
  sx?: SxProps;
  customDisplay?: (data: any) => JSX.Element;
}

const TableCustom: React.FC<TableCustomProps> = ({ columns, rows }) => {
  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((item: ColumnTableType, key: number) => (
              <TableCell key={key}>
                <Typography variant="h3">{item.columnName}</Typography>
              </TableCell>
            ))}
          </TableRow>
          <TableBody>
            {rows.map((data, key: number) => (
              <TableRow key={key}>
                {columns.map((column: ColumnTableType, index: number) => (
                  <TableCell key={index}>
                    {column?.customDisplay ? (
                      <column.customDisplay data={data} />
                    ) : (
                      <Typography variant="subtitle1">
                        {data[column.fieldName]}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default React.memo(TableCustom);
