import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Box, Text, Flex } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomerInfo = () => {
  return (
    <Card>
      <Card.Title>Thông tin khách hàng</Card.Title>
      <Flex direction="row">
        <Box flex={1}>
          <Flex flexDirection="row" alignItems="center" justify="space-between">
            <Text fontSize="md" bold>
              Lưu Văn Tiến
            </Text>
            <Flex flexDirection="row" alignItems="center">
              <Icon
                name="border-color"
                color="#000040"
                size={24}
                style={styles.icon}
              />
              <Text fontSize="sm">Ghi chú</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon name="place" color="#000040" size={24} style={styles.icon} />
            <Flex>
              <Text>KTX khu B</Text>
              <Text>Đông Hòa - Dĩ An -Bình Dương</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-post-office"
              color="#000040"
              size={24}
              style={styles.icon}
            />
            <Text>tien.luu.van@hcmut.edu.vn</Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-phone"
              color="#000040"
              size={24}
              style={styles.icon}
            />
            <Text>0826755114</Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="md" bold>
          Người nhận
        </Text>
        <Flex flexDirection="row" alignItems="center">
          <Icon name="place" color="#000040" size={24} style={styles.icon} />
          <Box>
            <Text>KTX khu A</Text>
            <Text>Linh Trung - Thủ Đức - TP HCM</Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon
            name="local-phone"
            color="#000040"
            size={24}
            style={styles.icon}
          />
          <Text>01296755114</Text>
        </Flex>
      </Box>
    </Card>
  );
};

export default CustomerInfo;

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
