import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'

const MenuItems = ({ restaurantName, hideCheckbox = false, foods }) => {
   const dispatch = useDispatch()
   const cartItems = useSelector((state) => state.cart.selectedItems)

   const selectItem = (item, checkboxValue) => {
      if (checkboxValue) {
         dispatch({ type: 'ADD_TO_CART', payload: { ...item } })
      } else {
         dispatch({ type: 'REMOVE_FROM_CART', payload: { ...item } })
      }
   }

   const isFoodInCart = (food, restaurantName) => {
      if (!cartItems || cartItems.length <= 0) return false

      const resaurantItemsInCart = cartItems.find(
         (item) => item.restaurantName === restaurantName
      )?.items
      if (!resaurantItemsInCart) return false

      for (let item of resaurantItemsInCart) {
         if (item.title === food.title) return true
      }

      return false
   }

   return (
      <ScrollView showsVerticalScrollIndicator='false'>
         {foods.map((food, index) => (
            <View key={index}>
               <View style={styles.menuItemStyle}>
                  {!hideCheckbox && (
                     <BouncyCheckbox
                        iconStyle={{ borderColor: 'lightgray', borderRadius: 0 }}
                        fillColor='green'
                        onPress={(checked) =>
                           selectItem({ ...food, restaurantName: restaurantName }, checked)
                        }
                        isChecked={isFoodInCart(food, restaurantName)}
                     />
                  )}
                  <FoodInfo food={food} />
                  <FoodImage food={food} />
               </View>
               <Divider width={0.5} orientation='vertical' style={{ marginHorizontal: 20 }} />
            </View>
         ))}
			{!hideCheckbox && <View style={{height: 140}} />}
      </ScrollView>
   )
}

const FoodInfo = ({ food }) => (
   <View style={{ width: 240, justifyContent: 'space-evenly' }}>
      <Text style={styles.titleStyle}>{food.title}</Text>
      <Text numberOfLines={3}>{food.description}</Text>
      <Text>{food.price}</Text>
   </View>
)

const FoodImage = ({ food }) => (
   <View style={{marginLeft: 10}}>
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
