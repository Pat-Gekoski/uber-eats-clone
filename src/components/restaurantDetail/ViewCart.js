import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ViewCart = () => {
   const cartItems = useSelector((state) => state.cart.selectedItems)
   const total = cartItems
      .map((order) => order.items)
      .flat()
      .reduce((sum, cur) => sum + Number(cur.price.replace('$', '')), 0)

   const totalUSD = total.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
   })

   console.log(totalUSD)

   if (!total) {
      return null
   }

   return (
      <View
         style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 50,
            zIndex: 999,
         }}>
         <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <TouchableOpacity
               activeOpacity={0.8}
               style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 15,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
               }}>
               <>
                  <Text style={{ color: 'white', fontSize: 20, marginRight: 30 }}>View Cart</Text>
                  <Text style={{ color: 'white', fontSize: 20 }}>{totalUSD}</Text>
               </>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default ViewCart
