import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem'
import { db } from '../../firebase'
import firebase from 'firebase/app'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'

const ViewCart = () => {
   const [modalVisible, setModalVisible] = useState(false)
   const [loading, setLoading] = useState(false)
   const cartItems = useSelector((state) => state.cart.selectedItems)

   const navigation = useNavigation()

   const total = cartItems
      .map((order) => order.items)
      .flat()
      .reduce((sum, cur) => sum + Number(cur.price.replace('$', '')), 0)

   const totalUSD = total.toLocaleString('en', {
      style: 'currency',
      currency: 'USD',
   })

   const showOrderItems = (item) => {
      return item.items.map((item, index) => {
         return <OrderItem item={item} key={index} />
      })
   }

   const addOrderToFirebase = async (items) => {
      setLoading(true)
		setModalVisible(false)

      const promises = items.map((item) => {
         return addDoc(collection(db, 'orders'), {
            restaurantName: item.restaurantName,
            orderItems: item.items,
            createdAt: serverTimestamp(),
         })
      })

      await Promise.all(promises)

      setTimeout(() => {
         setLoading(false)
         navigation.navigate('OrderCompleted', { items })
      }, 2500)
   }

   const checkoutModalContent = (restaurantName) => {
      return (
         <View style={styles.modalContainer}>
            <View style={styles.modalCheckoutContainer}>
               <ScrollView showsVerticalScrollIndicator={false}>
                  {cartItems.map((item, index) => (
                     <View key={index}>
                        <View>
                           <Text style={styles.restaurantName}>{item.restaurantName}</Text>
                           {showOrderItems(item)}
                        </View>
                        {index !== cartItems.length - 1 && <View style={{ height: 30 }} />}
                     </View>
                  ))}
                  <View style={styles.subtotalContainer}>
                     <Text style={styles.subtotalText}>Subtotal</Text>
                     <Text>{totalUSD}</Text>
                  </View>
                  <View
                     style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                     <TouchableOpacity
                        onPress={() => addOrderToFirebase(cartItems)}
                        style={{
                           marginTop: 20,
                           backgroundColor: 'black',
                           alignItems: 'center',
                           padding: 13,
                           borderRadius: 30,
                           width: 300,
                           position: 'relative',
                        }}>
                        <View
                           style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}>
                           <Text style={{ color: 'white', fontSize: 20, marginRight: 20 }}>
                              Checkout
                           </Text>
                           <Text style={{ color: 'white', fontSize: 15 }}>
                              {total ? totalUSD : ''}
                           </Text>
                        </View>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </View>
         </View>
      )
   }

   if (!total) {
      return null
   }

   return (
      <>
         <Modal
            animationType='slide'
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}>
            {checkoutModalContent()}
         </Modal>

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
                  }}
                  onPress={() => setModalVisible(true)}>
                  <>
                     <Text style={{ color: 'white', fontSize: 20, marginRight: 30 }}>
                        View Cart
                     </Text>
                     <Text style={{ color: 'white', fontSize: 20 }}>{totalUSD}</Text>
                  </>
               </TouchableOpacity>
            </View>
         </View>
         {loading && (
            <View
               style={{
                  backgroundColor: 'black',
                  position: 'absolute',
						top: 0, left: 0, right: 0, bottom: 0,
                  opacity: 0.6,
                  justifyContent: 'center',
                  alignItems: 'center',
						zIndex: 1000
                  // flex: 1,
               }}>
               <LottieView
                  style={{ height: 200 }}
                  source={require('../../../assets/animations/scanner.json')}
						autoPlay
						speed={3}
               />
            </View>
         )}
      </>
   )
}

const styles = StyleSheet.create({
   modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
   },
   modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 500,
      borderWidth: 1,
      backgroundColor: '#eee',
   },
   restaurantName: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      marginBottom: 10,
   },
   subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginHorizontal: 18,
   },
   subtotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10,
   },
})

export default ViewCart
