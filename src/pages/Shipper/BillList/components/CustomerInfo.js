import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Box, Text, Flex, TextArea } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

const CustomerInfo = (props) => {
  const { bill } = props;

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Thông tin khách hàng</Card.Title>
      <Box>
        <Text fontSize="md" bold>
          Người nhận
        </Text>
        <Flex flexDirection="row" alignItems="center">
          <Icon name="place" color="#00004000" size={24} style={styles.icon} />
          <Box>
            <Text bold>{bill.orderID?.receiverName}</Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon name="place" color="#00004080" size={24} style={styles.icon} />
          <Box>
            <Text>{bill.orderID?.receiverAddress}</Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon
            name="local-phone"
            color="#00004080"
            size={24}
            style={styles.icon}
          />
          <Text>{bill.orderID?.receiverPhone}</Text>
        </Flex>
      </Box>
      <Flex direction="row">
        <Box flex={1}>
          <Flex flexDirection="row" alignItems="center" justify="space-between">
            <Text fontSize="md" bold>
              Người mua
            </Text>
            <Flex flexDirection="row" alignItems="center">
              <Icon
                name="border-color"
                color="#00004080"
                size={24}
                style={styles.icon}
              />
              <Text fontSize="sm">Ghi chú</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="place"
              color="#00004000"
              size={24}
              style={styles.icon}
            />
            <Box>
              <Text bold>{bill.clientID?.name}</Text>
            </Box>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="place"
              color="#00004080"
              size={24}
              style={styles.icon}
            />
            <Flex>
              <Text>{bill.clientID?.address}</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-post-office"
              color="#00004080"
              size={24}
              style={styles.icon}
            />
            <Text>{bill.clientID?.email}</Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-phone"
              color="#00004080"
              size={24}
              style={styles.icon}
            />
            <Text>{bill.clientID?.phone}</Text>
          </Flex>
        </Box>
      </Flex>
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
              Ngày xuất
            </Text>
            <Text>{moment(bill.exportBillTime).format("DD/MM/YYYY")}</Text>
          </Box>
        </Flex>
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

export default CustomerInfo;

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
