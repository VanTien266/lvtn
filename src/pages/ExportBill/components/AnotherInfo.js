import { StyleSheet } from "react-native";
import React from "react";
import { Card } from "react-native-elements";
import { Box, Text, Flex, TextArea } from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnortherInfo = () => {
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
            <Text>Luu Van Tien</Text>
            <Text>0826755114</Text>
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
              Ngay xuat
            </Text>
            <Text>14/10/2021</Text>
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
            Nhan vien giao hang
          </Text>
          <Text>Tran Trong Nghia</Text>
          <Text>01296755114</Text>
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
          placeholder="Day la ghi chu"
          value="Don hang de chay no"
          w="90%"
          isDisabled
        />
      </Box>
    </Card>
  );
};

export default AnortherInfo;

const styles = StyleSheet.create({ icon: { marginRight: 5 } });
