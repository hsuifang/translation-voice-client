import { Table, Thead, Tbody, Tr, Td, Card, TableContainer, Spinner } from '@chakra-ui/react';

type col = {
  field: string;
  header: string;
  render?: (item: any) => JSX.Element;
};

type BaseTableProps = {
  data: any[];
  columns: col[];
  customFields?: string[];
  isFetching: boolean;
};

function BaseTable({ data, columns, customFields, isFetching }: BaseTableProps) {
  return (
    <Card border="gray" borderRadius="8px" padding="1rem">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              {columns.map((col) => (
                <Td key={col.field}>{col.header}</Td>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data) &&
              data.map((row) => (
                <Tr key={row.id}>
                  {columns.map((col) => {
                    return customFields?.includes(col.field) ? (
                      <Td>{col.render ? col.render(row) : row[col.field]}</Td>
                    ) : (
                      <Td key={col.field}>{row[col.field]}</Td>
                    );
                  })}
                </Tr>
              ))}
            {isFetching && (
              <Tr>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default BaseTable;
