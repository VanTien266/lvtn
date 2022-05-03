import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, Button, Flex, useToast } from "native-base";

export default function ScanBarCode({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setData(data);
    toast.show({
      render: () => {
        return (
          <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
            Scan thành công!
          </Box>
        );
      },
      placement: "top",
      duration: 1000,
    });
  };

  if (hasPermission === null) {
    return <Text>Yêu cầu quyền truy cập máy ảnh</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không truy cập được vào máy ảnh</Text>;
  }

  return (
    <Box style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Flex direction="row">
          <Button onPress={() => setScanned(false)}>Scan lại</Button>
          <Button
            onPress={() => {
              route.params.handleGetFabricInfo(data);
              navigation.navigate("export-bill", route.params);
            }}
          >
            Xác nhận
          </Button>
        </Flex>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
