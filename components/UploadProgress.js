import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text } from "react-native";

const UploadProgress = props => {
  const {progress} = props;
  return (
    <View style={styles.overlay}>
      <Text style={styles.content}>Uploading</Text>
      <Text style={styles.content}> {progress}%</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'blue',
    opacity: 0.3,
  },
  content: {
    color: 'red',
    fontSize: 48,
    opacity: 1
  }
});

export default UploadProgress;
