import React, { Component } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import PropTypes from "prop-types";
// Constants
import DEFAULT_AVATAR from "../../../assets/avatars/no_avatar.png";

// Components
import styles from "./storyListItemStyles";

class StoryListItemView extends Component {
  static propTypes = {
    unPressedBorderColor: PropTypes.string,
    pressedBorderColor: PropTypes.string,
    storyListItemStyle: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    };
  }

  // Component Life Cycles

  // Component Functions
  _handleItemPress = item => {
    const { handleStoryItemPress } = this.props;

    if (handleStoryItemPress) handleStoryItemPress(item);

    this.setState({ isPressed: true });
  };

  render() {
    const {
      item,
      unPressedBorderColor,
      pressedBorderColor,
      storyListItemStyle
    } = this.props;
    const { isPressed } = this.state;

    return (
      <View style={{ ...styles.container, ...storyListItemStyle.container }}>
        <TouchableOpacity
          onPress={() => this._handleItemPress(item)}
          style={[
            styles.avatarWrapper,
            ...storyListItemStyle.avatarWrapper,
            !isPressed
              ? {
                  borderColor: unPressedBorderColor
                    ? unPressedBorderColor
                    : "#e95950"
                }
              : {
                  borderColor: pressedBorderColor
                    ? pressedBorderColor
                    : "#ebebeb"
                }
          ]}
        >
          <Image
            style={{ ...styles.avatar, ...storyListItemStyle.avatar }}
            source={item.avatar}
            defaultSource={DEFAULT_AVATAR}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.itemText, ...storyListItemStyle.itemText }}>
          {item.user}
        </Text>
      </View>
    );
  }
}

export default StoryListItemView;
