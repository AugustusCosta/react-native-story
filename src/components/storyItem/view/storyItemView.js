// @flow
import React, { Fragment, PureComponent } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./storyItemStyles";

import Avatar from "../../avatar/view/avatarView";

export default class extends PureComponent {
  static propTypes = {
    storyItemStyle: PropTypes.object,
    VideoPlayler: PropTypes.node
  };

  render() {
    const {
      story: { source, user, avatar, id, type },
      selectedStory,
      handleSelectedStoryOnLoaded,
      footerComponent,
      storyItemStyle,
      VideoPlayler
    } = this.props;
    return (
      <Fragment>
        <View style={[styles.container, storyItemStyle.container]}>
          {type === "VIDEO" ? (
            <VideoPlayler
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
