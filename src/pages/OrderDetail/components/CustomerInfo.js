import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { Box, Text, Flex } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomerInfo = (props) => {
  const { order } = props;

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Thông tin khách hàng</Card.Title>
      <Flex direction="row">
        <Box flex={1}>
          <Flex flexDirection="row" alignItems="center" justify="space-between">
            <Text fontSize="md" bold>
              {order.clientID?.name}
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
              <Text>{order.clientID?.address}</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-post-office"
              color="#000040"
              size={24}
              style={styles.icon}
            />
            <Text>{order.clientID?.email}</Text>
          </Flex>
          <Flex flexDirection="row" alignItems="center">
            <Icon
              name="local-phone"
              color="#000040"
              size={24}
              style={styles.icon}
            />
            <Text>{order.clientID?.phone}</Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Text fontSize="md" bold>
          Người nhận
        </Text>
        <Flex flexDirection="row" alignItems="center">
          <Icon name="place" color="#00004000" size={24} style={styles.icon} />
          <Box>
            <Text fontSize="sm" bold>
              {order.receiverName}
            </Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon name="place" color="#000040" size={24} style={styles.icon} />
          <Box>
            <Text>{order.receiverAddress}</Text>
          </Box>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Icon
            name="local-phone"
            color="#000040"
            size={24}
            style={styles.icon}
          />
          <Text>{order.receiverPhone}</Text>
        </Flex>
      </Box>
    </Card>
  );
};

export default React.memo(CustomerInfo);

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
