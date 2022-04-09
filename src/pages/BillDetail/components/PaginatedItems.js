import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { HStack, Box } from "native-base";
import { StyleSheet } from "react-native";
import Item from "./Item";

const numberOfItemsPerPageList = [10, 15, 20];

const PaginatedItems = ({ route }) => {
  const { listFabric } = route.params;
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const numberOfPages = Math.ceil(listFabric.length / numberOfItemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <PaperProvider>
      <DataTable>
        <HStack space={1} justifyContent="center" style={styles.header}>
          <Box flex={2} _text={{ fontWeight: "bold", fontSize: "md" }}>
            STT
          </Box>
          <Box flex={2} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Mã
          </Box>
          <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Lô
          </Box>
          <Box flex={4} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Chiều dài
          </Box>
          <Box flex={5} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Đơn giá
          </Box>
          <Box flex={1}></Box>
        </HStack>
        {listFabric
          .slice(page * numberOfItemsPerPage, (page + 1) * numberOfItemsPerPage)
          .map((item, index) => {
            console.log("item", item);
            return (
              <Item
                item={item}
                key={page * numberOfItemsPerPage + index + 1}
                index={page * numberOfItemsPerPage + index + 1}
              />
            );
          })}

        <DataTable.Pagination
          page={page}
          numberOfPages={numberOfPages}
          onPageChange={(page) => setPage(page)}
          label={`${page} of ${numberOfPages}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </PaperProvider>
  );
};
export default PaginatedItems;

const styles = StyleSheet.create({
  header: { paddingHorizontal: 5, backgroundColor: "#B4B4C1" },
});
