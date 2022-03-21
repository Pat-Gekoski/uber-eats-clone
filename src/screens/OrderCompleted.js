import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import MenuItems from '../components/restaurantDetail/MenuItems'

const OrderCompleted = ({ route }) => {
   const cartItems = useSelector((state) => state.cart.selectedItems)
	const navigation = useNavigation()

   const items = route.params?.items

   const total = cartItems
      .map((order) => order.items)
      .flat()
      .reduce((sum, cur) => sum + Number(cur.price.replace('$', '')), 0)

   const totalUSD = total.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
   })

   const getRestaurantNames = () => {
      let str = ''
      cartItems.forEach((item, index) => {
         str += item.restaurantName
         if (index !== cartItems.length - 1) str += ' - '
      })
      return str
   }

   const extractOrderItems = () => {
      const orderItems = items.map((order) => order.items).flat()
      return orderItems
   }

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Home')
		}, 2500)
	}, [])

   return (
      <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
         <View style={{ height: '100%', margin: 20 }}>
            <LottieView
               style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
               source={require('../../assets/animations/check-mark.json')}
               autoPlay
               speed={0.5}
               loop={false}
            />
            <Text style={{ textAlign: 'center', marginBottom: 20, fontSize: 20 }}>
               Your order at <Text style={{ fontWeight: 'bold' }}>{getRestaurantNames()}</Text> has
               been placed for {totalUSD}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
               <MenuItems foods={extractOrderItems()} hideCheckbox={true} />
               <LottieView
                  style={{ height: 200, alignSelf: 'center', marginBottom: 40 }}
                  source={require('../../assets/animations/cooking.json')}
                  autoPlay
                  speed={0.5}
               />
            </ScrollView>
         </View>
      </SafeAreaView>
   )
}

export default OrderCompleted
