import React, { Component } from "react";
import { View, FlatList } from "react-native";
import PropTypes from "prop-types";
// Components
import { StoryListItem } from "../../../components";
import styles from "./storyListStyles";

class StoryListView extends Component {
  static propTypes = {
    stories: PropTypes.array,
    unPressedBorderColor: PropTypes.string,
    pressedBorderColor: PropTypes.string,
    storyListItemStyle: PropTypes.object,
    storyListViewStyle: PropTypes.object,
    keyExtractor: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  // Component Life Cycles

  // Component Functions

  render() {
    const {
      stories,
      handleStoryItemPress,
      unPressedBorderColor,
      pressedBorderColor,
      storyListItemStyle,
      storyListViewStyle,
      keyExtractor
    } = this.props;

    return (
      <View style={{ ...styles.container, ...storyListViewStyle }}>
        <FlatList
          data={stories}
          keyExtractor={keyExtractor}
          horizontal
          renderItem={({ item, index }) => (
            <StoryListItem
              handleStoryItemPress={() =>
                handleStoryItemPress && handleStoryItemPress(item, index)
              }
              unPressedBorderColor={unPressedBorderColor}
              pressedBorderColor={pressedBorderColor}
              storyListItemStyle={storyListItemStyle}
              item={item}
            />
          )}
        />
      </View>
    );
  }
}

export default StoryListView;
