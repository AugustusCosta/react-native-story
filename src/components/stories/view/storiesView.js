import React, { PureComponent } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  View,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import styles from "./storiesStyles";
import { StoryItem } from "../../";

const { width } = Dimensions.get("window");
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const ratio = Platform.OS === "ios" ? 2 : 1.2;

export default class Stories extends PureComponent {
  static propTypes = {
    stories: PropTypes.array,
    originalStories: PropTypes.array,
    storyItemStyle: PropTypes.object,
    storyViewStyle: PropTypes.object,
    selectedStoryChange: PropTypes.func,
    VideoPlayer: PropTypes.any
  };

  stories = [];

  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(0),
      ready: false
    };
    this.stories = props.stories.map(() => React.createRef());
  }

  async componentDidMount() {
    const { x } = this.state;
    // const { selectedIndex } = this.props;
    await x.addListener(() =>
      this.stories.forEach((story, index) => {
        const offset = index * width;
        const inputRange = [offset - width, offset + width];
        const translateX = x
          .interpolate({
            inputRange,
            outputRange: [width / ratio, -width / ratio],
            extrapolate: "clamp"
          })
          .__getValue();

        const rotateY = x
          .interpolate({
            inputRange,
            outputRange: [`${angle}rad`, `-${angle}rad`],
            extrapolate: "clamp"
          })
          .__getValue();

        const parsed = parseFloat(
          rotateY.substr(0, rotateY.indexOf("rad")),
          10
        );
        const alpha = Math.abs(parsed);
        const gamma = angle - alpha;
        const beta = Math.PI - alpha - gamma;
        const w = width / 2 - ((width / 2) * Math.sin(gamma)) / Math.sin(beta);
        const translateX2 = parsed > 0 ? w : -w;

        const style = {
          transform: [
            { perspective },
            { translateX },
            { rotateY },
            { translateX: translateX2 }
          ]
        };
        story.current.setNativeProps({ style });
      })
    );
    // this.scroll.getNode().scrollTo({
    //   x: selectedIndex * width,
    //   animated: false
    // });
  }

  _handleSelectedStoryOnLoaded = () => {
    this.setState({ ready: true });
  };

  _handleMomentumScrollEnd = ({ nativeEvent }) => {
    const { originalStories, selectedStoryChange } = this.props;

    if (!originalStories || !originalStories.length) return;

    const contentOffset = nativeEvent.contentOffset;
    const layoutMeasurement = nativeEvent.layoutMeasurement;

    const itemWidth = layoutMeasurement.width;
    const x = contentOffset.x;

    let index = x / itemWidth;
    let story = originalStories[index];

    selectedStoryChange && selectedStoryChange(story, index);
  };

  render() {
    const { x, ready } = this.state;
    const {
      stories,
      selectedStory,
      footerComponent,
      storyItemStyle,
      storyViewStyle,
      VideoPlayer
    } = this.props;

    return (
      <View
        key={selectedStory ? selectedStory.id : -1}
        style={[styles.container, storyViewStyle.container]}
      >
        {!ready && (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: "100%",
              zIndex: 9999,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent"
            }}
          >
            <ActivityIndicator size="large" color="gray" />
          </View>
        )}
        {stories
          .map((story, i) => (
            <Animated.View
              ref={this.stories[i]}
              style={StyleSheet.absoluteFill}
              key={story.id}
            >
              <StoryItem
                footerComponent={footerComponent}
                handleSelectedStoryOnLoaded={this._handleSelectedStoryOnLoaded}
                selectedStory={selectedStory}
                storyItemStyle={storyItemStyle}
                VideoPlayer={VideoPlayer}
                {...{ story }}
              />
            </Animated.View>
          ))
          .reverse()}
        <Animated.ScrollView
          // ref={c => (this.scroll = c)}
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={width}
          contentContainerStyle={{ width: width * stories.length }}
          onMomentumScrollEnd={this._handleMomentumScrollEnd}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x }
                }
              }
            ],
            { useNativeDriver: true }
          )}
          decelerationRate={0.99}
          horizontal
        />
      </View>
    );
  }
}
