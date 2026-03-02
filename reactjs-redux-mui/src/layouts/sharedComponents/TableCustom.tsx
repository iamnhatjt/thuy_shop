import React from "react";
import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { TableContainerProps } from "@mui/material/TableContainer/TableContainer";
import { IPagination } from "../../constant/type";

interface TableCustomProps {
  columns: ColumnTableType[];
  rows: any[];
  pagination: IPagination;
  tableContainerProps?: TableContainerProps;
  onChangePageNumber: (pageNum: number) => void;
}

export interface ColumnTableType {
  columnName: string;
  fieldName: string;
  sx?: SxProps;
  customDisplay?: (data: any, index?: number) => JSX.Element;
  sxData?: SxProps;
}

const TableCustom: React.FC<TableCustomProps> = ({
  columns,
  rows,
  pagination,
  onChangePageNumber,
}) => {
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item: ColumnTableType, key: number) => (
                <TableCell key={key} align="center" sx={item.sx}>
                  <Typography variant="subtitle1">{item.columnName}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((data: any, index: number) => (
              <TableRow key={data?.id || index}>
                {columns.map((column: ColumnTableType, colIndex: number) => (
                  <TableCell key={colIndex} sx={column.sxData} align="center">
                    {column?.customDisplay ? (
                      column.customDisplay(data, index)
                    ) : (
                      <Typography variant="subtitle2">
                        {data[column.fieldName]}
                      </Typography>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          margin: "12px 20px",
        }}
      >
        <Pagination
          count={Math.ceil(pagination.totalCount / pagination.pageSize)}
          variant="outlined"
          onChange={(event: any, pageNum: number) =>
            onChangePageNumber(pageNum)
          }
        />
      </Box>
    </>
  );
};

export default React.memo(TableCustom);
