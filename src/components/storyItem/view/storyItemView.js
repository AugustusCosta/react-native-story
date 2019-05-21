// @flow
import React, { Fragment, PureComponent } from "react";
import { View, Image, ActivityIndicator } from "react-native";
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
      story: { source, user, avatar, id, type },
      selectedStory,
      handleSelectedStoryOnLoaded,
      footerComponent,
      storyItemStyle,
      VideoPlayer
    } = this.props;
    return (
      <Fragment>
        <View style={[styles.container, storyItemStyle.container]}>
          {selectedStory && selectedStory.id === id ? (
            <View
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                zIndex: 9999,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white"
              }}
            >
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : type === "VIDEO" ? (
            <VideoPlayer
              source={source}
              style={[styles.video, storyItemStyle.video]}
              onLoad={() =>
                selectedStory &&
                selectedStory.id === id &&
                handleSelectedStoryOnLoaded()
              }
            />
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
        {footerComponent && (
          <View style={[styles.footer, storyItemStyle.footer]}>
            {footerComponent}
          </View>
        )}
      </Fragment>
    );
  }
}
