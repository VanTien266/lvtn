import React, { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { HStack, Box } from "native-base";
import { StyleSheet, FlatList } from "react-native";
import Item from "./Item";

const numberOfItemsPerPageList = [10, 15, 20];

const PaginatedItems = ({ route }) => {
  const { listFabric } = route.params;
  const [page, setPage] = useState(1);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const numberOfPages = Math.ceil(listFabric.length / numberOfItemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  return (
    <PaperProvider>
      <DataTable>
        <HStack style={styles.titleHeader} px={1}>
          <Box flex={1} _text={{ fontWeight: "bold", fontSize: "md" }}>
            STT
          </Box>
          <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Sản phẩm
          </Box>
          <Box flex={3} _text={{ fontWeight: "bold", fontSize: "md" }}>
            Số cây vải
          </Box>
          <Box flex={1} _text={{ fontWeight: "bold", fontSize: "md" }}></Box>
        </HStack>
        <FlatList
          data={listFabric.slice(
            page * numberOfItemsPerPage,
            (page + 1) * numberOfItemsPerPage
          )}
          renderItem={({ item, index }) => (
            <Item item={item} index={index + 1} />
          )}
          keyExtractor={(item, index) => index}
        />
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
  titleHeader: { backgroundColor: "#B4B4C1" },
});
