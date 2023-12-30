// CustomHeader.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Remplacez par l'icône souhaitée

const CustomHeader = ({ title, previous, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#2196F3', alignItems: 'center' }}>
      {previous ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      )}
      <Text style={{ flex: 1, color: 'white', textAlign: 'center', marginRight: 40 }}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
