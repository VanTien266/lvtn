import { Alert, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Flex, Radio, Icon, TextArea, Button } from "native-base";
import { Card } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import billApi from "../../../../api/billApi";

const CheckStatus = (props) => {
  const { billId, navigation } = props;
  const [data, setData] = useState({ name: "", reason: "" });

  const handleSubmit = () => {
    const response = billApi.updateStatus(billId, data);
    if (response) Alert.alert("Cập nhật trạng thái thành công!");
    navigation.navigate("bill-list");
  };
  const handleReasonChange = (value) => {
    setData({ ...data, reason: value });
  };

  return (
    <Card containerStyle={{ marginHorizontal: 0 }}>
      <Card.Title>Đánh giấu trạng thái</Card.Title>
      <Flex>
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={data.name}
          onChange={(nextValue) => {
            setData({ ...data, name: nextValue });
          }}
        >
          <Radio
            value="completed"
            my={1}
            colorScheme="success"
            icon={<Icon as={<MaterialIcons name="done-outline" />} />}
            _text={{ color: "success.500" }}
          >
            Giao thành công
          </Radio>
          <Radio
            value="failed"
            my={1}
            colorScheme="danger"
            icon={<Icon as={<MaterialIcons name="close" />} />}
            _text={{ color: "danger.500" }}
          >
            Giao thất bại
          </Radio>
        </Radio.Group>
        {data.name === "failed" ? (
          <Box alignItems="center" w="100%" marginBottom={5}>
            <TextArea
              value={data.reason}
              onChangeText={handleReasonChange}
              h={20}
              w="100%"
            />
          </Box>
        ) : null}
        <Button onPress={() => handleSubmit()}>Xác nhận</Button>
      </Flex>
    </Card>
  );
};

export default CheckStatus;

const styles = StyleSheet.create({});
