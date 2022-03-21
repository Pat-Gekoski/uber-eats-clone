import React from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetail/About'
import MenuItems from '../components/restaurantDetail/MenuItems'
import ViewCart from '../components/restaurantDetail/ViewCart'

const foods = [
   {
      title: 'Bourbon Street Chicken & Shrimp',
      description: `Let the good times roll with Cajun-seasoned chicken and blackened shrimp in buttery garlic and parsley served sizzling on a cast iron platter`,
      price: '$15.79',
      image: 'https://olo-images-live.imgix.net/c1/c1a977488f724082bf0b4ab538dda99e.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=4e69c4881a9c41b448d52483e1aca629',
   },
   {
      title: 'Classic Broccoli Chicken Alfredo',
      description: `A neighborhood favorite. Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with buttery garlic and parsley.`,
      price: '$12.99',
      image: 'https://olo-images-live.imgix.net/30/30d54e38e85e49b3ba650c2414d15be9.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=80a05a7794e4124696cd34eba6c62a36',
   },
   {
      title: 'Blackened Cajun Salmon',
      description: `6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes and steamed broccoli.`,
      price: '$16.69',
      image: 'https://olo-images-live.imgix.net/aa/aa8caf0df1af4cdfb28800c4f9b06574.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=967aedd060a585c3b93bd8f6c6c8b864',
   },
   {
      title: 'Whiskey Bacon Burger',
      description: `Savor the rich flavor in this tasty original. An all-beef patty topped with two slices of Pepper Jack cheese, crispy onions, two strips of Applewood-smoked bacon and Fireball® Whisky-infused steak sauce. Served with lettuce, tomato, onion and pickles on a Brioche bun. Served with fries.`,
      price: '$12.79',
      image: 'https://olo-images-live.imgix.net/72/725a6a49479547c3a627f229da2b60dd.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=5fe8bd67cce466993e3aa7c91fb02f66',
   },
   {
      title: 'Chicken Fajita Rollup',
      description: `Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Served with classic fries.`,
      price: '$10.99',
		image: 'https://olo-images-live.imgix.net/84/84a06764e58f4ffcb08f815e57b2a33d.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=32c5d462ef0d0fa965c200419ed31d9b'
   },
   {
      title: '8oz Top Sirloin',
      description: `Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with garlic mashed potatoes and steamed broccoli.`,
      price: '$12.79',
		image: 'https://olo-images-live.imgix.net/42/42e408f0b9674833b6dbb36d8f166e73.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=331&fit=fill&fm=png32&bg=transparent&s=b44cb2d86dd2176118cf2351f24d827a'
   },
]

const RestaurantDetail = ({route, navigation}) => {
  return (
	 <View style={{flex: 1}}>
		<About route={route}/>
		<Divider width={1.8} style={{marginVertical: 20}} />
		<MenuItems restaurantName={route.params.name} foods={foods}/>
		<ViewCart navigation={navigation} restaurantName={route.params.name} />
	 </View>
  )
}

export default RestaurantDetail