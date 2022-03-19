import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ViewCart = () => {
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
                  marginTop: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
               }}>
               <Text style={{ color: 'white', fontSize: 20 }}>View Cart</Text>
            </TouchableOpacity>
         </View>
      </View>
   )
}

export default ViewCart
