import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Home from './home';
import Article from '../read/article';
import { SafeAreaView } from 'react-native-safe-area-context';
import Recipe from '../read/recipes';

const FirstRoute = () => (
  <Recipe/>
  
);

const SecondRoute = () => (
  <Article/>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const CustomTabBar = (props:any) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused }) => (
      <Text style={{ 
        color: focused ? 'black' : 'gray',
        fontSize:18, 
        fontWeight: focused ? 'bold' : 'normal',
        fontFamily: 'Inter',
      }}>
        {route.title}
      </Text>
    )}
    indicatorStyle={{ backgroundColor: '#41D2F2', height:5 }}
    style={{ 
      backgroundColor: 'white',
     }}
    tabStyle={{}}
  />
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Recipes' },
    { key: 'second', title: 'Articles' },
  ]);

  return (
    <SafeAreaView className='flex-1'>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={CustomTabBar}
      initialLayout={{ width: layout.width }}
      
    />
    </SafeAreaView>
  );
}