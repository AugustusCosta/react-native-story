// @flow
import React, { Fragment, PureComponent } from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./storyItemStyles";

import Avatar from "../../avatar/view/avatarView";

export default class extends PureComponent {
  static propTypes = {
    storyItemStyle: PropTypes.object,
    VideoPlayer: PropTypes.any,
    CacheImage: PropTypes.any
  };

  render() {
    const {
      story: { source, user, avatar, id, type, loadImage },
      selectedStory,
      handleSelectedStoryOnLoaded,
      footerComponent,
      storyItemStyle,
      VideoPlayer,
      CacheImage
    } = this.props;
    return (
      <Fragment>
        <View style={[styles.container, storyItemStyle.container]}>
          {type === "VIDEO" ? (
            CacheImage ? (
              <CacheImage
                style={[styles.loadImage, storyItemStyle.loadImage]}
                uri={loadImage.uri}
              />
            ) : (
              <Image
                style={[styles.loadImage, storyItemStyle.loadImage]}
                source={loadImage}
              />
            )
          ) : null}

          <View style={[styles.container, storyItemStyle.container]}>
            {type === "VIDEO" ? (
              selectedStory && selectedStory.id === id ? (
                <VideoPlayer
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
            ) : CacheImage ? (
              <CacheImage
                onLoad={() =>
                  selectedStory &&
                  selectedStory.id === id &&
                  handleSelectedStoryOnLoaded()
                }
                style={[styles.image, storyItemStyle.image]}
                uri={source.uri}
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
            <Avatar {...{ user, avatar, storyItemStyle, CacheImage }} />
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
