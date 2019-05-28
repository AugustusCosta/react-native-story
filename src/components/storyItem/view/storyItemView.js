// @flow
import React, { Fragment, PureComponent } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./storyItemStyles";

import Avatar from "../../avatar/view/avatarView";

export default class extends PureComponent {
  static propTypes = {
    storyItemStyle: PropTypes.object,
    VideoPlayer: PropTypes.any
  };

  render() {
    const {
      story: { source, user, avatar, id, type, loadImage },
      selectedStory,
      handleSelectedStoryOnLoaded,
      footerComponent,
      storyItemStyle,
      VideoPlayer
    } = this.props;
    return (
      <Fragment>
        <View
          // key={selectedStory.id}
          style={[styles.container, storyItemStyle.container]}
        >
          {type === "VIDEO" && (
            <Image
              style={[styles.loadImage, storyItemStyle.loadImage]}
              source={loadImage}
            />
          )}

          <View
            // key={selectedStory ? selectedStory.id + id : id}
            style={[styles.container, storyItemStyle.container]}
          >
            {type === "VIDEO" ? (
              selectedStory && selectedStory.id === id ? (
                <VideoPlayer
                  // key={selectedStory.id}
                  source={
                    selectedStory && selectedStory.id === id ? source : null
                  }
                  style={[styles.video, storyItemStyle.video]}
                  onLoad={() =>
                    selectedStory &&
                    selectedStory.id === id &&
                    handleSelectedStoryOnLoaded()
                  }
                />
              ) : null
            ) : (
              <Image
                onLoad={() =>
                  selectedStory &&
                  selectedStory.id === id &&
                  handleSelectedStoryOnLoaded()
                }
                style={[styles.image, storyItemStyle.image]}
                {...{ source }}
              />
            )}
            <Avatar {...{ user, avatar, storyItemStyle }} />
          </View>
        </View>
        {footerComponent && (
          <View style={[styles.footer, storyItemStyle.footer]}>
            {footerComponent}
          </View>
        )}
      </Fragment>
    );
  }
}
