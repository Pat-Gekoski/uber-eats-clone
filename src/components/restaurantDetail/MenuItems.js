import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'

const foods = [
   {
		restaurantName: 'The Eatery',
      title: 'BBQ Butt Roast',
      description: `It's a fucking burger stupid! Do you really need a description?`,
      price: '$12.99',
		image: 'https://www.google.com/some-photo.jpg'
   },
   {
		restaurantName: 'The Eatery',
      title: 'BBQ Burger',
      description: `It's a fucking burger stupid! Do you really need a description?`,
      price: '$12.99',
		image: 'https://www.google.com/some-photo.jpg'
   },
   {
		restaurantName: 'The Eatery',
      title: 'Fried Pickles',
      description: `It's a fucking burger stupid! Do you really need a description?`,
      price: '$12.99',
		image: 'https://www.google.com/some-photo.jpg'
   },
   {
		restaurantName: 'The Eatery',
      title: 'Salmon',
      description: `It's a fucking burger stupid! Do you really need a description?`,
      price: '$12.99',
		image: 'https://www.google.com/some-photo.jpg'
   }
]

const MenuItems = ({ restaurantName }) => {
   const dispatch = useDispatch()
	const cartItems = useSelector(state => state.cart.selectedItems)

   const selectItem = (item, checkboxValue) => {
      if (checkboxValue) {
         dispatch({ type: 'ADD_TO_CART', payload: { ...item } })
      } else {
         dispatch({ type: 'REMOVE_FROM_CART', payload: { ...item } })
      }
   }

	const isFoodInCart = (food, restaurantName) => {
		if (!cartItems || cartItems.length <= 0) return false

		console.log('cart', cartItems)

		const resaurantItemsInCart = cartItems.find(item => item.restaurantName === restaurantName)?.items
		if (!resaurantItemsInCart) return false

		for (let item of resaurantItemsInCart){
			if (item.title === food.title) return true
		}
		
		return false
	}

   return (
      <ScrollView showsVerticalScrollIndicator='false' style={{ flexGrow: 1 }}>
         {foods.map((food, index) => (
            <View key={index}>
               <View style={styles.menuItemStyle}>
                  <BouncyCheckbox
                     iconStyle={{ borderColor: 'lightgray', borderRadius: 0 }}
                     fillColor='green'
                     onPress={(checked) => selectItem({...food, restaurantName: restaurantName }, checked)}
							isChecked={isFoodInCart(food, restaurantName)}
                  />
                  <FoodInfo food={food} />
                  <FoodImage food={food} />
               </View>
               <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 20 }} />
            </View>
         ))}
      </ScrollView>
   )
}

const FoodInfo = ({ food }) => (
   <View style={{ width: 240, justifyContent: 'space-evenly' }}>
      <Text style={styles.titleStyle}>{food.title}</Text>
      <Text>{food.description}</Text>
      <Text>{food.price}</Text>
   </View>
)

const FoodImage = ({ food }) => (
   <View>
      <Image source={{ uri: food.image }} style={{ width: 100, height: 100, borderRadius: 8 }} />
   </View>
)

const styles = StyleSheet.create({
   menuItemStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
   },
   titleStyle: {
      fontSize: 19,
      fontWeight: '600',
   },
})

export default MenuItems
