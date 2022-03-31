import { StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-elements";
import { Box, Text, Flex, TextArea } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

const AnortherInfo = (props) => {
  const { bill } = props;
  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Thông tin khác</Card.Title>
      <Flex direction="row" justify="space-between">
        <Flex direction="row">
          <Icon
            name="account-circle"
            color="#00004080"
            size={24}
            style={styles.icon}
          ></Icon>
          <Box>
            <Text fontSize="md" bold>
              Nhân viên phụ trách
            </Text>
            <Text>{bill.salesmanID?.name}</Text>
            <Text>{bill.salesmanID?.phone}</Text>
          </Box>
        </Flex>
        <Flex direction="row">
          <Icon
            name="calendar-today"
            color="#00004080"
            size={24}
            style={styles.icon}
          ></Icon>
          <Box>
            <Text fontSize="md" bold>
              ngày xuất
            </Text>
            <Text>{moment(bill.exportBillTime).format("DD/MM/YYYY")}</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex direction="row">
        <Icon
          name="account-circle"
          color="#00004080"
          size={24}
          style={styles.icon}
        ></Icon>
        <Box>
          <Text fontSize="md" bold>
            Nhân viên giao hàng
          </Text>
          <Text>{bill?.shipperID?.name}</Text>
          <Text>{bill?.shipperID?.phone}</Text>
        </Box>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        <Icon
          name="border-color"
          color="#00004080"
          size={24}
          style={styles.icon}
        />
        <Text fontSize="md" bold>
          Ghi chú
        </Text>
      </Flex>
      <Box alignItems="center" mt={3}>
        <TextArea
          h={20}
          placeholder="Không có ghi chú nào"
          value={bill.note}
          w="90%"
          isDisabled
        />
      </Box>
    </Card>
  );
};

export default AnortherInfo;

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
