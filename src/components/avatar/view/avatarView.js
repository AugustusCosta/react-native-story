// @flow
import * as React from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import styles from "./avatarStyles";
import type { ImageSourcePropType } from "react-native/Libraries/Image/ImageSourcePropType";
import DEFAULT_AVATAR from "../../../assets/avatars/no_avatar.png";

export default class Avatar extends React.PureComponent {
  render() {
    const { user, avatar: source, storyItemStyle } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ ...styles.container, ...storyItemStyle.avatar.container }}
        >
          <Image
            source={source}
            defaultSource={DEFAULT_AVATAR}
            style={{ ...styles.avatar, ...storyItemStyle.avatar.avatar }}
          />
          <Text
            style={{ ...styles.username, ...storyItemStyle.avatar.username }}
          >
            {user}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
