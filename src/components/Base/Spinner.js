import {ActivityIndicator} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
const Spinner = ({...rest}) => {
  return <ActivityIndicator animating rest />;
};

export default Spinner;
