import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import Modal from "react-native-modalbox";

// Components
import { StoryList, Stories } from "../../../components";

import styles from "./storyStyles";

class StoryListView extends Component {
  static propTypes = {
    stories: PropTypes.array,
    unPressedBorderColor: PropTypes.string,
    pressedBorderColor: PropTypes.string,
    storyItemStyle: PropTypes.object,
    storyListItemStyle: PropTypes.object,
    storyViewStyle: PropTypes.object,
    storyListViewStyle: PropTypes.object,
    keyExtractor: PropTypes.func,
    VideoPlayer: PropTypes.any
  };

  static defaultProps = {
    stories: [],
    unPressedBorderColor: "#0CE5A5",
    pressedBorderColor: "#D2D5DB",
    storyItemStyle: {
      container: {},
      image: {},
      video: {},
      loadImage: {},
      avatarContainer: {},
      avatar: {},
      username: {},
      footer: {}
    },
    storyListItemStyle: {
      container: {},
      avatarWrapper: {},
      avatar: {},
      itemText: {}
    },
    storyViewStyle: {
      container: {}
    },
    storyListViewStyle: {},
    keyExtractor: (item, index) => item.id,
    VideoPlayer: <View />
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      orderedStories: null,
      selectedStory: null,
      selectedIndex: 0
    };
  }

  // Component Life Cycles

  // Component Functions
  _handleStoryItemPress = (item, index) => {
    const { stories } = this.props;

    const _stories = Array.from(stories);

    const rest = _stories.splice(index);
    const first = _stories;

    const orderedStories = rest.concat(first);
    this.setState({
      orderedStories,
      selectedStory: item,
      isModalOpen: true,
      selectedIndex: index
    });
    this.forceUpdate();
  };

  _handleSelectedStoryChange = (item, index) => {
    this._handleStoryItemPress(item, index);
  };

  render() {
    const {
      stories,
      footerComponent,
      unPressedBorderColor,
      pressedBorderColor,
      storyItemStyle,
      storyListItemStyle,
      storyViewStyle,
      storyListViewStyle,
      keyExtractor,
      VideoPlayer
    } = this.props;
    const {
      isModalOpen,
      orderedStories,
      selectedStory,
      selectedIndex
    } = this.state;

    return (
      <Fragment>
        <View style={styles.storyListContainer}>
          <StoryList
            handleStoryItemPress={this._handleStoryItemPress}
            stories={stories}
            unPressedBorderColor={unPressedBorderColor}
            pressedBorderColor={pressedBorderColor}
            storyListItemStyle={storyListItemStyle}
            storyListViewStyle={storyListViewStyle}
            keyExtractor={keyExtractor}
          />
        </View>
        <Modal
          style={styles.modal}
          isOpen={isModalOpen}
          onClosed={() => this.setState({ isModalOpen: false })}
          position="center"
          swipeToClose
          swipeArea={250}
          backButtonClose
        >
          <Stories
            footerComponent={footerComponent}
            selectedStory={selectedStory}
            selectedIndex={selectedIndex}
            stories={orderedStories}
            originalStories={stories}
            storyItemStyle={storyItemStyle}
            storyViewStyle={storyViewStyle}
            VideoPlayer={VideoPlayer}
            selectedStoryChange={this._handleSelectedStoryChange}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default StoryListView;
