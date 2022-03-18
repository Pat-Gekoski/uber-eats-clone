import { View, ScrollView, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { Divider } from 'react-native-elements'

import HeaderTabs from '../components/HeaderTabs'
import SearchBar from '../components/SearchBar'
import Categories from '../components/Categories'
import BottomTabs from '../components/BottomTabs'
import RestaurantItems, { localRestaurants } from '../components/RestaurantItems'

const Home = () => {
   const [restaurantData, setRestaurantData] = useState(localRestaurants)
	const [city, setCity] = useState("St Petersburg, FL")
	const [activeTab, setActiveTab] = useState('Delivery')

   const getRestaurantsFromYelp = async () => {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

      const apiOptions = {
         headers: {
            Authorization: `Bearer ${Constants.manifest.extra.yelpToken}`,
         },
      }

      try {
         const res = await fetch(yelpUrl, apiOptions)
         const json = await res.json()
         setRestaurantData(
            json.businesses.filter((business) =>
               business.transactions.includes(activeTab.toLowerCase())
            )
         )
      } catch (err) {
         console.log('Could not fetch restaurants from Yelp: ', err.message)
      }
   }

   useEffect(() => {
      getRestaurantsFromYelp()
   }, [city, activeTab])

   return (
      <SafeAreaView style={{ backgroundColor: '#eee', flex: 1 }}>
         <View style={{ backgroundColor: 'white', padding: 15 }}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SearchBar cityHandler={setCity}/>
         </View>
         <ScrollView showsVerticalScrollIndicator='false'>
            <Categories />
            <RestaurantItems restaurantData={restaurantData}/>
         </ScrollView>
			<Divider width={1}/>
			<BottomTabs />
      </SafeAreaView>
   )
}

export default Home
