import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <ImageBackground source={require('../assets/chatwallpaper.jpg')} style={styles.headerBackground}>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    flex:1, 
    height:"100%", 
    width:"100%"
  }
});

export default Header;
